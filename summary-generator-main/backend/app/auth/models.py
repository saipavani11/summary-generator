from app.auth.auth_utils import get_password_hash

fake_users_db = {
    "alice": {
        "username": "alice",
        "hashed_password": get_password_hash("password123")
    }
}
