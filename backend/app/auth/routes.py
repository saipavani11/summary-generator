from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import timedelta

from app.auth.auth_utils import verify_password, create_access_token, get_password_hash
from app.auth.models import fake_users_db  # Replace with your real DB logic

router = APIRouter()

# Token response model
class Token(BaseModel):
    access_token: str
    token_type: str

# Request model for registration
class UserCreate(BaseModel):
    username: str
    password: str

# ---------------------------
# Register route
# ---------------------------
@router.post("/register", status_code=201)
def register(user: UserCreate):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    fake_users_db[user.username] = {
        "username": user.username,
        "hashed_password": hashed_password
    }
    return {"message": "User registered successfully"}

# ---------------------------
# Login route
# ---------------------------
@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": form_data.username}, 
        expires_delta=timedelta(minutes=30)
    )
    return {"access_token": access_token, "token_type": "bearer"}
