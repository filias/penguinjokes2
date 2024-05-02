import os
import random
import re
from pathlib import Path

from openai import OpenAI
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
        "Authorization": f"Bearer {OPENAI_API_KEY}",
    }

    data = {
        "model": "gpt-3.5-turbo-instruct",
        "prompt": f"Explain the joke: {joke}",
        "max_tokens": 100,
        "temperature": 0.5,
    }

    response = requests.post(url, headers=headers, json=data)

    # Get the text from the response and strip it
    text = response.json()["choices"][0]["text"]
    text = text.strip()
    return text


VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"]


def read_joke(joke: str):
    voice = random.choice(VOICES)
    speech_filepath = Path("static/audio/speech.mp3")
    client = OpenAI()
    response = client.audio.speech.create(model="tts-1", voice=voice, input=joke)
    response.stream_to_file(speech_filepath)

    return speech_filepath


def draw_joke(joke: str):
    client = OpenAI()
    response = client.images.generate(
        model="dall-e-3", prompt=joke, size="1024x1024", quality="standard", n=1
    )
    img_url = response.data[0].url

    return img_url
