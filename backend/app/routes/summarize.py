from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from app.utils.file_parser import parse_pdf, parse_text
from app.services.summarizer import summarize_text

router = APIRouter()

@router.post("/summarize")
async def summarize(file: UploadFile = File(...),
                    raw_text: str = Form(None)
    ):
    try:
        if file and raw_text:
            raise HTTPException(status_code=400, detail="Please provide only one: file OR raw_text")
        
        if file:
            if file.filename.endswith(".pdf"):
                content = parse_pdf(file)
            elif file.filename.endswith(".txt"):
                content = await parse_text(file)
            else:
                raise HTTPException(status_code=400, detail="Unsupported file format")
        
        elif raw_text:
            content = raw_text
        else:
            raise HTTPException(status_code=400, detail="No input provided")
        
        if len(content.strip()) == 0:
            raise HTTPException(status_code=400, detail="File content is empty")

        summary = summarize_text(content)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/summarize-text")
async def summarize_from_text(text: str = Form(...)):
    try:
        if len(text.strip()) == 0:
            raise HTTPException(status_code=400, detail="Input text is empty")

        summary = summarize_text(text)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
