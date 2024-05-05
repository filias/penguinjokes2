import os
from typing import Optional
from uuid import uuid4

from sqlmodel import Field, Session, SQLModel, create_engine, select

sqlite_filename = "jokes.db"
sqlite_url = f"sqlite:///{sqlite_filename}"
engine = create_engine(sqlite_url, echo=True)


class Joke(SQLModel, table=True):
    __tablename__ = "jokes"

    id: str = Field(default=str(uuid4()), primary_key=True)
    question: str = Field(index=True, nullable=False, unique=True)
    answer: Optional[str] = None
    explanation: Optional[str] = None
    image: Optional[str] = None


def save_joke(question: str, answer: str) -> str:
    # Create the tables if the db file does not exist
    if not os.path.isfile(sqlite_filename):
        SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        # Check if the joke already exists
        statement = select(Joke).where(Joke.question == question)
        results = session.exec(statement)
        joke = results.first()
        if joke:
            joke_id = joke.id
        else:  # Save the joke to the database
            joke = Joke(question=question, answer=answer)
            joke_id = joke.id
            session.add(joke)
            session.commit()

    return joke_id


def update_joke_image(joked_id: str, image: str = None):
    with Session(engine) as session:
        statement = select(Joke).where(Joke.id == joked_id)
        results = session.exec(statement)
        joke = results.first()
        joke.image = image
        session.add(joke)
        session.commit()


def update_joke_explanation(joked_id: str, explanation: str = None):
    with Session(engine) as session:
        statement = select(Joke).where(Joke.id == joked_id)
        results = session.exec(statement)
        joke = results.first()
        joke.explanation = explanation
        session.add(joke)
        session.commit()
