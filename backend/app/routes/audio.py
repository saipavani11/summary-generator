from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
import speech_recognition as sr
from app.services.summarizer import summarize_text
from pydub import AudioSegment
from app.auth.dependencies import require_authenticated_user
from app.services.audio_transcriber import transcribe_audio
import io

router = APIRouter()

@router.post("/summarize-audio")
async def summarize_audio(file: UploadFile = File(...),
                          user: dict = Depends(require_authenticated_user)):
    recognizer = sr.Recognizer()

    try:
        text = await transcribe_audio(file)
        # Summarize text
        summary = summarize_text(text)

        return {
            "transcript": text,
            "summary": summary
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")
