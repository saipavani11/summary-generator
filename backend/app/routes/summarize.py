from fastapi import APIRouter, UploadFile, File, HTTPException, Form, Depends
from typing import Optional
from app.utils.file_parser import parse_pdf, parse_text
from app.services.summarizer import summarize_text
from app.auth.dependencies import get_optional_user

router = APIRouter()


@router.post("/summarize")
async def summarize(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    user: Optional[dict] = Depends(get_optional_user)
):
    try:
        # Restrict guests from sending both file and text
        if not user and file and raw_text:
            raise HTTPException(
                status_code=403,
                detail="Guests can only summarize one file or text at a time."
            )

        # Even authenticated users should not send both
        if file and raw_text:
            raise HTTPException(
                status_code=400,
                detail="Please provide only one input: either file OR raw_text."
            )

        content = ""

        # Handle file input
        if file:
            if file.filename.endswith(".pdf"):
                content = parse_pdf(file)
            elif file.filename.endswith(".txt"):
                content = await parse_text(file)
            else:
                raise HTTPException(
                    status_code=400,
                    detail="Unsupported file format. Only .pdf and .txt files are accepted."
                )

        # Handle raw text input
        elif raw_text:
            content = raw_text

        # No input provided
        else:
            raise HTTPException(status_code=400, detail="No input provided.")

        if not content.strip():
            raise HTTPException(status_code=400, detail="Input content is empty.")
        
        # print("File:", file)
        # print("Raw text:", raw_text)
        # print("Parsed content:", content)

        # print(f"Parsed content: {repr(content)}")

        # Generate summary
        summary = summarize_text(content)

        return {"summary": summary,
                "user": user["username"] if user else "guest"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
