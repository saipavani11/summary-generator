from fastapi import APIRouter, Depends, Form, UploadFile, File, HTTPException, Body, status
from app.auth.dependencies import require_authenticated_user
from app.models.chat import ChatMessage
from app.services.chat_logic import save_chat, get_chat_history
from app.utils.file_parser import parse_pdf, parse_text
from app.services.qa import answer_question
from app.db.mongo import session_collection, chat_collection
from app.models.session import SessionCreate
from app.services.audio_transcriber import transcribe_audio
from fastapi.encoders import jsonable_encoder

from bson import ObjectId, errors as bson_errors

from datetime import datetime

from bson import ObjectId

import requests

router = APIRouter()

# 🚀 Create a new chat session

@router.post("/new-session")
def create_chat_session(
    session: SessionCreate = Body(...),
    user: dict = Depends(require_authenticated_user)
):
    session_data = session.dict()
    session_data["user_id"] = user["username"]  # Linking session to user
    session_data["created_at"] = datetime.utcnow()
    session_id = session_collection.insert_one(session_data).inserted_id
    print("✅ Received:", session)
    print("👤 User:", user)
    return {"session_id": str(session_id), "message": "New chat session created."}

# 💬 Chat endpoint
@router.post("/chat")
async def chat(
    question: str = Form(...),
    session_id: str = Form(...),
    file: UploadFile = File(None),
    text: str = Form(None),
    url: str = Form(None),
    audio: UploadFile = File(None),  # Audio input
    user: dict = Depends(require_authenticated_user)
):
    content = ""

    # 1️⃣ New input handling
    if url:
        response = requests.get(url)
        if response.status_code == 200:
            content = response.text
        else:
            raise HTTPException(400, detail="Could not fetch content from URL")

    elif audio:
        content = await transcribe_audio(audio)

    elif text:
        content = text

    elif file:
        filename = file.filename.lower()
        if filename.endswith(".pdf"):
            content = parse_pdf(file)
        elif filename.endswith(".txt"):
            content = await parse_text(file)
        elif filename.endswith((".mp3", ".wav", ".m4a")):
            content = await transcribe_audio(file)
        else:
            raise HTTPException(400, detail=f"Unsupported file type: {file.filename}")

    # 2️⃣ Load existing session
    session = session_collection.find_one({"_id": ObjectId(session_id)})
    if not session:
        raise HTTPException(404, detail="Session not found")

    # 3️⃣ Update document_contents field (as list)
    if content.strip():
        session_collection.update_one(
            {"_id": ObjectId(session_id)},
            {"$push": {"document_contents": content}}  # ⬅️ Accumulate content
        )
    else:
        if "document_contents" not in session:
            raise HTTPException(400, detail="No content found in session or input provided")

    # 4️⃣ Prepare full context for answering
    full_context = "\n\n".join(session.get("document_contents", []))
    if content.strip():
        full_context += f"\n\n{content.strip()}"

    if not full_context.strip():
        raise HTTPException(400, detail="No usable content to answer the question")

    # 5️⃣ Generate answer
    answer = answer_question(full_context, question)

    # 6️⃣ Save chat
    chat_message = ChatMessage(
        user_id=user["username"],
        session_id=session_id,
        question=question,
        answer=answer,
        file_name=file.filename if file else None
    ).dict()
    chat_message["timestamp"] = datetime.utcnow()
    chat_collection.insert_one(chat_message)

    return {"question": question, "answer": answer, "session_id": session_id}

# 📜 Get chat history for current user (all chats)
@router.get("/chat/history")
def history(user: dict = Depends(require_authenticated_user)):
    return get_chat_history(user["username"])


@router.get("/session/{session_id}")
def get_session_chats(session_id: str):
    try:
        # Ensure session_id is a valid ObjectId
        session_obj_id = ObjectId(session_id)
    except bson_errors.InvalidId:
        raise HTTPException(status_code=400, detail="Invalid session ID format")

    # Check if the session exists
    session = session_collection.find_one({"_id": session_obj_id})
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Fetch chats linked to the session
    chats = list(chat_collection.find({"session_id": session_id}))
    for chat in chats:
        chat["_id"] = str(chat["_id"])
    return jsonable_encoder(chats)

# 📘 Get all sessions for a user
@router.get("/chat/user-sessions")
def get_user_sessions(user: dict = Depends(require_authenticated_user)):
    sessions = list(session_collection.find({"user_id": user["username"]}))
    for s in sessions:
        s["_id"] = str(s["_id"])
    return jsonable_encoder(sessions)


@router.delete("/session/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_session(session_id: str, user: dict = Depends(require_authenticated_user)):
    try:
        obj_id = ObjectId(session_id)
    except bson_errors.InvalidId:
        raise HTTPException(status_code=400, detail="Invalid session ID format")

    session = session_collection.find_one({"_id": obj_id})
    if not session or session["user_id"] != user["username"]:
        raise HTTPException(status_code=404, detail="Session not found or unauthorized")

    session_collection.delete_one({"_id": obj_id})
    chat_collection.delete_many({"session_id": session_id})  # Clean up chats too
    return  # 204 No Content