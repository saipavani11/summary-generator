from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.routes import summarize, audio, question_answer, chat
from app.auth.routes import router as auth_router
from app.auth.dependencies import require_authenticated_user

app = FastAPI(
    title="AI Summarizer & QA API",
    description="Summarize text/audio/pdf and ask questions with optional authentication",
    version="1.0.0"
)

# ✅ Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Public Authentication Endpoints
app.include_router(auth_router, prefix="/auth", tags=["Auth"])

# ✅ Public Access Routes (with guest limitations handled inside the routes)
app.include_router(summarize.router)
app.include_router(audio.router)
app.include_router(question_answer.router)

# ✅ Protected Routes (like chat with memory, history, etc.)
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

# ✅ Test route to verify auth token
@app.get("/protected", tags=["Test"])
def protected_route(user: dict = Depends(require_authenticated_user)):
    return {"message": f"Hello {user['username']}, you're authenticated!"}

