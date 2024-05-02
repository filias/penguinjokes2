let jokeCounter = 4;  // We start with 5 to get to the tab button faster

// Button behavior
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
function hideExplanationButton() {
    console.log("Hide explanation button")
    document.getElementById("explanation-button").classList.add("hidden");
}
function showExplanationButton() {
    console.log("Show explanation button")
    document.getElementById("explanation-button").classList.remove("hidden");
}
function hideReadButton() {
    console.log("Hide read button")
    document.getElementById("read-button").classList.add("hidden");
}
function showReadButton() {
    console.log("Show read button")
    document.getElementById("read-button").classList.remove("hidden");
}
function hideImageButton() {
    console.log("Hide image button")
    document.getElementById("draw-button").classList.add("hidden");
}
function showImageButton() {
    console.log("Show image button")
    document.getElementById("draw-button").classList.remove("hidden");
}

// Joke behavior
function hideExplanation() {
    console.log("Hide explanation")
    document.getElementById("joke-explanation").classList.add("hidden");
}
function showExplanation() {
    console.log("Show explanation")
    document.getElementById("joke-explanation").classList.remove("hidden");
}
function hideJoke() {
    console.log("Hide joke")
    document.getElementById("joke-question").classList.add("hidden");
    document.getElementById("joke-answer").classList.add("hidden");
}
function showJoke() {
    console.log("Show joke")
    document.getElementById("joke-question").classList.remove("hidden");
    document.getElementById("joke-answer").classList.remove("hidden");
}
function hideImage() {
    console.log("Hide image")
    document.getElementById("image-explanation").classList.add("hidden");
}
function showImage() {
    console.log("Show image")
    document.getElementById("image-explanation").classList.remove("hidden");
}
function swapJoke(question, answer) {
    console.log("Swap joke")
    document.getElementById("joke-question").innerText = question;
    document.getElementById("joke-answer").innerText = answer;
}
function playJoke() {
    console.log("Play joke")
    document.getElementById("joke-audio").play();
}

// Function called by the Laugh button
// It counts jokes and fetches all additional things: audio, image, explanation
async function countJokes() {
    hideJoke()
    hideExplanation();
    hideImage();

    // Laugh
    let joke = await getJoke();
    let [question, answer] = await splitJoke(joke);

    // Explain
    let explanation = await explainJoke(joke);
    document.getElementById("explanation").innerText = explanation;

    // Read
    let audio_path = await readJoke(joke);
    document.getElementById("joke-audio").src = audio_path;

    // Draw
    let image_url = await drawJoke(joke);
    document.getElementById("joke-image").src = image_url;

    // Swap joke
    swapJoke(question, answer);

    // Count
    console.log("Joke counter: " + jokeCounter)
    if (jokeCounter < 5) {
        hideSupertabButton();
        showJokeButton();
        showJoke();
        showExplanationButton();
        showImageButton();
        showReadButton();
        jokeCounter++;
    } else {
        showSupertabButton();
        hideJoke();
        hideJokeButton();
        hideExplanationButton();
        hideImageButton();
        hideReadButton();
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
    console.log("Split joke: " + joke);
    let question;
    let answer;
    if(!joke.includes("?")) {
        question = joke;
        answer = "";
    } else {
        // Split the joke into question and answer
        let parts = joke.split(/(\?)/); // Split the string at the "?", including "?" in the resulting array
        question = parts.slice(0, parts.length - 1).join(""); // Join all parts except the last one to form the question
        answer = parts[parts.length - 1]; // The last part is the answer
    }

    console.log("Question: " + question + " Answer: " + answer);
    return [question, answer];
}
