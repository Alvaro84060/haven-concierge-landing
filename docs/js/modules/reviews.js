"use strict";

var _reviewsData = require("./reviews-data");
var _masonryLayout = _interopRequireDefault(require("masonry-layout"));
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var currentReviewBlock = 1;
document.addEventListener("DOMContentLoaded", initializeReviewSwiper);
function initializeReviewSwiper() {
  var reviewsList = document.querySelector('.reviews__swiper');
  var mobileReviewsList = document.querySelector('.mobile__reviews-list');
  var showMoreReviewsBtn = document.querySelector('.mobile__show-more-btn');
  var chunkSize = 6;
  var chunkedReviews = (0, _utils.chunkArray)(_reviewsData.reviews, chunkSize);
  initializeReviews(reviewsList, mobileReviewsList, chunkedReviews);
  initializeMasonry('.reviews__list');
  var gallery = initializeGallery('.gallery');
  reviewsSliderEventHandlers(gallery);
  showMoreReviewsBtn.addEventListener('click', function () {
    return showMoreReviews(mobileReviewsList, showMoreReviewsBtn);
  });
  var slideList = document.querySelectorAll('.swiper-slide');
  _toConsumableArray(slideList).forEach(function (item) {
    return item.setAttribute('role', 'Слайд');
  });
}
function initializeReviews(reviewsList, mobileReviewsList, chunkedReviews) {
  chunkedReviews.forEach(function (chunk) {
    reviewsList.appendChild(createReviewElement('swiper-slide', 'reviews__list', chunk));
    mobileReviewsList.appendChild(createReviewElement('mobile__swiper-slide', 'mobile__reviews', chunk));
  });
}
function initializeMasonry(selector) {
  var grids = document.querySelectorAll(selector);
  grids.forEach(function (grid) {
    var masonry = new _masonryLayout["default"](grid, {
      itemSelector: '.reviews__item',
      gutter: 30
    });
  });
}
function initializeGallery(selector) {
  var gallery = new Swiper(selector, {
    direction: 'horizontal',
    effect: 'slider',
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    mousewheel: {
      invert: true
    },
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.gallery__next-btn',
      prevEl: '.gallery__prev-btn'
    },
    pagination: {
      el: '.gallery__swiper-pagination',
      clickable: true,
      type: 'progressbar'
    }
  });
  return gallery;
}
function reviewsSliderEventHandlers(gallery) {
  var reviewsSlider = document.querySelector('.gallery');
  reviewsSlider.addEventListener('mouseleave', function () {
    gallery.params.autoplay.disableOnInteraction = false;
    gallery.params.autoplay.delay = 2000;
    gallery.autoplay.start();
  });
  reviewsSlider.addEventListener('mouseenter', function () {
    gallery.autoplay.stop();
  });
}
function showMoreReviews(mobileReviewsList, showMoreReviewsBtn) {
  var reviewsBlockList = mobileReviewsList.querySelectorAll('.mobile__swiper-slide');
  reviewsBlockList[currentReviewBlock].style.display = 'list-item';
  currentReviewBlock++;
  if (currentReviewBlock >= reviewsBlockList.length) {
    showMoreReviewsBtn.style.display = 'none';
  }
}
function createReviewElement(itemClassName, listClassName, reviews) {
  var listItem = document.createElement('li');
  listItem.className = itemClassName;
  var ul = document.createElement('ul');
  ul.className = listClassName;
  reviews.forEach(function (reviewData, index) {
    ul.appendChild(createReviewItem(index + 1, reviewData));
  });
  listItem.appendChild(ul);
  return listItem;
}
function createReviewItem(index, reviewData) {
  var li = document.createElement('li');
  li.className = "reviews__item item-".concat(index);
  var title = createTitle(reviewData.name);
  var ratingStars = createRatingStars(reviewData.rating);
  var text = createText(reviewData.text);
  li.appendChild(title);
  li.appendChild(ratingStars);
  li.appendChild(text);
  return li;
}
function createRatingStars(rating) {
  var ratingList = document.createElement('ul');
  ratingList.className = 'review__rating';
  for (var i = 0; i < rating; i++) {
    ratingList.appendChild(createRatingItem());
  }
  return ratingList;
}
function createRatingItem() {
  var ratingItem = document.createElement('li');
  ratingItem.className = 'rating__item';
  var pictureParams = {
    width: 20,
    srcPrefix: 'images/reviews/tablet/star',
    media: '(max-width: 1439px)',
    alt: 'Жовта зірка',
    className: 'rating__icon'
  };
  var picture = (0, _utils.createPicture)(pictureParams);
  ratingItem.appendChild(picture);
  return ratingItem;
}
function createTitle(name) {
  var title = document.createElement('h3');
  title.className = 'review__title';
  title.textContent = name;
  return title;
}
function createText(textContent) {
  var text = document.createElement('p');
  text.className = 'review__text';
  text.innerHTML = textContent;
  return text;
}
//# sourceMappingURL=reviews.js.map
