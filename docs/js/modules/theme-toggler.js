"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.THEMES = void 0;
exports.applyTheme = applyTheme;
exports.setTheme = setTheme;
exports.toggleTheme = toggleTheme;
var _getElements = require("./get-elements");
var _localStorage = require("./local-storage");
var THEMES = exports.THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};
var currentTheme = (0, _localStorage.getDataFromStorage)('theme') || THEMES.LIGHT;
function setTheme(theme) {
  currentTheme = theme;
  (0, _localStorage.storeDataInLocalStorage)('theme', theme);
  applyTheme();
}
function toggleTheme() {
  setTheme(currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
}
function applyTheme() {
  var _getThemeTogglerEleme = (0, _getElements.getThemeTogglerElements)(),
    themeToggler = _getThemeTogglerEleme.themeToggler,
    themeCircle = _getThemeTogglerEleme.themeCircle,
    sunRays = _getThemeTogglerEleme.sunRays,
    sunIcon = _getThemeTogglerEleme.sunIcon,
    moonIcon = _getThemeTogglerEleme.moonIcon;
  var bodyEl = document.querySelector('body');
  if (currentTheme === THEMES.DARK) {
    bodyEl.classList.add('active-dark-theme');
    themeToggler.classList.add('theme-toggler-wrap--dark');
    themeToggler.classList.remove('theme-toggler-wrap--light');
    themeCircle.classList.add('theme__circle--dark');
    themeCircle.classList.remove('theme__circle--light');
    sunIcon.classList.add('circle__sun--hidden');
    moonIcon.classList.remove('circle__moon--hidden');
    sunRays.forEach(function (el) {
      return el.classList.add('circle__ray--hidden');
    });
  } else {
    bodyEl.classList.remove('active-dark-theme');
    themeToggler.classList.remove('theme-toggler-wrap--dark');
    themeToggler.classList.add('theme-toggler-wrap--light');
    themeCircle.classList.remove('theme__circle--dark');
    themeCircle.classList.add('theme__circle--light');
    sunIcon.classList.remove('circle__sun--hidden');
    moonIcon.classList.add('circle__moon--hidden');
    sunRays.forEach(function (el) {
      return el.classList.remove('circle__ray--hidden');
    });
  }
}
//# sourceMappingURL=theme-toggler.js.map
