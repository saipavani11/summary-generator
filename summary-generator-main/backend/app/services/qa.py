import openai
from app.config import OPENROUTER_API_KEY

client = openai.OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

def answer_question(file_content: str, question: str, user_text: str = "") -> str:
    try:
        prompt = f"""
You are an AI assistant that answers questions based on the provided context.

📄 Document:
\"\"\"
{file_content}
\"\"\"

✍️ Additional Notes from the User:
\"\"\"
{user_text}
\"\"\"

❓ Question:
\"\"\"
{question}
\"\"\"

Provide a concise and accurate answer based only on the above information.
"""

        response = client.chat.completions.create(
            model="mistralai/mistral-small-3.2-24b-instruct-2506:free",
            messages=[
                {"role": "system", "content": "You are an assistant that answers questions based on provided content."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=300
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error generating answer: {str(e)}"
