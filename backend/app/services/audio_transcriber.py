# app/services/audio_transcriber.py

import io
import speech_recognition as sr
from pydub import AudioSegment
from pydub.utils import which

async def transcribe_audio(file):
    recognizer = sr.Recognizer()
    AudioSegment.converter = which("ffmpeg")

    # Read audio bytes
    audio_bytes = await file.read()

    # Convert to wav
    audio = AudioSegment.from_file(io.BytesIO(audio_bytes))
    wav_io = io.BytesIO()
    audio.export(wav_io, format="wav")
    wav_io.seek(0)

    # Transcribe using speech recognition
    with sr.AudioFile(wav_io) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)

    return text
