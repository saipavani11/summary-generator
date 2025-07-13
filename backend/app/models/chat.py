from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ChatMessage(BaseModel):
    user_id: str
    question: str
    answer: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    file_name: Optional[str] = None
