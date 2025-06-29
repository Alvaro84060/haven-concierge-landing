"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeSlider = initializeSlider;
var _vanillaTilt = _interopRequireDefault(require("vanilla-tilt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function initializeSlider() {
  var sliders = document.querySelectorAll(".comparison-slider");
  sliders.forEach(initSlider);
  function initSlider(slider) {
    var sliderImgWrapper = slider.querySelector(".comparison-slider__wrapper");
    var sliderHandle = slider.querySelector(".comparison-slider__handle");
    var isSliderLocked = false;
    function sliderMouseMove(event) {
      if (isSliderLocked) return;
      var sliderLeftX = slider.getBoundingClientRect().left;
      var sliderWidth = slider.clientWidth;
      var sliderHandleWidth = sliderHandle.clientWidth;
      var mouseX = calculateNormalizedMouseX(event, sliderLeftX, sliderWidth);
      setSliderImgWrapperWidth(mouseX);
      setSliderHandleLeftPosition(mouseX, sliderHandleWidth);
    }
    function calculateNormalizedMouseX(event, sliderLeftX, sliderWidth) {
      var mouseX = (event.clientX || event.touches[0].clientX) - sliderLeftX;
      mouseX = Math.max(0, Math.min(mouseX, sliderWidth));
      return mouseX / sliderWidth;
    }
    function setSliderImgWrapperWidth(normalizedMouseX) {
      var sliderImgWrapperWidth = ((1 - normalizedMouseX) * 100).toFixed(4);
      sliderImgWrapper.style.width = "".concat(sliderImgWrapperWidth, "%");
    }
    function setSliderHandleLeftPosition(normalizedMouseX, sliderHandleWidth) {
      var handleLeft = "calc(".concat((normalizedMouseX * 100).toFixed(4), "% - ").concat(sliderHandleWidth / 2, "px)");
      sliderHandle.style.left = handleLeft;
    }
    function sliderMouseDown(event) {
      if (isSliderLocked) isSliderLocked = false;
      sliderMouseMove(event);
    }
    function sliderMouseUp() {
      isSliderLocked = true;
    }
    function sliderMouseLeave() {
      isSliderLocked = false;
    }
    slider.addEventListener("mousemove", sliderMouseMove);
    slider.addEventListener("touchmove", sliderMouseMove);
    slider.addEventListener("mousedown", sliderMouseDown);
    slider.addEventListener("touchstart", sliderMouseDown);
    slider.addEventListener("mouseup", sliderMouseUp);
    slider.addEventListener("touchend", sliderMouseUp);
    slider.addEventListener("mouseleave", sliderMouseLeave);
    _vanillaTilt["default"].init(slider, {
      max: 5,
      speed: 800,
      scale: 1.02
    });
  }
}
//# sourceMappingURL=initialize-comparison-slider.js.map
