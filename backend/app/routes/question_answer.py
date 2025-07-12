from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Request
from typing import Optional
from app.utils.file_parser import parse_pdf, parse_text
from app.services.qa import answer_question  # expects (file_content, question, user_text)
from app.auth.dependencies import get_optional_user
from typing import Optional

router = APIRouter()

guest_questions_asked = set()

@router.post("/answer")
async def get_answer(
    request : Request,
    question: str = Form(...),
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None),
    user: Optional[str] = Depends(get_optional_user)
):
    
    if not user and len(question.strip().split()) > 30:
        raise HTTPException(status_code=403, detail="Login to ask detailed or follow-up questions.")

    try:

        # Get IP address for guest tracking
        client_ip = request.client.host

        # Restrict guests to 1 question per session
        if not user and client_ip in guest_questions_asked:
            raise HTTPException(status_code=403, detail="Guests can only ask one question. Please log in to continue.")


        file_content = ""

        # Handle file input
        if file and file.filename != "":
            if file.filename.endswith(".pdf"):
                file_content = parse_pdf(file)
            elif file.filename.endswith(".txt"):
                file_content = parse_text(file)
            else:
                raise HTTPException(status_code=400, detail="Unsupported file format")

        # print(f"Parsed content: {repr(file_content)}")

        # Use text directly as user input
        user_text = text if text else ""

        # print(f"Parsed content: {repr(user_text)}")
        
        # Check if at least one content source is provided
        if not file_content.strip() and not user_text.strip():
            raise HTTPException(status_code=400, detail="No valid content provided")


        # Call updated answer_question function
        answer = answer_question(file_content, question, user_text)

        if not user:
            guest_questions_asked.add(client_ip)

        return {"question": question, "answer": answer}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
