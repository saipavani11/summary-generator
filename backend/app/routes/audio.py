from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
import speech_recognition as sr
from app.services.summarizer import summarize_text
from pydub import AudioSegment
from app.auth.dependencies import require_authenticated_user
import io

router = APIRouter()

@router.post("/summarize-audio")
async def summarize_audio(file: UploadFile = File(...),
                          user: dict = Depends(require_authenticated_user)):
    recognizer = sr.Recognizer()

    try:
        # Convert file bytes to audio segment
        from pydub import AudioSegment
        from pydub.utils import which

        AudioSegment.converter = which("ffmpeg")
        audio_bytes = await file.read()
        audio = AudioSegment.from_file(io.BytesIO(audio_bytes))

        # Export to wav (required by SpeechRecognition)
        wav_io = io.BytesIO()
        audio.export(wav_io, format="wav")
        wav_io.seek(0)

        # Transcribe audio
        with sr.AudioFile(wav_io) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)

        # Summarize text
        summary = summarize_text(text)

        return {
            "transcript": text,
            "summary": summary
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")
