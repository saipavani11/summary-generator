from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import timedelta

from app.auth.auth_utils import verify_password, create_access_token, get_password_hash
from app.db.mongo import db  # Make sure this connects to your MongoDB
from bson.objectid import ObjectId

router = APIRouter()

# Token response model
class Token(BaseModel):
    access_token: str
    token_type: str

# Request model for registration
class UserCreate(BaseModel):
    username: str
    password: str

@router.post("/register", status_code=201)
def register(user: UserCreate):
    existing_user = db.users.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = get_password_hash(user.password)
    db.users.insert_one({
        "username": user.username,
        "hashed_password": hashed_password
    })
    return {"message": "User registered successfully"}

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.users.find_one({"username": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer"}
