from logic import get_joke, explain_joke, draw_joke
from models import save_joke, update_joke_explanation, update_joke_image


def fetch_jokes(count: int = 10):
    for _ in range(count):
        print(f"Fetching joke {_ + 1}/{count}")
        question, answer = get_joke()
        joke_id = save_joke(question, answer)
        print(f"Joke saved with id: {joke_id}: {question} {answer}")

        # Explain the joke
        explanation = explain_joke(f"{question} {answer}")
        update_joke_explanation(joke_id, explanation)
        print(f"Joke explained: {explanation}")

        # Draw joke
        image_url = draw_joke(f"{question} {answer}")
        update_joke_image(joke_id, image_url)
        print(f"Joke drawn: {image_url}")
