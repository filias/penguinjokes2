from flask import Flask, render_template, request
from dotenv import load_dotenv

from logic import get_joke

load_dotenv()

app = Flask(__name__)

JOKE_COUNTER = 0


@app.route("/")
def index():
    global JOKE_COUNTER
    JOKE_COUNTER += 1
    if request.headers.get("Hx-Request"):
        template = "joke.html"
    else:
        template = "index.html"

    context = {}
    context["question"], context["answer"] = get_joke()
    context["joke_counter"] = JOKE_COUNTER
    return render_template(template, **context)


if __name__ == "__main__":
    app.run(debug=True)
