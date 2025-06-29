"use strict";

var _discountsData = require("./discounts-data");
var _utils = require("./utils");
var _createDiscountGlass = require("./create-discount-glass");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var externalSliderContainer = document.querySelector('.swiper-container-parent');
var externalSwiperWrapper = createExternalSwiperWrap();
externalSliderContainer.appendChild(externalSwiperWrapper);
var initialExternalSlide = getInitialExternalSlide();
var externalSwiper = initializeExternalSwiper(initialExternalSlide);
var innerSliderContainers = document.querySelectorAll('.swiper-container-nested');
innerSliderContainers.forEach(initializeInnerSwiper);
externalSliderContainer.addEventListener('click', handleCopyPromo);
var slideList = document.querySelectorAll('.swiper-slide');
_toConsumableArray(slideList).forEach(function (item) {
  return item.setAttribute('role', 'Слайд');
});
function initializeExternalSwiper(initialSlide) {
  return new Swiper('.swiper-container-parent', {
    spaceBetween: 20,
    initialSlide: initialSlide,
    effect: 'fade',
    slidesPerView: 1,
    speed: 1500,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    mousewheel: {
      invert: true
    },
    pagination: {
      el: ".swiper-pagination-parent",
      clickable: true,
      renderBullet: renderExternalBullet
    }
  });
}
function initializeInnerSwiper(container) {
  var slides = container.children[0].children;
  var array = Array.from(slides).map(function (i) {
    return i.getAttribute('data-name');
  });
  var innerSwiper = new Swiper(container, {
    direction: "vertical",
    effect: 'slider',
    slidesPerView: 1,
    speed: 1000,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    mousewheel: {
      invert: true
    },
    nested: true,
    pagination: {
      el: ".swiper-pagination-nested",
      clickable: true,
      renderBullet: function renderBullet(index, className) {
        var namePag = array[index];
        return '<span class="' + className + '">' + namePag + '</span>';
      }
    }
  });
}
function getInitialExternalSlide() {
  var currentSeason = getSeason();
  return ['spring', 'summer', 'autumn', 'winter'].indexOf(currentSeason) + 1 || 0;
}
function createExternalSlide(season) {
  var slide = document.createElement('li');
  slide.className = "swiper-slide swiper-slide--".concat(season);
  var swiperContainer = createInnerSliderContainer(season);
  slide.appendChild(swiperContainer);
  return slide;
}
function createExternalSwiperWrap() {
  var swiperWrapper = document.createElement('ul');
  swiperWrapper.className = 'swiper-wrapper discounts__swiper-wrapper';
  var seasons = Object.keys(_discountsData.seasonDiscountInfo);
  seasons.forEach(function (season) {
    var seasonSlide = createExternalSlide(season);
    swiperWrapper.appendChild(seasonSlide);
  });
  return swiperWrapper;
}
function renderExternalBullet(index, className) {
  var seasons = Object.keys(_discountsData.seasonDiscountInfo);
  var season = seasons[index];
  var classSpan = "discount__pagination-btn btn--".concat(season);
  var svg = createExternalPagIcon(season);
  return '<span class="' + className + " " + classSpan + '">' + svg.outerHTML + '</span>';
}
function createExternalPagIcon(season) {
  var svg = document.createElement('svg');
  svg.className = 'discount__pagination-icon';
  svg.width = 40;
  svg.height = 40;
  var use = document.createElement('use');
  use.setAttribute('href', "images/sprite.svg#icon-".concat(season));
  svg.appendChild(use);
  return svg;
}
function createInnerSwiperSlide(season, imageIndex) {
  var _seasonDiscountInfo$s = _discountsData.seasonDiscountInfo[season][imageIndex],
    image = _seasonDiscountInfo$s.image,
    dataName = _seasonDiscountInfo$s.dataName,
    description = _seasonDiscountInfo$s.description,
    terms = _seasonDiscountInfo$s.terms,
    promo = _seasonDiscountInfo$s.promo;
  var imageUrl = (0, _utils.getImageUrl)('discounts', (0, _utils.getImageName)(image));
  var slide = createInnerSlideBlock(season, dataName, imageUrl);
  slide.appendChild((0, _createDiscountGlass.createGlass)(description, terms, promo));
  return slide;
}
function createInnerSlideBlock(season, dataName, imageUrl) {
  var slide = document.createElement('div');
  slide.className = "swiper-slide discounts__slide discounts__slide--".concat(season);
  slide.setAttribute('data-name', dataName);
  if ((0, _utils.canUseWebP)()) {
    slide.style.backgroundImage = imageUrl;
  } else {
    slide.style.cssText = "background-image: ".concat(imageUrl);
  }
  return slide;
}
function createInnerSliderContainer(season) {
  var container = document.createElement('div');
  container.className = 'swiper-container-nested';
  var innerWrapper = document.createElement('div');
  innerWrapper.className = 'swiper-wrapper discounts__inner-swiper-wrapper';
  _discountsData.seasonDiscountInfo[season].forEach(function (_, i) {
    innerWrapper.appendChild(createInnerSwiperSlide(season, i));
  });
  container.appendChild(innerWrapper);
  var pagination = document.createElement('div');
  pagination.className = 'swiper-pagination swiper-pagination-nested';
  container.appendChild(pagination);
  return container;
}
function getSeason() {
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var seasonStartMonths = [2, 5, 8, 11];
  var seasonNames = ['spring', 'summer', 'autumn', 'winter'];
  for (var i = 0; i < seasonStartMonths.length; i++) {
    if (currentMonth >= seasonStartMonths[i] && currentMonth < seasonStartMonths[i + 1]) {
      return seasonNames[i];
    }
  }
}
function handleCopyPromo(e) {
  var clickedEl = e.target;
  var isCopyIcon = clickedEl.classList.contains('promo__copy-icon');
  if (isCopyIcon) {
    var textEl = clickedEl.previousElementSibling;
    var text = textEl.textContent;
    (0, _utils.copyToClipboard)(text);
    textEl.classList.add('isCopied');
    setTimeout(function () {
      textEl.classList.remove('isCopied');
    }, 1000);
  }
}
//# sourceMappingURL=discounts.js.map
