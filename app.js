(function app() {
  // Variables
  let registeredData = []; // Where we register all products after displayed them on screen
  let temporaryData = []; // Where we register the onscreen products before displayed them
  // Initialization
  function init() {
    checkLocation();
    checkCookie();
    observeDynamicallyProducts();
  }
  // Check Location Modal
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
  // Check Cookie Modal
  function checkCookie() {
    const modal = document.querySelector("#onetrust-banner-sdk");
    if (modal?.style.display === "") {
      const acceptOnlyNecessaryCookie = modal.querySelector(
        "#onetrust-reject-all-handler"
      );
      if (acceptOnlyNecessaryCookie) {
        acceptOnlyNecessaryCookie.click();
      }
    }
  }
  // Get data/product by ID
  function getProductById(id) {
    myProductElement = document.querySelector(`.c-product[data-pid="${id}"]`);
    const rawDataString = myProductElement.getAttribute("data-gtmproduct");
    const dataJson = JSON.parse(rawDataString);
    addCurrency();
    function addCurrency() {
      const currencyNode = myProductElement.querySelector(
        "meta[itemprop='priceCurrency']"
      );
      const myCurrency = currencyNode.getAttribute("content");
      dataJson.currency = myCurrency;
    }
    return dataJson;
  }
  // Save data from temporary to permanent variable
  function saveData(temporaryArray, permanentArray) {
    permanentArray.push(...temporaryArray);
  }
  // Show the onscreen products after formatted them
  function showFormattedData(temporaryArray) {
    let formattedDataArray = [];
    temporaryArray.map((temporaryItem) => {
      let formattedData = {
        id: temporaryItem?.id,
        name: temporaryItem?.name,
        price: `${temporaryItem?.price} ${temporaryItem?.currency}`,
      };
      formattedDataArray.push(formattedData);
    });
    console.log("###/// Onscreen New Products ///###");
    console.table(formattedDataArray);
  }
  // Clear temporary data cause we've already shown them
  function clearTemporaryData() {
    temporaryData = [];
  }
  // Observer functioon
  function observeDynamicallyProducts() {
    const container = document.querySelector("body");
    const selector = "article.c-product";
    const optionParams = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Here we assume to count an element only if it's 80% visible at least 
    };
    let elementList = document.querySelectorAll(selector);
    const initializeObserver = (elementList, observer) => {
      elementList.forEach((element) => {
        if (!element.dataset.observed) {
          observer.observe(element);
          element.dataset.observed = true;
        }
      });
    };
    const intersectionCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let myId = entry.target.getAttribute("data-pid");
          if (!entry.target.dataset.registered) {
            let thisProduct = getProductById(myId);
            temporaryData.push(thisProduct);
            entry.target.dataset.registered = true;
          }
        }
      });
      if (temporaryData.length > 0) {
        showFormattedData(temporaryData);
        saveData(temporaryData, registeredData);
        clearTemporaryData();
      }
    };
    const observer = new IntersectionObserver(
      intersectionCallback,
      optionParams
    );
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          elementList = document.querySelectorAll(selector);
          initializeObserver(elementList, observer);
        }
      });
    });
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });
    initializeObserver(elementList, observer);
  }
  // Start the init sequence function
  init();
})();
