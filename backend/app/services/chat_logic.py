from app.db.mongo import db
from app.models.chat import ChatMessage

def save_chat(message: ChatMessage):
    db.chats.insert_one(message.dict())

def get_chat_history(user_id: str):
    return list(db.chats.find({"user_id": user_id}, {"_id": 0}))
