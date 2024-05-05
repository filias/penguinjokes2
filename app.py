import os

from flask import Flask, render_template, request
from dotenv import load_dotenv

from logic import explain_joke, get_joke, read_joke, draw_joke

load_dotenv()

app = Flask(__name__)


@app.route("/")
def index():
    context = dict()

    # Laugh
    question, answer = get_joke()
    joke = f"{question} {answer}"
    context["question"] = question
    context["answer"] = answer
    context["api_url"] = os.getenv("API_URL")

    # Explain
    explanation = explain_joke(joke)
    context["explanation"] = (
        explanation if explanation else "Sorry, I don't know the answer."
    )

    # Read
    audio_path = read_joke(joke)
    context["audio_path"] = audio_path

    # Draw
    image_url = draw_joke(joke)
    context["image_url"] = image_url

    return render_template("index.html", **context)


@app.route("/explain")
def explain():
    joke = request.args.get("joke")
    print(f"Explain: {joke}")
    explanation = explain_joke(joke)
    print(f"Explanation: {explanation}")
    return {"text": explanation}, 200


@app.route("/read")
def read():
    joke = request.args.get("joke")
    print(f"Read: {joke}")
    audio_path = read_joke(joke)
    print(f"Audio path: {audio_path}")
    return {"audio_path": str(audio_path)}, 200


@app.route("/draw")
def draw():
    joke = request.args.get("joke")
    print(f"Draw: {joke}")
    image_url = draw_joke(joke)
    print(f"Image url: {image_url}")
    return {"image_url": str(image_url)}, 200


if __name__ == "__main__":
    app.run(use_reloader=True, debug=True)
