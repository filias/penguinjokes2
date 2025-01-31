import { createPaygateExperience } from "https://js.supertab.co/v2/experiences.js";
const { show } = await createPaygateExperience({
  clientId: "client.c80d6a0d-c2c2-4d9d-bd69-be42ff01ba9d",
  experienceId: "experience.a7f94472-5e88-41dc-a6e9-ffa3ca0cfd27",
  onPurchaseCompleted: () => {
    //insert your code to grant user access
    console.log("Paygate completed!");
  },
  onPurchaseCanceled: () => {
    //insert your code to handle when purchase is not completed
    console.log("Paygate canceled!");
    // Redirect to the paygateRedirectUrl
    window.location.href = "https://www.penguinjokes.lol";
  },
  onPriorEntitlement: () => {
    //insert your code to handle when user has prior entitlement
    console.log("Paygate: User has prior entitlement. Showing the content.");
  },
  onError: (error) => {
    //insert your code to handle an unexpected error
    console.error("Paygate error!", error);
  },
})
// The "show()" method call is an example of how to trigger the Paygate.
// For custom behavior, use methods like "hide", "toggle", "isShowing", or "destroy".
show();
