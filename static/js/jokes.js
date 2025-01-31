// Element behavior
function hideElement(name) {
    console.log("Hide " + name + " element");
    document.getElementById(name).classList.add("hidden");
}

function showElement(name) {
    console.log("Show " + name + " element");
    document.getElementById(name).classList.remove("hidden");
}

function clearElement(name) {
    console.log("Clear " + name + " element");
    document.getElementById(name).innerText = "";
}

function clearElementSrc(name) {
    console.log("Clear " + name + " element");
    document.getElementById(name).src = "";
    console.log("Image src: " + document.getElementById(name).src);
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
// clears elements and fetches a new joke
async function getJoke() {
    showJoke();
    showElement("joke-button");
    showElement("explanation-button");
    showElement("draw-button");
    showElement("read-button");

    // Clear all current joke elements
    clearElement("joke-full");
    clearElement("joke-question");
    clearElement("joke-answer");
    clearElement("explanation");
    clearElementSrc("joke-image");
    clearElementSrc("joke-audio");

    // Hide elements
    hideExplanation();
    hideImage();

    // Get new joke
    let joke = await getJokeAux();
    document.getElementById("joke-full").innerText = joke;
    let [question, answer] = await splitJoke(joke);
    swapJoke(question, answer);
}


// Function called by the Explain button
// It shows the explanation of the joke
async function getExplanation() {
    console.log("Get explanation");
    let joke = document.getElementById("joke-full");
    let explanation = document.getElementById("explanation");
    console.log("Explanation: " + explanation.innerText);

    if(joke && explanation.innerText === "") {
        let explanation_text = await explainJoke(joke.innerText);
        explanation.innerText = explanation_text;
        console.log("Explanation: " + explanation_text);
    }

    toggleElementById("joke-explanation");
}


async function getAudio() {
    console.log("Get audio");
    let joke = document.getElementById("joke-full");
    let audio_element = document.getElementById("joke-audio");
    console.log(audio_element);
    console.log("Audio src: " + audio_element.src);

    if(joke && (audio_element.src.includes("penguin") || audio_element.src.includes("localhost") || audio_element.src === "")) {
        let audio_src = await readJoke(joke.innerText);
        console.log("Audio source: " + audio_src);
        audio_element.src = audio_src;
    }

    // Play/Stop audio
    if (!audio_element.paused) {
        console.log('Pause audio.');
        audio_element.pause();
    } else {
        console.log('Play audio.');
        audio_element.play();
    }
}


// Function called by the Draw button
// It shows the image of the joke
async function getImage() {
    console.log("Get image");
    let joke = document.getElementById("joke-full");
    let image = document.getElementById("joke-image");
    console.log("Image src: " + image.src);
    console.log("Joke: " + joke.innerText)

    if(joke && (image.src.includes("penguin") || image.src.includes("localhost"))) {
        let image_url = await drawJoke(joke.innerText);
        image.src = image_url;
        console.log("Image url: " + image_url);
    }
    toggleElementById("image-explanation");
}
