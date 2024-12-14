# scraping-app-test
A snippet JS to scrap some data.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

- Load the page https://www.balenciaga.com/en-us/women/shoes/sneakers into your browser.
(This page is made up of thumbnails of articles that you can browse by scrolling down the page.)
- The aim of the exercise is to write a Javascript code snippet (in native JS if possible).
1) Once copied/pasted into the console, after the page has loaded, this snippet should display in the console the name and price of the items displayed, and only these.
2) If the user scrolls down the page, either with the mouse or the side navigation bar, the code should automatically push into the console the information for the new products displayed.
3) If the user re-displays products already pushed into the console, no information should be returned.

### Links

- Solution Repository URL: [Click here](https://github.com/CannyRo/scraping-app-test)
- Page Targeted: [Click here](https://www.balenciaga.com/en-us/women/shoes/sneakers)

## My process

### Built with

- JavaScript

### What I learned

I've started an introduction to data scraping with Javascript and learn how use the Intersection Observer API and the MutationObserver.

### Useful resources

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - This helped me to detect visibility of an element (In my example, if a product is visible I display his name and price in the console).
- [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) - This helped me to detect mutation in the DOM (In my example, if new products are injected in the DOM after scrolling near the footer I can re initialize the observer to take these new elements into account).

## Author

- Website - [WhatCannyDev is searching a work-study contract in France](https://cannyro.github.io/hire_mr_canny/en)
- GitHub - [@CannyRo](https://github.com/CannyRo)
- LinkedIn - [Ronan CANNY](https://www.linkedin.com/in/ronan-canny-b29443277/)