"use strict";

var _masonryLayout = _interopRequireDefault(require("masonry-layout"));
var _beforeAfterData = require("./before-after-data");
var _generateComparisonSlider = require("./generate-comparison-slider");
var _initializeComparisonSlider = require("./initialize-comparison-slider");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var grid = document.querySelector('.comparison__slider-list');
var buttonContainer = document.querySelector(".comparison__categories-list");
var showMoreBtn = document.querySelector('.btn-wrap--more');
var showLessBtn = document.querySelector('.btn-wrap--less');
var gutterSize = 20;
var chosenCategory = 'Всі';
var itemsPerPage = 6;
var displayedItems = 0;
initializeBeforeAfterBlock();
function initializeBeforeAfterBlock() {
  createCategoryItemsList();
  createInitialComparisonSliderList();
  initializeMasonry();
  buttonContainer.addEventListener('click', handleCategory);
  document.addEventListener('DOMContentLoaded', function () {
    return (0, _initializeComparisonSlider.initializeSlider)();
  });
  showMoreBtn.addEventListener('click', showMoreItems);
  showLessBtn.addEventListener('click', showLessItems);
}
function initializeMasonry() {
  var masonry = new _masonryLayout["default"](grid, {
    itemSelector: '.comparison-slider',
    gutter: gutterSize
  });
}
function createFullComparisonSliderList() {
  var fragment = document.createDocumentFragment();
  _beforeAfterData.comparisonImagesData.forEach(function (_ref) {
    var beforeName = _ref.beforeName,
      afterName = _ref.afterName,
      desc = _ref.desc,
      categories = _ref.categories;
    var listItem = (0, _generateComparisonSlider.createComparisonSliderItem)({
      beforeName: beforeName,
      afterName: afterName,
      desc: desc,
      categories: categories
    });
    fragment.appendChild(listItem);
  });
  grid.appendChild(fragment);
}
function createInitialComparisonSliderList() {
  var fragment = document.createDocumentFragment();
  _beforeAfterData.comparisonImagesData.slice(0, itemsPerPage).forEach(function (item) {
    var beforeName = item.beforeName,
      afterName = item.afterName,
      desc = item.desc,
      categories = item.categories;
    var listItem = (0, _generateComparisonSlider.createComparisonSliderItem)({
      beforeName: beforeName,
      afterName: afterName,
      desc: desc,
      categories: categories
    });
    fragment.appendChild(listItem);
    displayedItems++;
  });
  grid.appendChild(fragment);
}
function createComparisonSlider(_ref2) {
  var beforeName = _ref2.beforeName,
    afterName = _ref2.afterName,
    desc = _ref2.desc,
    categories = _ref2.categories;
  var listItem = (0, _generateComparisonSlider.createComparisonSliderItem)({
    beforeName: beforeName,
    afterName: afterName,
    desc: desc,
    categories: categories
  });
  grid.appendChild(listItem);
  displayedItems++;
}
function createCategoryItemsList() {
  var uniqueCategories = getUniqueCategories();
  createCategoryItem("Всі", 'Показати всі категорії');
  uniqueCategories.forEach(function (category) {
    var ariaLabel = "\u0424\u0456\u043B\u044C\u0442\u0440\u0443\u0432\u0430\u0442\u0438 \u0437\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0454\u044E ".concat(category);
    createCategoryItem(category, ariaLabel);
  });
}
function getUniqueCategories() {
  var uniqueCategories = new Set();
  _beforeAfterData.comparisonImagesData.forEach(function (_ref3) {
    var categories = _ref3.categories;
    categories.forEach(function (category) {
      return uniqueCategories.add(category);
    });
  });
  return Array.from(uniqueCategories);
}
function createCategoryItem(text, ariaLabel) {
  var li = document.createElement("li");
  li.className = 'category__item';
  var button = document.createElement("button");
  button.textContent = text;
  button.className = 'category__button';
  if (text === 'Всі') {
    button.classList.add('category__button--active');
  }
  button.setAttribute("aria-label", ariaLabel);
  li.appendChild(button);
  buttonContainer.appendChild(li);
}
function handleCategory(e) {
  var target = e.target;
  if (!target.classList.contains('category__button')) {
    return;
  }
  updateChosenCategory(target.textContent);
  var allCategoryButtons = buttonContainer.querySelectorAll('.category__button');
  toggleCategory(target, allCategoryButtons);
  resetComparisonSliderList();
  updateComparisonSliderList();
  filterImages();
  toggleShowBtnsVisibility(chosenCategory);
  generateUpdatedMasonry();
  (0, _initializeComparisonSlider.initializeSlider)();
}
function resetComparisonSliderList() {
  grid.innerHTML = '';
}
function updateComparisonSliderList() {
  if (chosenCategory !== 'Всі') {
    createFullComparisonSliderList();
  } else {
    displayedItems = 0;
    createInitialComparisonSliderList();
  }
}
function toggleCategory(btn, allBtnList) {
  allBtnList.forEach(function (btn) {
    return btn.classList.remove('category__button--active');
  });
  btn.classList.add('category__button--active');
}
function updateChosenCategory(text) {
  chosenCategory = text;
}
function filterImages() {
  var pictureList = grid.querySelectorAll('.comparison-slider');
  pictureList.forEach(function (item) {
    var categories = item.dataset.categories.split(', ');
    var hasChosenCategory = chosenCategory === 'Всі' || categories.includes(chosenCategory);
    item.classList.toggle('filtered', !hasChosenCategory);
  });
}
function generateUpdatedMasonry() {
  var masonry = new _masonryLayout["default"](grid, {
    itemSelector: '.comparison-slider:not(.filtered)',
    gutter: gutterSize
  });
  masonry.layout();
}
function toggleShowBtnsVisibility(chosenCategory) {
  showMoreBtn.classList.toggle('isVisible', chosenCategory === 'Всі');
  showLessBtn.classList.remove('isVisible', chosenCategory === 'Всі');
}
function showMoreItems() {
  var itemsToLoad = _beforeAfterData.comparisonImagesData.slice(displayedItems, displayedItems + itemsPerPage);
  itemsToLoad.forEach(createComparisonSlider);
  (0, _initializeComparisonSlider.initializeSlider)();
  generateUpdatedMasonry();
  updateButtonsVisibility();
}
function showLessItems() {
  displayedItems = displayedItems - itemsPerPage;
  var items = grid.querySelectorAll('.comparison-slider');
  var newItems = Array.from(items).slice(0, items.length - itemsPerPage);
  resetComparisonSliderList();
  newItems.forEach(function (item) {
    grid.appendChild(item);
  });
  (0, _initializeComparisonSlider.initializeSlider)();
  generateUpdatedMasonry();
  updateButtonsVisibility();
}
function updateButtonsVisibility() {
  showLessBtn.classList.toggle('isVisible', displayedItems > itemsPerPage);
  showMoreBtn.classList.toggle('isVisible', displayedItems < _beforeAfterData.comparisonImagesData.length);
}
//# sourceMappingURL=before-after-slider.js.map
