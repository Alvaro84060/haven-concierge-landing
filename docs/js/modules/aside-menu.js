"use strict";

var _bodyScrollLock = require("body-scroll-lock");
(function () {
  var asideMenu = document.querySelector('.aside-menu');
  var openMenuBtn = document.querySelector('.open-menu-btn');
  var closeMenuBtn = document.querySelector('.close-menu-btn');
  var toggleMenu = function toggleMenu() {
    var isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    asideMenu.classList.toggle('is-open');
    var scrollLockMethod = !isMenuOpen ? _bodyScrollLock.disableBodyScroll : _bodyScrollLock.enableBodyScroll;
    scrollLockMethod(document.body);
  };
  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);
  window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
    if (!e.matches) return;
    asideMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    (0, _bodyScrollLock.enableBodyScroll)(document.body);
  });
})();
//# sourceMappingURL=aside-menu.js.map
