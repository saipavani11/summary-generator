import openai
from app.config import OPENROUTER_API_KEY

client = openai.OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

def answer_question(content: str, question: str) -> str:
    try:
        prompt = (
            f"Use the following context to answer the question.\n\n"
            f"Context:\n{content}\n\n"
            f"Question: {question}\n"
            f"Answer:"
        )

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
