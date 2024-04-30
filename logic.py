import re

import requests


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
