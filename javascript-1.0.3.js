// Info on the different lottery occasions:
import occasions from "./occasions-1.0.3.js";

// The tombola function distributing match tickets.
import tombola from "./tombola-1.0.1.js";

const fullscreenElem = document.getElementById("fullscreen");
const occasionInputElem = document.getElementById("occasion");
const codeInputElem = document.getElementById("code");
const occasionwrapperInputElem = document.getElementById("occasionwrapper");
const codewrapperInputElem = document.getElementById("codewrapper");
const resultElem = document.getElementById("result");
const resultWrapperElem = document.getElementById("resultwrapper");
const loaderElem = document.getElementById("loader");

occasionwrapperInputElem.addEventListener('click', () => {
  loaderElem.style.display = "none";
  resultWrapperElem.style.display = "none";
  occasionInputElem.disabled = false;
  codeInputElem.disabled = false;
  occasionInputElem.focus();
});

codewrapperInputElem.addEventListener('click', () => {
  loaderElem.style.display = "none";
  resultWrapperElem.style.display = "none";
  occasionInputElem.disabled = false;
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

// Populate the occasion select element
occasionInputElem.innerHTML =
  occasions.map((item, index) => {
    return `<option value="${index}">${item.name} - ${item.quantity} vinnare</option>`
  });
occasionInputElem.value = occasions.length - 1;
codeInputElem.value = currentOccasion().winningCode || "";

// Returns the currently selected occasion
function currentOccasion() {
  return occasions[occasionInputElem.value];
}

// If choosing a historic occasion, then we populate the code box with the code that was drawn at the occasion:
occasionInputElem.addEventListener("change", () => {
  codeInputElem.value = currentOccasion().winningCode || "";
});

// Run the tombola if pressing enter in the code input field:
codeInputElem.addEventListener("keyup", async (event) => {
  if (event.key === 'Enter') {

    event.preventDefault()

    // Get the quantity value. Remove all non-digits, if there are any.
    //const quantity = parseInt(quantityInputElem.value.replace(/[^0-9]/g, '')) || 0;
    const quantity = currentOccasion().quantity;

    // Get the code value. Remove trailing whitespaces and make all chars upper case.
    const code = codeInputElem.value.toUpperCase().trim();

    if (code && quantity) {

      // Remove focus from the input fields:
      window.focus();
      if (document.activeElement) {
        document.activeElement.blur();
      }

      // Disable the input fields:
      occasionInputElem.disabled = true;
      codeInputElem.disabled = true;

      // Show loader:
      loaderElem.style.display = "block";

      // Wait 50 milliseconds so the renderer will display to loader before event loop gets clogged by the tombola
      await new Promise(resolve => setTimeout(resolve, 50));

      // Run the tombola:
      const matchTickets = await tombola(currentOccasion().pids, code, quantity);

      // If user clicked on the input fields while tombola was working, then we are in "input mode" again,
      // so dont show the results...
      if (occasionInputElem.disabled) {

        // Publish tombola result:
        resultElem.innerHTML = "<span>" + matchTickets.sort().join("</span> <span>") + "</span>";

        // Hide loader and show result:
        loaderElem.style.display = "none";
        resultWrapperElem.style.display = "block";
      }

    }
  }
});
