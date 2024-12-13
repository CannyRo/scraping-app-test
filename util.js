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
