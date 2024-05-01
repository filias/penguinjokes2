from pydantic_settings import BaseSettings


class JokesSettings(BaseSettings):
    openai_api_key: str = "dummy"


settings = JokesSettings()
