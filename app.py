import os

from flask import Flask, render_template, request
from dotenv import load_dotenv

from logic import explain_joke, get_joke, read_joke

load_dotenv()

app = Flask(__name__)


@app.route("/")
def index():
    # if request.headers.get("Hx-Request"):
    #     template = "joke.html"
    # else:
    #     template = "index.html"

    context = dict()

    # Laugh
    context["question"], context["answer"] = get_joke()
    joke = context["question"] + context["answer"]
    context["api_url"] = os.getenv("API_URL")

    # Explain
    explanation = explain_joke(joke)
    if explanation:
        context["explanation"] = explanation
    else:
        context["explanation"] = "Sorry, I don't know the answer."

    # Read
    audio_path = read_joke(joke)
    context["audio_path"] = audio_path

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
    print(f"Speech: {joke}")
    audio_path = read_joke(joke)
    print(f"Audio path: {audio_path}")
    return {"audio_path": str(audio_path)}, 200


if __name__ == "__main__":
    app.run(use_reloader=True, debug=True)
