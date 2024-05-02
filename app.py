import json
import os

from flask import Flask, render_template, request
from dotenv import load_dotenv

from logic import explain_joke, get_joke

load_dotenv()

app = Flask(__name__)


@app.route("/")
def index():
    if request.headers.get("Hx-Request"):
        template = "joke.html"
    else:
        template = "index.html"

    context = {}
    context["question"], context["answer"] = get_joke()
    context["api_url"] = os.getenv("API_URL")

    explanation = explain_joke(context["question"] + context["answer"])
    if explanation:
        context["explanation"] = explanation
    else:
        context["explanation"] = "Sorry, I don't know the answer."
    return render_template(template, **context)


@app.route("/explain")
def explain():
    joke = request.args.get("joke")
    print(joke)
    explanation = explain_joke(joke)
    print(explanation)
    return {"text": explanation}, 200


if __name__ == "__main__":
    app.run(use_reloader=True, debug=True)
