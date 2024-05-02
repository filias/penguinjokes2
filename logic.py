import os
import re

import requests

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


def get_joke():
    response = requests.get(
        "https://icanhazdadjoke.com/", headers={"Accept": "application/json"}
    )
    joke = response.json()["joke"]

    # if the joke does not have a punch line try it again and again
    # the punch line is the part after the question mark
    if "?" not in joke:
        return get_joke()

    # split the joke into question and answer
    question, answer = re.split(r"(?<=\?)", joke)

    return question, answer


def explain_joke(joke: str):
    url = "https://api.openai.com/v1/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }

    data = {
        "model": "gpt-3.5-turbo-instruct",
        "prompt": f"Explain the joke: {joke}",
        "max_tokens": 100,
        "temperature": 0.5
    }

    response = requests.post(url, headers=headers, json=data)

    # Get the text from the response and strip it
    text = response.json()["choices"][0]["text"]
    text = text.strip()
    return text
