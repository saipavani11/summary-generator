import fitz  # PyMuPDF

def parse_pdf(file) -> str:
    doc = fitz.open(stream=file.file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def parse_text(file) -> str:
    return file.file.read().decode("utf-8")
