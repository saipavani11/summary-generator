# 🧠 AI-Powered Summarizer & Question Answering Backend

This is a FastAPI backend that accepts PDFs, text, and audio to generate summaries and provide answers to questions. It includes user authentication, chat-like question answering, and MongoDB integration to store summary and QA history.

---

## ✅ Features Implemented

### 🔍 Summarization
- Accepts **PDF** or **raw text**
- Supports **large files** via chunking
- Stores **summary results** in the database

### 🔊 Audio Summarization
- Upload **audio files (e.g., MP3/WAV)**
- Transcribes and summarizes the content

### ❓ Question Answering
- Basic QA: Ask questions on uploaded content
- Chat-like memory for conversational QA
- Summary and QA **history stored per user**

### 🔒 Authentication
- User **sign-up** / **login** with JWT-based authentication
- Protected endpoints (`/summary`, `/chat`, `/qa`) require auth
- Optional guest support for limited access

### 🧠 MongoDB Integration
- Stores:
  - User credentials
  - Summary history
  - Chat QA history
- Secure environment variables used for credentials

---

## 📁 Folder Structure

```
summary-generator/
│
├── backend/
│   ├── app/
│   │   ├── auth/                       # 🔐 Authentication logic
|   |   |   ├── models.py
│   │   │   ├── routes.py               # Signup/Login routes
│   │   │   ├── dependencies.py         # Auth token logic (require_authenticated_user)
│   │   │   └── auth-utils.py                # Hashing, token creation, validation
│   │   │
│   │   ├── db/
│   │   │   └── mongo.py                # MongoDB client & DB reference
|   |   |
|   |   ├── models/
|   |   |   └──chat.py                  #schema/model for storing chat-based question-answer sessions
|   |   |   └──user.py                  # schema/model for user accounts,
│   │   │
│   │   ├── routes/                     # 📤 Core API endpoints
│   │   │   ├── summarize.py            # Accepts PDF/text and returns summary
│   │   │   ├── audio.py                # Accepts audio, transcribes & summarizes
│   │   │   ├── question_answer.py      # Basic question answering
│   │   │   ├── chat.py                 # Chat-style QA with history
│   │   │   ├── debug.py                # Debug/test routes
│   │   │   └── __init__.py
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py             #📁 Holds core business logic used by routes
│   │   │   ├── chat_logic.py           #Implements the logic for chat-based question answering sessions
│   │   │   ├── qa.py                   #Handles basic question answering over summarized content (non-chat)
│   │   │   ├── summarizer.py           #Implements summarization logic
│   │   │
│   │   ├── utils/                      # 🧠 Helper modules
│   │   │   ├── chunking.py             # Chunk large inputs
│   │   │   ├── file_parser.py          # To parse the file and extract its contents
│   │   │
│   │   ├── config.py                   # 🔐 Secret keys, algorithm, config vars
│   │   └── __init__.py
│   │
│   ├── main.py                         # 🚀 Entry point for FastAPI
│   ├── .env                            # 🌱 Environment variables
│   ├── .env.example                    # 🧪 Example env for collaborators
│   ├── requirements.txt                # 📦 Python dependencies
│   └── README.md                       # 📘 Backend-specific README
│
├── frontend/                           # (If present, frontend React/Next.js/etc.)
│   └── ...                             # You can keep frontend separate or integrated
│
└── README.md                           # 📘 Main project README (overview)

```

---

## 🔧 Prerequisites

- Python 3.10+ installed
- Git installed
- An API key from [OpenRouter](https://openrouter.ai/)
- (Optional) Use a virtual environment (recommended)

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/summary-generator.git
cd summary-generator/backend
```

### 2. Create a virtual environment

```bash
python -m venv venv
source venv/bin/activate    # On Mac/Linux
venv\Scripts\activate       # On Windows
```

### 3. Install required packages

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

- Copy the `.env.example` file and rename it to `.env`

```bash
cp .env.example .env  # On Mac/Linux
copy .env.example .env  # On Windows
```

### 5. Run the Backend
```bash
# From backend/ directory
set PYTHONPATH=.
uvicorn app.main:app --reload
```

- Open `.env` and paste your API key:

```env
OPENROUTER_API_KEY=your-api-key-here
SECRET_KEY=your_Secret_key
ALGORITHM=algorithm
ACCESS_TOKEN_EXPIRE_MINUTES=token_expire_time
MONGODB_URI=your_mongodb_uri
MONGO_DB_NAME=your_mongodb_name

```

---

## 🏃 Running the App

Make sure you're in the `backend/` directory and your virtual environment is activated.

```bash
uvicorn app.main:app --reload
```

Then open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to test the `/summarize` endpoint using the Swagger UI.

---

## 🧪 Testing Summary Generation

1. Upload a `.pdf` or `.txt` file
2. Receive a summarized response from the AI model

---

## 🔐 Security

- `.env` is **excluded from GitHub** using `.gitignore`
- Never share your API keys or commit the `.env` file

---

## 📄 Environment Template

Here’s what your `.env.example` should contain:

```env
OPENROUTER_API_KEY=your-api-key-here
SECRET_KEY=your_Secret_key
ALGORITHM=algorithm
ACCESS_TOKEN_EXPIRE_MINUTES=token_expire_time
MONGODB_URI=your_mongodb_uri
MONGO_DB_NAME=your_mongodb_name
```

Each team member should copy this file as `.env` and paste their actual key.

---

