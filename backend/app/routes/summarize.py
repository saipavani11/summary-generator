from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils.file_parser import parse_pdf, parse_text
from app.services.summarizer import summarize_text

router = APIRouter()

@router.post("/summarize")
async def summarize(file: UploadFile = File(...)):
    try:
        if file.filename.endswith(".pdf"):
            content = parse_pdf(file)
        elif file.filename.endswith(".txt"):
            content = await parse_text(file)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
        
        if len(content.strip()) == 0:
            raise HTTPException(status_code=400, detail="File content is empty")

        summary = summarize_text(content)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
