from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.routes import summarize, audio, question_answer
from app.auth.routes import router as auth_router
from app.auth.dependencies import require_authenticated_user

from app.routes import chat

from app.routes import debug

from app.routes import summarize_url

app = FastAPI(
    title="AI Summarizer & QA API",
    description="Summarize text/audio/pdf and ask questions with optional authentication",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "API is working"} 

# ✅ Public Authentication Endpoints
app.include_router(auth_router, prefix="/auth", tags=["Auth"])

# ✅ Public Access Routes (with guest limitations handled inside the routes)
app.include_router(summarize.router)
app.include_router(audio.router)
app.include_router(question_answer.router)

# ✅ Protected Routes (like chat with memory, history, etc.)
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

app.include_router(debug.router, prefix="/debug", tags=["Debug"])

app.include_router(summarize_url.router)

# ✅ Test route to verify auth token
@app.get("/protected", tags=["Test"])
def protected_route(user: dict = Depends(require_authenticated_user)):
    return {"message": f"Hello {user['username']}, you're authenticated!"}


@app.get("/test-db")
def test_db():
    from app.db.mongo import db
    return {"collections": db.list_collection_names()}

app.include_router(auth_router, prefix="/auth")