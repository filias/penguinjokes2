var jokeCounter = 5;  // We start with 5 to get to the tab button faster

function hideSupertabButton() {
    console.log("Hide supertab button")
    document.getElementById("supertab-button").classList.add("hidden");
}
function showSupertabButton() {
    console.log("Show supertab button")
    document.getElementById("supertab-button").classList.remove("hidden");
}
function hideJokeButton() {
    console.log("Hide joke button")
    document.getElementById("joke-button").classList.add("hidden");
}
function showJokeButton() {
    console.log("Show joke button")
    document.getElementById("joke-button").classList.remove("hidden");
}
function hideJoke() {
    console.log("Hide joke")
    document.getElementById("joke").classList.add("hidden");
}
function showJoke() {
    console.log("Show joke")
    document.getElementById("joke").classList.remove("hidden");
}
function hideExplanationButton() {
    console.log("Hide explanation button")
    document.getElementById("explanation-button").classList.add("hidden");
}
function showExplanationButton() {
    console.log("Show explanation button")
    document.getElementById("explanation-button").classList.remove("hidden");
}
function hideExplanation() {
    console.log("Hide explanation")
    document.getElementById("joke-explanation").classList.add("hidden");
}
function showExplanation() {
    console.log("Show explanation")
    document.getElementById("joke-explanation").classList.remove("hidden");
}
function swapJoke(question, answer) {
    console.log("Swap joke")
    document.getElementById("joke-question").innerText = question;
    document.getElementById("joke-answer").innerText = answer;
}
async function countJokes() {
    hideExplanation();
    var joke = await getJoke();
    var explanation = await explainJoke(joke);
    document.getElementById("explanation").innerText = explanation;
    var [question, answer] = await splitJoke(joke);
    swapJoke(question, answer);

    console.log("Joke counter: " + jokeCounter)
    if (jokeCounter < 5) {
        hideSupertabButton();
        showJokeButton();
        showJoke();
        showExplanationButton();
        jokeCounter++;
    } else {
        showSupertabButton();
        hideJoke();
        hideJokeButton();
        hideExplanationButton()
    }
    console.log("Joke counter: " + jokeCounter);
}

async function getJoke() {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json",
            "User-Agent": "python-requests/2.31.0",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive",
        }
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data["joke"];
}

async function splitJoke(joke) {
    // if the joke does not have a punch line try it again and again
    // the punch line is the part after the question mark
    console.log(joke);
    while (!joke.includes("?")) {
        joke = await getJoke()
    }

    // split the joke into question and answer
    var parts = joke.split(/(\?)/); // Split the string at the "?", including "?" in the resulting array

    var question = parts.slice(0, parts.length - 1).join(""); // Join all parts except the last one to form the question
    var answer = parts[parts.length - 1]; // The last part is the answer

    console.log("Question: " + question + " Answer: " + answer);
    return [question, answer];
}
