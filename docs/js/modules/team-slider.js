"use strict";

var _teamData = require("./team-data");
var _utils = require("./utils");
var _createTeamMarkup = require("./create-team-markup");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var prevButton = document.querySelector('.team__btn-prev');
var nextButton = document.querySelector('.team__btn-next');
var categoryList = document.querySelector('.team__category-list');
var membersList = document.querySelector('.team__members-name-list');
var slider = document.querySelector('.team__circular-slider');
var titleEl = document.querySelector('.member-info__title');
var expEl = document.querySelector('.member-info__exp');
var quoteEl = document.querySelector('.member-info__quote');
var state = {
  chosenCategory: 'CEO',
  slideClasses: null,
  currentIndex: 0,
  teamCategories: [],
  membersByCategory: []
};
initializeTeamSlider();
function initializeTeamSlider() {
  state.teamCategories = (0, _utils.getUniqueCategories)(_teamData.teamMembersData);
  state.membersByCategory = (0, _utils.groupTeamMembersByCategory)(_teamData.teamMembersData);
  (0, _createTeamMarkup.createCategoryList)(state.teamCategories, _teamData.teamCategoryNames);
  createCircularSlider(state.chosenCategory);
  categoryList.addEventListener('click', handleCategoryClick);
}
function createCircularSlider(category) {
  resetSliderAndMembersList();
  addSliderButtonsEventListeners(category);
  updateSliderParameters(category);
  (0, _createTeamMarkup.createCircularSliderMarkup)(category, _teamData.teamMembersData);
  var slides = getSliderElements();
  (0, _createTeamMarkup.createMembersNameList)(state.membersByCategory, category);
  updateMemberTablo(slides, state.currentIndex + 1);
  slider.addEventListener('click', handleSlideClick);
  membersList.addEventListener('click', handleNameClick);
  function prevButtonClickHandler() {
    navigateSlide(-1);
  }
  function nextButtonClickHandler() {
    navigateSlide(1);
  }
  function addSliderButtonsEventListeners(category) {
    if (category === state.chosenCategory) {
      prevButton.addEventListener('click', prevButtonClickHandler);
      nextButton.addEventListener('click', nextButtonClickHandler);
    }
  }
  function updateSliderParameters(category) {
    state.chosenCategory = category;
    state.currentIndex = 0;
    state.slideClasses = (0, _utils.createSlideClassesList)(category, _teamData.teamMembersData);
  }
  function handleSlideClick(e) {
    var clickedItem = e.target;
    if (clickedItem.tagName !== 'IMG') return;
    var slide = clickedItem.closest('li');
    if (!slide || slide.classList.contains('team-active-slide')) return;
    var slideClass = slide.classList[1];
    var slideIndex = state.slideClasses.indexOf(slideClass);
    if (slideIndex !== -1) {
      navigateSlide(slideIndex === 2 ? -1 : 1);
    }
  }
  function handleNameClick(e) {
    var nameEl = e.target;
    if (nameEl.tagName !== 'LI') return;
    if (!nameEl || nameEl.classList.contains('name--active')) return;
    var memberID = nameEl.getAttribute('data-id');
    var slides = getSliderElements();
    var chosenMember = findChosenMember(slides, memberID);
    var chosenMemberSlideIndex = findChosenMemberSlideIndex(chosenMember);
    var swipeCount = (0, _utils.calculateSwipeCount)(chosenMemberSlideIndex, state.slideClasses.length);
    navigateSlides(swipeCount);
  }
  function navigateSlides(moves) {
    var direction = moves < 0 ? -1 : 1;
    for (var i = 0; i < Math.abs(moves); i++) {
      navigateSlide(direction);
    }
  }
  function findChosenMember(slides, memberID) {
    return _toConsumableArray(slides).find(function (slide) {
      return slide.getAttribute('data-member') === memberID;
    });
  }
  function navigateSlide(direction) {
    state.currentIndex = (state.currentIndex + direction + state.slideClasses.length) % state.slideClasses.length;
    updateSlider(direction);
  }
  function updateSlider(direction) {
    var slides = getSliderElements();
    removeActiveClassFromSlides(slides);
    var activeClassIndex = direction === 1 ? 0 : 2;
    moveSlides(slides, direction);
    addActiveClassToSlide(slides, activeClassIndex);
    updateMemberTablo(slides, activeClassIndex);
    updateMembersMenu(direction, slides.length);
  }
  function moveSlides(slides, direction) {
    var slideCount = slides.length;
    if (slideCount <= 1) {
      return;
    }
    slides.forEach(function (slide, index) {
      var newIndex = (index + direction + slideCount) % slideCount;
      slide.classList.replace(state.slideClasses[index], state.slideClasses[newIndex]);
    });
  }
}
function handleCategoryClick(e) {
  var categoryEl = e.target;
  if (categoryEl.tagName !== 'LI' || categoryEl.classList.contains('category--active')) return;
  var category = categoryEl.getAttribute('data-category');
  createCircularSlider(category);
  updateCategoriesListMenu(category);
}
function updateCategoriesListMenu(category) {
  var categoriesList = document.querySelectorAll('.team__category-item');
  var activeCategory = _toConsumableArray(categoriesList).find(function (item) {
    return item.classList.contains('category--active');
  });
  if (activeCategory) {
    activeCategory.classList.remove('category--active');
  }
  var newActiveCategory = _toConsumableArray(categoriesList).find(function (item) {
    return item.getAttribute('data-category') === category;
  });
  newActiveCategory.classList.add('category--active');
}
function updateMembersMenu(direction, membersQuantity) {
  var teamNamesList = document.querySelectorAll('.team__name');
  var activeName = _toConsumableArray(teamNamesList).find(function (name) {
    return name.classList.contains('name--active');
  });
  if (activeName) {
    activeName.classList.remove('name--active');
    var activeNameIndex = _toConsumableArray(teamNamesList).indexOf(activeName);
    var newActiveNameIndex = (activeNameIndex + direction + membersQuantity) % membersQuantity;
    if (newActiveNameIndex < 0) {
      newActiveNameIndex += membersQuantity;
    }
    teamNamesList[newActiveNameIndex].classList.add('name--active');
  }
}
function updateMemberTablo(slides, index) {
  var _getActiveSlideData = getActiveSlideData(slides, index),
    name = _getActiveSlideData.name,
    experience = _getActiveSlideData.experience,
    quote = _getActiveSlideData.quote;
  titleEl.innerHTML = name;
  expEl.innerHTML = "\u0414\u043E\u0441\u0432\u0456\u0434 \u0440\u043E\u0431\u043E\u0442\u0438: ".concat(experience);
  quoteEl.innerHTML = "<i class=\"fa-solid fa-quote-left\"></i> ".concat(quote, " <i class=\"fa-solid fa-quote-right\"></i>");
}
function getSliderElements() {
  return state.slideClasses.map(function (className) {
    return document.querySelector(".team__circular-section.".concat(className));
  });
}
function resetSliderAndMembersList() {
  slider.innerHTML = '';
  membersList.innerHTML = '';
}
function findChosenMemberSlideIndex(chosenMember) {
  var classList = chosenMember.classList;
  var slideIndexClass = _toConsumableArray(classList).find(function (cls) {
    return cls.startsWith('slide-');
  });
  return slideIndexClass ? parseInt(slideIndexClass.split('-')[1], 10) : 0;
}
function removeActiveClassFromSlides(slides) {
  slides.forEach(function (slide) {
    return slide.classList.remove('team-active-slide');
  });
}
function addActiveClassToSlide(slides, index) {
  slides[index].classList.add('team-active-slide');
}
function getActiveSlideData(slides, index) {
  var memberID = slides[index].getAttribute('data-member');
  var memberData = _teamData.teamMembersData.find(function (member) {
    return member.memberID === memberID;
  });
  return memberData;
}
//# sourceMappingURL=team-slider.js.map
