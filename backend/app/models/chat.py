from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ChatMessage(BaseModel):
    user_id: str
    session_id: str   # ✅ Add this line
    question: str
    answer: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    file_name: Optional[str] = None
