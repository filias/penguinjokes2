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
    context["explanation"] = explain_joke(context["question"] + context["answer"])["choices"][0]["text"]
    return render_template(template, **context)


@app.route("/explain")
def explain():
    joke = request.args.get("joke")
    print(joke)
    explanation = explain_joke(joke)
    print(explanation)
    return explanation


if __name__ == "__main__":
    app.run(use_reloader=True, debug=True)
