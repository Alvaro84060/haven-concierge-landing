"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _jquery["default"])(function () {
  var toggleAnswerBtnList = (0, _jquery["default"])('.toggle-question-btn');
  var accordionsList = (0, _jquery["default"])('.accordion');
  toggleAnswerBtnList.on('click', function () {
    var button = (0, _jquery["default"])(this);
    if ((0, _jquery["default"])(event.target).is(button)) {
      toggleBtnIcon(button);
    }
    toggleAnswerBtnList.each(function () {
      closeBtnIcon((0, _jquery["default"])(this));
    });
  });
  accordionsList.each(function () {
    var intro = (0, _jquery["default"])(this).find('.accordion__intro');
    intro.on('click', function () {
      handleAccordionClick((0, _jquery["default"])(this).closest('.accordion'));
    });
  });
  function closeBtnIcon(btn) {
    var plusIcon = btn.find('.icon--plus');
    var minusIcon = btn.find('.icon--minus');
    plusIcon.removeClass('isHidden');
    minusIcon.addClass('isHidden');
  }
  function toggleBtnIcon(btn) {
    var plusIcon = btn.find('.icon--plus');
    var minusIcon = btn.find('.icon--minus');
    plusIcon.toggleClass('isHidden');
    minusIcon.toggleClass('isHidden');
  }
  function openAccordion(accordion) {
    var content = accordion.find('.accordion__content');
    accordion.addClass('accordion__active');
    content.css('max-height', content[0].scrollHeight + 'px');
  }
  function closeAccordion(accordion) {
    var content = accordion.find('.accordion__content');
    accordion.removeClass('accordion__active');
    content.css('max-height', '');
  }
  function toggleAccordion(accordion) {
    var content = accordion.find('.accordion__content');
    if (content.css('max-height') !== '0px') {
      closeAccordion(accordion);
    } else {
      accordionsList.each(function () {
        closeAccordion((0, _jquery["default"])(this));
      });
      openAccordion(accordion);
    }
  }
  function handleAccordionClick(accordion) {
    var btn = accordion.find('.toggle-question-btn');
    toggleAnswerBtnList.each(function () {
      closeBtnIcon((0, _jquery["default"])(this));
    });
    toggleAccordion(accordion);
    toggleBtnIcon(btn);
  }
});
//# sourceMappingURL=questions.js.map
