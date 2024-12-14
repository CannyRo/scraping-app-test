(function app() {
  // variables
  let registeredData = [];
  let temporaryData = [];
  // functions
  // ...

  // initialization
  function init() {
    checkLocation();
    checkCookie();
    // let myProduct = getProductById("814415W3XUA9010");
    // console.log("myProduct", myProduct);
    // observeProducts();
    observeDynamicallyProducts();
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
  function getProductById(id) {
    myProductElement = document.querySelector(`.c-product[data-pid="${id}"]`);
    const rawDataString = myProductElement.getAttribute("data-gtmproduct");
    const dataJson = JSON.parse(rawDataString);
    addCurrency();
    // console.log("data from product : ", dataJson.id);
    // console.log(dataJson);
    function addCurrency() {
      const currencyNode = myProductElement.querySelector(
        "meta[itemprop='priceCurrency']"
      );
      const myCurrency = currencyNode.getAttribute("content");
      dataJson.currency = myCurrency;
    }
    return dataJson;
  }
  // save data
  function saveData(temporaryArray, permanentArray) {
    console.log("TEMPORARY DATA : ", temporaryArray);
    console.log("REGISTERED DATA : ", permanentArray);
    permanentArray.push(...temporaryArray);
    console.log("=== REGISTERED DATA ===");
    console.log(permanentArray);
    console.log("=== === ===");
  }
  // show formatted data
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
    console.log("# # # FORMATTED DATA # # #");
    console.table(formattedDataArray);
  }
  // clear temporary
  function clearTemporaryData() {
    console.log("Clear temporary data ON");
    temporaryData = [];
    console.log("temporaryData => ", temporaryData);
  }

  // listener/observer
  function observeDynamicallyProducts() {
    const container = document.querySelector("body");
    const selector = "article.c-product";
    const optionParams = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
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
          console.log(`L'élément ${entry.target.className} est visible.`);
          //   console.log("==>");
          console.log(entry.target);
          let myId = entry.target.getAttribute("data-pid");
          if (!entry.target.dataset.registered) {
            console.log(`Lancer la fonction getProductById(${myId})`);
            let thisProduct = getProductById(myId);
            temporaryData.push(thisProduct);
            entry.target.dataset.registered = true;
          } else {
            console.log(`PRODUIT DEJA VU ET AFFICHE DONC NE RIEN FAIRE`);
          }
        }
      });
      console.log("END of forEach in intersectionCallback");
      if (temporaryData.length > 0) {
        // start formatted function
        showFormattedData(temporaryData);
        // end formatted function
        // start save data function
        saveData(temporaryData, registeredData);
        // end save data function
        // start clear temporary data function
        clearTemporaryData();
        // end clear temporary data function
      }
    };
    const observer = new IntersectionObserver(
      intersectionCallback,
      optionParams
    );
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // console.log(mutation.target.localname);
        if (mutation.type === "childList") {
          console.log("mutation childList detected");
          elementList = document.querySelectorAll(selector);
          initializeObserver(elementList, observer);

        //   const addedNodes = Array.from(mutation.addedNodes).filter(
        //     (node) => node.matches && node.matches(selector)
        //   );
        //   console.log("addedNodes : ", addedNodes);
        //   if (addedNodes.length > 0) {
        //     console.log(`${addedNodes.length} nouvel(s) élément(s) détecté(s)`);
        //     initializeObserver(addedNodes, observer); // Observer les nouveaux éléments
        //   }
        }
      });
    });
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });
    initializeObserver(elementList, observer);
  }
  // sequence get data + save data + show data

  // Init ON
  init();
})();
