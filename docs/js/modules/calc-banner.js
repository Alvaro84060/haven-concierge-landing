"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _gsap = _interopRequireDefault(require("gsap"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var menu = ['Будинки та квартири', 'Комерційні приміщення', 'Після ремонту'];
var swiper = initializeSwiper();
var slideList = document.querySelectorAll('.swiper-slide');
_toConsumableArray(slideList).forEach(function (item) {
  return item.setAttribute('role', 'Слайд');
});
function initializeSwiper() {
  var swiper = new Swiper('.swiper', {
    speed: 1000,
    spaceBetween: 0,
    initialSlide: 2,
    touchRatio: 0,
    effect: 'fade',
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true,
      el: '.swiper-pagination',
      renderBullet: renderBullet
    },
    on: {
      slideChangeTransitionStart: handleSlideChangeStart,
      slideChange: handleSlideChange
    }
  });
  (0, _jquery["default"])('.swiper--calc-banner .swiper-pagination .swiper-pagination-bullet:first-child').trigger('click');
  return swiper;
}
function renderBullet(index, className) {
  return '<span class="' + className + '">' + menu[index] + '</span>';
}
function handleSlideChangeStart() {
  (0, _jquery["default"])('.swiper-slide.swiper-slide-active .calc-banner__title').css('left', '0px');
  (0, _jquery["default"])('.swiper-slide.swiper-slide-active .calc-banner__images-wrapper').css('left', '50px');
}
function handleSlideChange() {
  (0, _jquery["default"])('.swiper-slide.swiper-slide-active .calc-banner__title').css('left', '100%');
  (0, _jquery["default"])('.swiper-slide.swiper-slide-active .calc-banner__images-wrapper').css('left', '100%');
}
function handleMouseMove(event) {
  (0, _jquery["default"])('.calc-banner__image').each(function () {
    var layers = (0, _jquery["default"])(this).data('value');
    var x = ((0, _jquery["default"])(window).innerWidth() - event.pageX * layers) / 100;
    var y = ((0, _jquery["default"])(window).innerHeight() - event.pageY * layers) / 100;
    _gsap["default"].to(this, {
      duration: 0.3,
      marginLeft: x + 'px',
      marginTop: y + 'px',
      ease: 'power2.out'
    });
  });
}
(0, _jquery["default"])('.swiper--calc-banner .swiper-slide').on('mousemove', handleMouseMove);
//# sourceMappingURL=calc-banner.js.map
