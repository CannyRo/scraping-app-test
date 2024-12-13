(function app() {
  // variables
  // ...
  // functions
  // ...

  // initialization
  function init() {
    checkLocation();
    checkCookie();
  }
  // check location
  function checkLocation() {
    const modal = document.querySelector(
      ".c-popin--wrongmarket.c-popin--opened"
    );
    if (modal) {
      const continueButton = modal.querySelector(
        'button[data-action="closePopinButtonContinue"]'
      );
      if (continueButton) {
        continueButton.click();
      }
    }
  }
  // check cookie
  function checkCookie() {
    const modal = document.querySelector("#onetrust-banner-sdk");
    if (modal.style.display === "") {
      const acceptOnlyNecessaryCookie = modal.querySelector(
        "#onetrust-reject-all-handler"
      );
      if (acceptOnlyNecessaryCookie) {
        acceptOnlyNecessaryCookie.click();
      }
    }
  }
  // get data by id

  // save data

  // show data

  // listener/observer

  // sequence get data + save data + show data

  // Init ON
  init();
})();
