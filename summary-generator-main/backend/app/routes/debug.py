from fastapi import APIRouter
from app.db.mongo import db

router = APIRouter()

@router.get("/debug/users")
def get_all_users():
    users = list(db.users.find({}, {"_id": 0, "username": 1, "email": 1}))
    return {"users": users}
