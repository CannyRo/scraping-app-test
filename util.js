// Some Snippet of app.js to build it piece by piece

// Manage location modal
(function checkLocation() {
  const modal = document.querySelector(".c-popin--wrongmarket.c-popin--opened");
  if (modal) {
    const continueButton = modal.querySelector(
      'button[data-action="closePopinButtonContinue"]'
    );
    if (continueButton) {
      continueButton.click();
    }
  }
})();

// Manage cookie modall
(function checkCookieModal() {
  const modal = document.querySelector("#onetrust-banner-sdk");
  if (modal.style.display === "") {
    const acceptOnlyNecessaryCookie = modal.querySelector(
      "#onetrust-reject-all-handler"
    );
    if (acceptOnlyNecessaryCookie) {
      acceptOnlyNecessaryCookie.click();
    }
  }
})();
