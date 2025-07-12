import openai
from app.config import OPENROUTER_API_KEY

client = openai.OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

def get_chat_response(history: list) -> str:
    try:
        response = client.chat.completions.create(
            model="mistralai/mistral-small-3.2-24b-instruct-2506:free",
            messages=history,
            temperature=0.5,
            max_tokens=500
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error generating response: {str(e)}"
