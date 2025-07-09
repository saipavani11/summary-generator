# 🧠 AI Summary Generator App

This project allows users to upload `.pdf` or `.txt` files and generates clean, concise summaries using an AI model (via OpenRouter). The backend is built with **FastAPI**, and the app is capable of handling multiple input types (one at a time).

---

## 🚀 Features

- 📄 Accepts `.pdf` and `.txt` file uploads
- 📝 Submitting raw text directly through an input form
- 🤖 Generates summaries using AI (Mistral model via OpenRouter)
- 🔒 API key security using `.env`
- 🗂️ Organized backend with routes, services, and utilities


---

## 📁 Folder Structure

```
summary-generator/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   ├── .env             <-- Not committed (contains your secret API key)
│   ├── .env.example     <-- Sample of required environment variables
│   ├── requirements.txt <-- All dependencies listed here
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

- Open `.env` and paste your OpenRouter API key:

```env
OPENROUTER_API_KEY=your-api-key-here
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
```

Each team member should copy this file as `.env` and paste their actual key.

---

