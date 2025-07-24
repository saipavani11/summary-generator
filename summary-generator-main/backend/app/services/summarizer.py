import openai
from app.config import OPENROUTER_API_KEY
from app.utils.chunker import chunk_text

# Create a client instance
client = openai.OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1")

def summarize_text(content: str) -> str:
    try:
        # Split large content into chunks of ~500 tokens
        chunks = chunk_text(content, max_tokens=500, model="gpt-3.5-turbo")

        summaries = []
        for chunk in chunks:
            prompt = f"Summarize the following content in bullet points:\n\n{chunk}"

            response = client.chat.completions.create(
                model="mistralai/mistral-small-3.2-24b-instruct-2506:free",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=400
            )

            summary = response.choices[0].message.content.strip()
            summaries.append(summary)

        # Combine all chunk summaries
        return "\n\n".join(summaries)

    except Exception as e:
        return f"Error generating summary: {str(e)}"