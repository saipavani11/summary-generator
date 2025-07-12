import json
from datetime import datetime
import os

def save_to_history(username, question, content, answer):
    path = f"history/{username}.json"
    os.makedirs("history", exist_ok=True)

    try:
        with open(path, "r") as f:
            data = json.load(f)
    except FileNotFoundError:
        data = []

    data.append({
        "question": question,
        "content": content[:100],  # store preview only
        "answer": answer,
        "timestamp": datetime.now().isoformat()
    })

    with open(path, "w") as f:
        json.dump(data, f, indent=2)
