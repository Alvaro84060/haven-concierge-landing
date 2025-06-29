"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendElement = appendElement;
exports.getClosestIcon = getClosestIcon;
exports.handleInputBlur = handleInputBlur;
exports.setShedulerVisibilityOptions = setShedulerVisibilityOptions;
exports.toggleClosestVisibility = toggleClosestVisibility;
exports.toggleElementVisibility = toggleElementVisibility;
exports.toggleIconActiveStyle = toggleIconActiveStyle;
var _localStorage = require("./local-storage");
var _themeToggler = require("./theme-toggler");
var _getElements = require("./get-elements");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var navLinkSelector = '.nav__link';
var asideNavLinkSelector = '.nav--aside-menu .nav__link';
var officeNavLinkSelector = '.nav__list .nav__item:nth-child(2) .nav__link';
var officeAsideNavLinkSelector = '.nav--aside-menu  .nav__list .nav__item:nth-child(2) .nav__link';
var addServicesListItemSelector = '.add-services-list__item:nth-child(n+3)';
var indexURL = 'index.html#order-cleaning-block';
var officeURL = 'office.html#office-calc-block';
var afterRepairURL = 'after-repair.html#office-calc-block';
var flexBasisOneThird = 'calc(100% / 3)';
var flexBasisHalf = 'calc(100% / 2)';
var pages = {
  home: ['/comfort-group-cleaning/', '/comfort-group-cleaning/index.html'],
  office: ['/comfort-group-cleaning/office.html'],
  afterRepair: ['/comfort-group-cleaning/after-repair.html'],
  calcOrder: ['/comfort-group-cleaning/calc-order.html'],
  contacts: ['/comfort-group-cleaning/contacts.html'],
  successOr404: ['/comfort-group-cleaning/success-order.html', '/comfort-group-cleaning/404.html']
};
var pageActions = {
  home: function home() {
    setCurrentNavLinks([navLinkSelector, asideNavLinkSelector]);
    updateDynamicLinks(indexURL);
  },
  office: function office() {
    setCurrentNavLinks([officeNavLinkSelector, officeAsideNavLinkSelector]);
    updateDynamicLinks(officeURL);
    setBuildingsFlexBasis(flexBasisOneThird);
    setOfficeBuildingsToggleMenu();
  },
  afterRepair: function afterRepair() {
    hideBuildingsToggleMenu();
    hideSelectedItems(addServicesListItemSelector);
    updateDynamicLinks(afterRepairURL);
  },
  calcOrder: function calcOrder() {
    setFooterStyle();
    setBuildingsFlexBasis(flexBasisHalf);
    addWhiteBackground();
    setCalculatorBuildingsToggleMenu();
  },
  contacts: function contacts() {
    modifyContactPage();
    modifyMainSection();
  },
  successOr404: function successOr404() {
    modifyMainSection();
    window.addEventListener('beforeunload', function () {
      (0, _localStorage.resetLocalStorage)('userOrderDataObj');
    });
  }
};
document.addEventListener('DOMContentLoaded', function () {
  var currentPage = window.location.pathname;
  var bodyEl = document.querySelector('body');
  var _getThemeTogglerEleme = (0, _getElements.getThemeTogglerElements)(),
    themeToggler = _getThemeTogglerEleme.themeToggler;
  themeToggler.addEventListener('click', function () {
    (0, _themeToggler.setTheme)(bodyEl.classList.contains('active-dark-theme') ? _themeToggler.THEMES.LIGHT : _themeToggler.THEMES.DARK);
  });
  (0, _themeToggler.applyTheme)();
  var action = Object.keys(pageActions).find(function (page) {
    return pages[page].includes(currentPage);
  });
  if (action) {
    pageActions[action]();
  }
});
function updateDynamicLinks(href) {
  var dynamicLinkList = document.querySelectorAll('.dynamic-link');
  _toConsumableArray(dynamicLinkList).forEach(function (link) {
    return link.href = href;
  });
}
function hideSelectedItems(selector) {
  var items = document.querySelectorAll(selector);
  items.forEach(function (item) {
    return item.classList.add('isHidden');
  });
}
function addWhiteBackground() {
  var items = document.querySelectorAll('.block');
  items.forEach(function (item) {
    return item.classList.add('block--white');
  });
}
function setFooterStyle() {
  var footer = document.querySelector('.footer');
  footer.classList.add('footer--calc-order');
}
function setCurrentNavLinks(selectors) {
  selectors.forEach(function (selector) {
    var currentNavLink = document.querySelector(selector);
    if (currentNavLink) {
      currentNavLink.classList.add('nav__link--current');
    }
  });
}
function modifyContactPage() {
  var connectionSection = document.querySelector('.connection');
  connectionSection.classList.remove('no-padding-top');
  var supportBlock = document.querySelector('.connection--second-block');
  supportBlock.classList.add('block-with-image');
}
function modifyMainSection() {
  var main = document.querySelector('main');
  main.classList.add('section--dark-background');
}
function toggleIconActiveStyle(icon) {
  icon.classList.toggle('isActive');
}
function hideBuildingsToggleMenu() {
  var title = document.querySelector('.data-order .data-order__title');
  var toggleMenu = document.querySelector('.buildings');
  toggleMenu.style.display = 'none';
  title.style.display = 'none';
}
function setOfficeBuildingsToggleMenu() {
  var buildingsElements = document.querySelectorAll('.element--office-page');
  buildingsElements.forEach(function (item) {
    return item.classList.remove('isHidden');
  });
  var calculatorBuilding = document.querySelector('.element--calculator-page');
  calculatorBuilding.classList.add('isHidden');
}
function setCalculatorBuildingsToggleMenu() {
  var buildingsElements = document.querySelectorAll('.element--office-page');
  buildingsElements.forEach(function (item) {
    return item.classList.add('isHidden');
  });
  var calculatorBuilding = document.querySelector('.element--calculator-page');
  calculatorBuilding.classList.remove('isHidden');
}
function setBuildingsFlexBasis(value) {
  var buildingsElements = document.querySelectorAll('.buildings__element');
  buildingsElements.forEach(function (item) {
    return item.style.flexBasis = value;
  });
}
function appendElement(parent, child) {
  parent.appendChild(child);
}
function getClosestIcon(element, iconClassName) {
  return element.parentElement.previousElementSibling.querySelector(".".concat(iconClassName));
}
function toggleElementVisibility(el) {
  el.classList.toggle('isHidden');
}
function handleInputBlur(inputElement, extractFunction) {
  inputElement.addEventListener('blur', function (e) {
    var trimmedValue = extractFunction(e.target.value);
    inputElement.value = trimmedValue;
  });
}
function setShedulerVisibilityOptions(pickEl, sheduleEl, icon) {
  toggleElementVisibility(pickEl);
  toggleElementVisibility(sheduleEl);
  toggleIconActiveStyle(icon);
}
function toggleClosestVisibility(wrap, blockClassName, iconClassName) {
  var sheduleInfoBlock = wrap.querySelector('.work-shedule');
  var blockElement = wrap.querySelector(".".concat(blockClassName));
  if (!sheduleInfoBlock.classList.contains('isHidden')) {
    toggleElementVisibility(sheduleInfoBlock);
    toggleElementVisibility(blockElement);
    var icon = getClosestIcon(blockElement, iconClassName);
    toggleIconActiveStyle(icon);
  }
}
//# sourceMappingURL=common.js.map
