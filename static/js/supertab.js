import "https://js.supertab.co/v1/tab.js";
window.supertab.createPurchaseButton({
    containerElement: document.getElementById("supertab-button"),
    clientId: "client.c80d6a0d-c2c2-4d9d-bd69-be42ff01ba9d",
    merchantName: "Penguin Jokes",
    merchantLogoUrl: "https://www.penguinjokes.lol/static/img/happy.svg",
    offeringId: "offering.ed1207fb-6f7c-45dd-a76b-489b4791a387", // optional
    onPurchaseCompleted: () => {
        console.log("Purchase completed!");
        jokeCounter = 0;
        showJoke();
        hideElement("supertab-button");
        showElement("joke-button");
        showElement("explanation-button");
        showElement("read-button");
        showElement("draw-button");
    },
    onPurchaseCanceled: () => {
        //insert your code to handle when purchase is not completed
        console.log("Purchase canceled!");
    },
    onError: () => {
        //insert your code to handle an unexpected error
        console.log("Purchase error!");
    },
});
