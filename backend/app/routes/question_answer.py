from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from app.utils.file_parser import parse_pdf, parse_text
from app.services.qa import answer_question  # expects (file_content, question, user_text)

router = APIRouter()

@router.post("/answer")
async def get_answer(
    question: str = Form(...),
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None)
):
    try:
        file_content = ""

        # Handle file input
        if file and file.filename != "":
            if file.filename.endswith(".pdf"):
                file_content = parse_pdf(file)
            elif file.filename.endswith(".txt"):
                file_content = parse_text(file)
            else:
                raise HTTPException(status_code=400, detail="Unsupported file format")

        # Use text directly as user input
        user_text = text if text else ""

        # Check if at least one content source is provided
        if not file_content.strip() and not user_text.strip():
            raise HTTPException(status_code=400, detail="No valid content provided")

        # Call updated answer_question function
        answer = answer_question(file_content, question, user_text)

        return {"question": question, "answer": answer}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
