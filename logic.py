import os
import random
import re
from pathlib import Path
from typing import Tuple

from openai import OpenAI
import requests

JOKES_API_URL = "https://icanhazdadjoke.com/"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"]
openai_client = OpenAI()


def get_joke() -> Tuple[str, str]:
    response = requests.get(JOKES_API_URL, headers={"Accept": "application/json"})
    joke = response.json()["joke"]

    # If the joke does not have a punch line the answer is empty
    if "?" not in joke:
        question = joke
        answer = ""
    else:
        # Split the joke into question and answer
        question, answer = re.split(r"(?<=\?)", joke)

    return question, answer


def explain_joke(joke: str) -> str:
    response = openai_client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=f"Explain the joke: {joke}",
        max_tokens=128,
    )
    # Get the text from the response and strip it
    text = response.choices[0].text
    text = text.strip()

    return text


def read_joke(joke: str) -> str:
    voice = random.choice(VOICES)
    audio_path = Path("static/audio/speech.mp3")
    response = openai_client.audio.speech.create(model="tts-1", voice=voice, input=joke)
    response.stream_to_file(audio_path)

    return audio_path


def draw_joke(joke: str) -> str:
    response = openai_client.images.generate(
        model="dall-e-3", prompt=joke, size="1024x1024", quality="standard", n=1
    )
    image_url = response.data[0].url

    return image_url
