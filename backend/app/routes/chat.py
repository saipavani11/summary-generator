from fastapi import APIRouter, Depends, Form, UploadFile, File, HTTPException
from app.auth.dependencies import require_authenticated_user
from app.models.chat import ChatMessage
from app.services.chat_logic import save_chat, get_chat_history
from app.utils.file_parser import parse_pdf, parse_text
from app.services.qa import answer_question

router = APIRouter()

@router.post("/chat")
async def chat(
    question: str = Form(...),
    file: UploadFile = File(None),
    text: str = Form(None),
    user: dict = Depends(require_authenticated_user)
):
    content = ""

    if file:
        if file.filename.endswith(".pdf"):
            content = parse_pdf(file)
        elif file.filename.endswith(".txt"):
            content = await parse_text(file)
        else:
            raise HTTPException(400, detail="Unsupported file type")
    elif text:
        content = text
    else:
        raise HTTPException(400, detail="No input provided")

    if not content.strip():
        raise HTTPException(400, detail="Empty content")

    answer = answer_question(content, question)

    chat_message = ChatMessage(
        user_id=user["username"],  # assuming username is unique
        question=question,
        answer=answer,
        file_name=file.filename if file else None
    )
    save_chat(chat_message)

    return {"question": question, "answer": answer}

@router.get("/chat/history")
def history(user: dict = Depends(require_authenticated_user)):
    return get_chat_history(user["username"])
