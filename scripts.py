from logic import get_joke, explain_joke, draw_joke
from models import save_joke, update_joke_explanation, update_joke_image


def fetch_jokes(count: int = 10):
    for _ in range(count):
        question, answer = get_joke()
        joke_id = save_joke(question, answer)

        # Explain the joke
        explanation = explain_joke(f"{question} {answer}")
        update_joke_explanation(joke_id, explanation)

        # Draw joke
        image_url = draw_joke(f"{question} {answer}")
        update_joke_image(joke_id, image_url)
