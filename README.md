# 🧠 Clarity AI – AI-Powered Summarization & QA Platform

This project is a full-stack application for uploading **PDFs, text, and audio** to receive AI-generated **summaries** and ask **questions**. It supports both **guest users** and **authenticated users**, with chat-based Q&A and history tracking.

---

## ✅ Features

### 🔍 Summarization
- Upload **PDF** or **text**
- Smart chunking for **large files**
- View and store **summary results**

### 🔊 Audio Summarization
- Accepts **MP3/WAV** files
- **Transcribes** and summarizes content

### ❓ Question Answering
- Ask 1 question per file (free users)
- Unlimited conversational QA for signed-in users
- Chat history stored per user

### 🔒 Authentication & Authorization
- **JWT-based login/signup**
- Authenticated users get access to:
  - Chat-style QA
  - Summary and chat **history**
  - **Faster** processing

### 🧠 MongoDB Integration
- Stores:
  - User credentials
  - File summaries
  - Chat QA history

### 🧩 Dual Access Levels
- 🌐 **Free Users** (no login required)
- 🔐 **Authenticated Users** (with dashboard and history)

---
## 🔧 Prerequisites

- Python 3.10+
- Node.js + npm (for frontend)
- MongoDB instance or Atlas URI
- API key from [OpenRouter](https://openrouter.ai/)

---

## ⚙️ Backend Setup

### 1. Clone and navigate

```bash
git clone https://github.com/your-username/summary-generator.git
cd summary-generator/backend
```

### 2. Create virtual environment

```bash
python -m venv venv
source venv/bin/activate    # macOS/Linux
venv\Scripts\activate       # Windows
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment variables
```bash
cp .env.example .env  # macOS/Linux
copy .env.example .env  # Windows
```
## Then update .env with your credentials:

OPENROUTER_API_KEY=your-api-key
SECRET_KEY=your-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
MONGODB_URI=your-mongodb-uri
MONGO_DB_NAME=clarity


### 5. Run backend
```bash
uvicorn app.main:app --reload
Swagger UI: http://localhost:8000/docs
```

### 🌐 Frontend Setup
```bash

cd ../frontend
npm install
npm run dev
Visit: http://localhost:5173
```

## 🛡️ Access Levels

| Feature                | Guest User | Authenticated |
|------------------------|------------|----------------|
| Upload PDF/Text        | ✅         | ✅             |
| Audio Upload           | ❌         | ✅             |
| Summarization          | ✅         | ✅             |
| Ask 1 Question         | ✅         | ✅             |
| Unlimited Chat         | ❌         | ✅             |
| Summary/Chat History   | ❌         | ✅             |
| Dashboard              | ❌         | ✅             |

---

## 🧪 Testing API

1. Launch backend
2. Open [http://localhost:8000/docs](http://localhost:8000/docs)
3. Test the following endpoints:

- `/auth/signup`
- `/summary/upload`
- `/qa`
- `/chat`

---

## 🔐 Security Notes

- `.env` is ignored via `.gitignore`
- **Never commit** credentials or API tokens

---

## 🤝 Contributing

Pull requests are welcome! Please follow these guidelines:

- Use clear and meaningful commit messages
- Keep PRs scoped and focused
- Include screenshots for any UI changes

---

## 📜 License

**MIT** – free to use, modify, and share.

---

## 📫 Contact

For support or suggestions, feel free to open a GitHub **issue** or start a **discussion**.

