from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pymongo import MongoClient
import os
from jose import JWTError, jwt
from app.config import SECRET_KEY, ALGORITHM
from app.db.mongo import db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("MONGO_DB_NAME", "ai_app")]
users_collection = db["users"]

async def get_optional_user(token: str = Depends(oauth2_scheme)) -> Optional[dict]:
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            return None

        # ✅ Query the MongoDB users collection
        user = users_collection.find_one({"username": username})
        return user
    except JWTError:
        return None

def require_authenticated_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # ✅ Now check in MongoDB
    user = users_collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user