from fastapi import APIRouter, HTTPException, Body, Request, Depends
from newspaper import Article
from app.services.summarizer import summarize_text  # assuming you already have this function
from app.auth.dependencies import get_optional_user

free_usage_tracker = set()
router = APIRouter()

@router.post("/summarize/url", tags=["Summarization"])
async def summarize_from_url(
                            request: Request,
                            url: str = Body(..., embed=True),
                            user: dict = Depends(get_optional_user)):

    client_ip = request.client.host
    # Check if user is authenticated
    if user:
        # Authenticated users can use freely
        pass
    else:
        # If unauthenticated and already used before → deny
        if client_ip in free_usage_tracker:
            raise HTTPException(
                status_code=403,
                detail="Free usage limit reached. Please log in to continue."
            )
        # First time use → allow and record
        free_usage_tracker.add(client_ip)

    try:
        article = Article(url)
        article.download()
        article.parse()
        content = article.text
        if not content:
            raise HTTPException(status_code=400, detail="Unable to extract content from the URL.")
        
        summary = summarize_text(content)
        return {"url": url, "summary": summary}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing URL: {str(e)}")
