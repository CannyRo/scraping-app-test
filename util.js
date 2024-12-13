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

// Get 1 product by id example id="814415W3XUA9010"
(function getProductById(id = "814415W3XUA9010") {
  // myProductElement = document.querySelector('.c-product[data-pid="814415W3XUA9010"]');
  myProductElement = document.querySelector(`.c-product[data-pid="${id}"]`);
  const rawDataString = myProductElement.getAttribute("data-gtmproduct");
  const dataJson = JSON.parse(rawDataString);
  addCurrency();
  console.log("data from product : ", dataJson.id);
  console.log(dataJson);
  function addCurrency() {
    const currencyNode = myProductElement.querySelector(
      "meta[itemprop='priceCurrency']"
    );
    const myCurrency = currencyNode.getAttribute("content");
    dataJson.currency = myCurrency;
  }
  return dataJson;
})();

// Observe if products are visible and get their datas
(function observeProducts() {
  const elementList = document.querySelectorAll("article.c-product");
  if (elementList.length > 0) {
    const optionParams = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(`Element ${entry.target.className} is visible.`);
          console.log("==>");
          console.log(entry.target);
        }
      });
    }, optionParams);
    elementList.forEach((element) => observer.observe(element));
  } else {
    console.log("No element found");
  }
})();

// Observe 	dynamically if products are visible and get their datas
// because some products are injected in html with scroll event
(function observeDynamicallyProducts() {
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
        console.log("==>");
        console.log(entry.target);
        let myId = entry.target.getAttribute("data-pid");
        if (!entry.target.dataset.registered) {
          console.log(`Lancer la fonction getOneProduct(${myId})`);
          entry.target.dataset.registered = true;
        } else {
          console.log(`PORDUIT DEJA VU ET AFFICHE DONC NE RIEN FAIRE`);
        }
      }
    });
  };
  const observer = new IntersectionObserver(intersectionCallback, optionParams);
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log(mutation.target.localname);
      if (mutation.type === "childList") {
        console.log('mutation childList detected');
        elementList = document.querySelectorAll(selector);
        // initializeObserver(elementList, observer);
      }
    });
  });
  mutationObserver.observe(container, {
    childList: true,
    subtree: true,
  });
  initializeObserver(elementList, observer);
})();
