// "pids" are the unique numbers representing the season tickets.
// Each season ticket has a unique pid number.
import pids from "./pids.js";

// The tombola function distributing match tickets.
import tombola from "./tombola.js";

const fullscreenElem = document.getElementById("fullscreen");
const quantityInputElem = document.getElementById("quantity");
const codeInputElem = document.getElementById("code");
const quantitywrapperInputElem = document.getElementById("quantitywrapper");
const codewrapperInputElem = document.getElementById("codewrapper");
const resultElem = document.getElementById("result");
const resultWrapperElem = document.getElementById("resultwrapper");
const loaderElem = document.getElementById("loader");

quantitywrapperInputElem.addEventListener('click', () => {
  loaderElem.style.display = "none";
  resultWrapperElem.style.display = "none";
  quantityInputElem.disabled = false;
  codeInputElem.disabled = false;
  quantityInputElem.focus();
});

codewrapperInputElem.addEventListener('click', () => {
  loaderElem.style.display = "none";
  resultWrapperElem.style.display = "none";
  quantityInputElem.disabled = false;
  codeInputElem.disabled = false;
  codeInputElem.focus();
});

// Clicking the full screen icon in top right will enable or disable full screen:
fullscreenElem.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

// Move focus to the code input field if pressing enter in the quantity input field:
quantityInputElem.addEventListener("keyup", (event) => {
  if (event.key === 'Enter') {
    codeInputElem.focus();
  }
});

// Run the tombola if pressing enter in the code input field:
codeInputElem.addEventListener("keyup", async (event) => {
  if (event.key === 'Enter') {

    event.preventDefault()

    // Get the quantity value. Remove all non-digits, if there are any.
    const quantity = parseInt(quantityInputElem.value.replace(/[^0-9]/g, '')) || 0;

    // Get the code value. Remove trailing whitespaces and make all chars upper case.
    const code = codeInputElem.value.toUpperCase().trim();

    if (code && quantity) {

      // Remove focus from the input fields:
      window.focus();
      if (document.activeElement) {
        document.activeElement.blur();
      }

      // Disable the input fields:
      quantityInputElem.disabled = true;
      codeInputElem.disabled = true;

      // Show loader:
      loaderElem.style.display = "block";

      // Wait 50 milliseconds so the renderer will display to loader before event loop gets clogged by the tombola
      await new Promise(resolve => setTimeout(resolve, 50));

      // Run the tombola:
      const matchTickets = await tombola(pids, code, quantity);

      // If user clicked on the input fields while tombola was working, then we are in "input mode" again,
      // so dont show the results...
      if (quantityInputElem.disabled) {

        // Publish tombola result:
        resultElem.innerHTML = "<span>" + matchTickets.sort().join("</span><span>") + "</span>";

        // Hide loader and show result:
        loaderElem.style.display = "none";
        resultWrapperElem.style.display = "block";
      }

    }
  }
});