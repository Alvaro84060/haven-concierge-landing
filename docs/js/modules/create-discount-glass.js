"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGlass = createGlass;
var _utils = require("./utils");
function createGlass(description, terms, promo) {
  var glass = document.createElement('div');
  glass.className = 'swiper-slide__glass';
  var descriptionElem = createGlassDescriptions(description, 'glass__descr');
  var termsElem = createGlassTerms(terms, 'glass__terms');
  var promoElem = createGlassPromo(promo);
  glass.appendChild(descriptionElem);
  glass.appendChild(termsElem);
  glass.appendChild(promoElem);
  return glass;
}
function createGlassTerms(content, className) {
  var elem = document.createElement('p');
  elem.className = className;
  elem.innerHTML = highlightTermsInString(content);
  return elem;
}
function createGlassDescriptions(content, className) {
  var container = document.createElement('div');
  container.className = className;
  var sentences = (0, _utils.splitContent)(content);
  sentences.forEach(function (sentence) {
    var elem = document.createElement('p');
    elem.innerHTML = highlightDiscountInString(sentence);
    container.appendChild(elem);
  });
  return container;
}
function createGlassPromo(promo) {
  var wrap = document.createElement('div');
  wrap.className = "promo";
  var leftBlock = createPromoBlock("glass__promo promo__wrapper promo__wrapper--left", "ПРОМОКОД");
  var rightBlock = createPromoBlock("promo__wrapper promo__wrapper--right");
  var text = document.createElement('span');
  text.innerHTML = promo;
  text.className = 'promo__text';
  rightBlock.appendChild(text);
  rightBlock.appendChild(createCopyIcon());
  wrap.appendChild(leftBlock);
  wrap.appendChild(rightBlock);
  return wrap;
}
function createPromoBlock(className) {
  var innerHTML = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var block = document.createElement('div');
  block.className = className;
  block.innerHTML = innerHTML;
  return block;
}
function highlightDiscountInString(sentence) {
  var regex = /(\d+%)/g;
  var modifiedSentence = sentence.replace(regex, '<span class="glass__accent">$1</span>');
  return modifiedSentence;
}
function highlightTermsInString(inputString) {
  var regex = /з (.*?) по (.*?) (\d{4} року)/g;
  var highlightedString = inputString.replace(regex, function (match, term1, term2, year) {
    return "\u0437 <span class=\"glass__accent--term\">".concat(term1, "</span> \u043F\u043E <span class=\"glass__accent--term\">").concat(term2, " ").concat(year, "</span> ");
  });
  return highlightedString;
}
function createCopyIcon() {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "promo__copy-icon");
  svg.setAttribute("width", "30");
  svg.setAttribute("height", "30");
  var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "images/sprite.svg#icon-copy");
  svg.appendChild(use);
  return svg;
}
//# sourceMappingURL=create-discount-glass.js.map
