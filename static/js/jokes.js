let jokeCounter = 4;  // We start with 5 to get to the tab button faster

// Button behavior
function hideButton(name) {
    console.log("Hide " + name + " button");
    document.getElementById(name).classList.add("hidden");
}

function showButton(name) {
    console.log("Show " + name + " button");
    document.getElementById(name).classList.remove("hidden");
}

// Joke behavior
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
function hideExplanation() {
    console.log("Hide explanation")
    document.getElementById("joke-explanation").classList.add("hidden");
}
function showExplanation() {
    console.log("Show explanation")
    document.getElementById("joke-explanation").classList.remove("hidden");
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
        hideButton("supertab-button");
        showButton("joke-button");
        showButton("explanation-button");
        showButton("draw-button");
        showButton("read-button");
        jokeCounter++;
    } else {
        hideJoke();
        showButton("supertab-button");
        hideButton("joke-button");
        hideButton("explanation-button");
        hideButton("draw-button");
        hideButton("read-button")
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

function showLoadingScreen() {
    console.log("Show loading screen");
    document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoadingScreen() {
    console.log("Hide loading screen");
    document.getElementById('loadingScreen').style.display = 'none';
}
