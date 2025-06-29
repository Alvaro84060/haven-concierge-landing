"use strict";

var _servicesTypesData = require("./services-types-data");
var _utils = require("./utils");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var servicesContainer = document.querySelector('.block-wrapper.services-types__list');
var drycleanContainer = document.querySelector('.dry-clean__list');
createServiceItemsList();
createDrycleanItemsList();
var drycleanSwiper = initializeDrycleanSwiper();
var slideList = document.querySelectorAll('.swiper-slide');
_toConsumableArray(slideList).forEach(function (item) {
  return item.setAttribute('role', 'Слайд');
});
drycleanSliderEventHandlers(drycleanSwiper);
function initializeDrycleanSwiper() {
  var swiper = new Swiper('.swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    loopedSlides: 2,
    watchOverflow: true,
    slideToClickedSlide: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    mousewheel: {
      invert: true
    },
    autoplay: {
      delay: 1500,
      disabledOnInteraction: true
    }
  });
  return swiper;
}
function createServiceItemsList() {
  _servicesTypesData.servicesItemsData.forEach(function (_ref) {
    var imageName = _ref.imageName,
      imageText = _ref.imageText;
    var listItem = createServiceItem(imageName, imageText);
    servicesContainer.appendChild(listItem);
  });
}
function createDrycleanItemsList() {
  _servicesTypesData.drycleanData.forEach(function (_ref2) {
    var name = _ref2.name,
      cost = _ref2.cost,
      duration = _ref2.duration,
      file = _ref2.file;
    var listItem = createDrycleanItem({
      name: name,
      cost: cost,
      duration: duration,
      file: file
    });
    drycleanContainer.appendChild(listItem);
  });
}
function createServiceItem(imageName, text) {
  var listItem = document.createElement('li');
  listItem.className = 'buildings__item services-types__item';
  var imgSrcPath = "images/services/".concat(imageName);
  listItem.innerHTML = "\n    <div class=\"buildings__icon-wrap\">\n      <picture class=\"services__image\">\n        <source srcset=\"".concat(imgSrcPath.replace('png', 'webp'), " 1x, ").concat(imgSrcPath.replace('@1x', '@2x').replace('png', 'webp'), " 2x\" type=\"image/webp\">\n        <source srcset=\"").concat(imgSrcPath, " 1x, ").concat(imgSrcPath.replace('@1x', '@2x'), " 2x\" type=\"image/png\">\n        <img width=\"100\" height=\"100\" src=\"").concat(imgSrcPath, "\" alt=\"\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u043F\u043E\u0441\u043B\u0443\u0433\u0438\">\n      </picture>\n    </div>\n    <h3 class=\"block__title buildings__text services-types__text\">").concat(text, "</h3>\n  ");
  return listItem;
}
function createDrycleanItem(_ref3) {
  var name = _ref3.name,
    cost = _ref3.cost,
    duration = _ref3.duration,
    file = _ref3.file;
  var li = document.createElement('li');
  li.className = 'dry-clean__item swiper-slide';
  var imageUrl = (0, _utils.getImageUrl)('services/dryclean', (0, _utils.getImageName)(file));
  if ((0, _utils.canUseWebP)()) {
    li.style.backgroundImage = imageUrl;
  } else {
    li.style.cssText = "background-image: ".concat(imageUrl);
  }
  var title = document.createElement('h3');
  title.className = 'dry-clean__title';
  title.textContent = name;
  var costEl = document.createElement('p');
  costEl.className = 'dry-clean__cost';
  costEl.textContent = "~".concat(cost);
  var durationEl = document.createElement('p');
  durationEl.className = 'dry-clean__duration';
  durationEl.innerHTML = "<i class=\"fa-regular fa-clock\"></i> ".concat(duration);
  li.appendChild(title);
  li.appendChild(costEl);
  li.appendChild(durationEl);
  return li;
}
function drycleanSliderEventHandlers(gallery) {
  var drycleanSlider = document.querySelector('.dry-clean__swiper');
  drycleanSlider.addEventListener('mouseleave', function () {
    gallery.params.autoplay.disableOnInteraction = false;
    gallery.params.autoplay.delay = 1500;
    gallery.autoplay.start();
  });
  drycleanSlider.addEventListener('mouseenter', function () {
    gallery.autoplay.stop();
  });
}
//# sourceMappingURL=services-types.js.map
