from fastapi import APIRouter, Depends, HTTPException, Form
from app.auth.dependencies import require_authenticated_user
from app.services.chat import get_chat_response
from typing import Dict

router = APIRouter()

# In-memory history (for demo — in production, use DB)
user_chat_history: Dict[str, list] = {}

@router.post("/")
async def chat_with_context(
    message: str = Form(...),
    user: dict = Depends(require_authenticated_user)
):
    try:
        username = user["username"]

        # Initialize history if not present
        if username not in user_chat_history:
            user_chat_history[username] = []

        # Add the user message
        user_chat_history[username].append({"role": "user", "content": message})

        # Get the response using the conversation history
        response = get_chat_response(user_chat_history[username])

        # Append assistant's reply to history
        user_chat_history[username].append({"role": "assistant", "content": response})

        return {"reply": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
