import openai
from app.config import OPENROUTER_API_KEY

# Create a client instance
client = openai.OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1")

def summarize_text(content: str) -> str:
    # Construct the prompt
    prompt = f"Summarize the following content in clear, concise bullet points:\n\n{content}"

    try:
        # Make the API call
        response = client.chat.completions.create(
            model="mistralai/mistral-small-3.2-24b-instruct-2506:free", 
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=800
        )

        # Return the generated summary
        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error generating summary: {str(e)}"
