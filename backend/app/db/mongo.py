from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

print("Connected to DB:", db.name)

user_collection = db["users"]
summary_collection = db["summaries"]            # Stores uploaded file summaries
chat_collection = db["chat_messages"]           # Stores Q&A messages
session_collection = db["sessions"]             # Stores chat sessions
question_collection = db["questions"]           # (Optional) if storing separate Q&A
document_collection = db["documents"]  