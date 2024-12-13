(function app() {
  // variables
  // ...
  // functions
  // ...

  // initialization

  // check location
  function checkLocation() {
    const modal = document.querySelector(".c-popin--wrongmarket.c-popin--opened");
    if (modal) {
      const continueButton = modal.querySelector('button[data-action="closePopinButtonContinue"]');
      if (continueButton) {
        continueButton.click();
      }
    }
  }
  // check cookie

  // get data by id

  // save data

  // show data

  // listener/observer

  // sequence get data + save data + show data
})();
