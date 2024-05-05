from logic import get_joke


def fetch_jokes(count: int = 10):
    for _ in range(count):
        get_joke()
