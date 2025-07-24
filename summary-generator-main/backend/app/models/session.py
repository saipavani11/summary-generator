from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class SessionCreate(BaseModel):
    session_name: str
    file_name: Optional[str] = None

class SessionInDB(SessionCreate):
    user_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    document_contents: Optional[List[str]] = Field(default_factory=list)