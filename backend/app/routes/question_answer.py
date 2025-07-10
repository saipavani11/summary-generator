from fastapi import APIRouter, Request, UploadFile, File, Form, HTTPException
from typing import Optional
from app.utils.file_parser import parse_pdf, parse_text
from app.services.qa import answer_question

router = APIRouter()

@router.post("/answer")
async def get_answer(
    question: str = Form(...),
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None)
):
    try:
        content_parts = []

        # Handle file input
        if file and file.filename != "":
            if file.filename.endswith(".pdf"):
                content_parts.append(parse_pdf(file))
            elif file.filename.endswith(".txt"):
                content_parts.append(parse_text(file))
            else:
                raise HTTPException(status_code=400, detail="Unsupported file format")

        # Handle raw text input
        if text:
            content_parts.append(text)

        # Final combined content
        content = "\n".join(part.strip() for part in content_parts if part and part.strip())

        if not content:
            raise HTTPException(status_code=400, detail="No valid content provided")

        # Answer the question using combined context
        answer = answer_question(content, question)
        return {"question": question, "answer": answer}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
