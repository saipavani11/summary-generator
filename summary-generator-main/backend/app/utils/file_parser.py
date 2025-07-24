import fitz  # PyMuPDF
from docx import Document
from fastapi import UploadFile
import tempfile
import os

def parse_pdf(file) -> str:
    doc = fitz.open(stream=file.file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

async def parse_text(file: UploadFile) -> str:
    # Just .txt files
    return (await file.read()).decode("utf-8")

async def parse_docx(file: UploadFile) -> str:
    # Save to a temporary file because `python-docx` works with file paths
    contents = await file.read()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        doc = Document(tmp_path)
        text = "\n".join(para.text for para in doc.paragraphs)
        return text
    finally:
        os.remove(tmp_path)  # Clean up temp file
