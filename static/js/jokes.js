let jokeCounter = 4;  // We start with 5 to get to the tab button faster

// Element behavior
function hideElement(name) {
    console.log("Hide " + name + " element");
    document.getElementById(name).classList.add("hidden");
}

function showElement(name) {
    console.log("Show " + name + " element");
    document.getElementById(name).classList.remove("hidden");
}

function toggleElementById(id) {
    console.log("Toggling " + id + " element");
    let element = document.getElementById(id);
    if (element.classList.contains("hidden")) {
        showElement(id)
    } else {
        hideElement(id);
    }
}

// Joke behavior
function hideJoke() {
    console.log("Hide joke")
    hideElement("joke-question");
    hideElement("joke-answer");
}

function showJoke() {
    console.log("Show joke")
    showElement("joke-question");
    showElement("joke-answer");
}

function hideExplanation() {
    console.log("Hide explanation")
    hideElement("joke-explanation")
}

function hideImage() {
    console.log("Hide image")
    hideElement("image-explanation")
}

function swapJoke(question, answer) {
    console.log("Swap joke")
    document.getElementById("joke-question").innerText = question;
    document.getElementById("joke-answer").innerText = answer;
}

function playStopJoke() {
    audio = document.getElementById("joke-audio")
    if (!audio.paused) {
        console.log('Pause audio.');
        audio.pause();
    } else {
        console.log('Play audio.');
        audio.play();
    }
}

function showLoadingScreen() {
    console.log("Show loading screen");
    document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoadingScreen() {
    console.log("Hide loading screen");
    document.getElementById('loadingScreen').style.display = 'none';
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
    showLoadingScreen();
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
    hideLoadingScreen();

    // Count
    console.log("Joke counter: " + jokeCounter)
    if (jokeCounter < 5) {
        showJoke();
        hideElement("supertab-button");
        showElement("joke-button");
        showElement("explanation-button");
        showElement("draw-button");
        showElement("read-button");
        jokeCounter++;
    } else {
        hideJoke();
        showElement("supertab-button");
        hideElement("joke-button");
        hideElement("explanation-button");
        hideElement("draw-button");
        hideElement("read-button")
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
    if (!joke.includes("?")) {
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
