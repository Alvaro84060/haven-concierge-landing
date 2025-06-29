"use strict";

var _roomsShemaData = require("./rooms-shema-data");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var roomTexts = ["Кухня", "Кімнати", "Санвузол"];
var schemaTypes = ['.schema--kitchen', '.schema--room', '.schema--bath'];
var container = document.querySelector(".swiper-wrapper");
schemaTypes.forEach(function (type, index) {
  window.addEventListener('resize', function () {
    return updateSchemasOnResize(getSchemaData(index), type);
  });
  initializeSchema(getSchemaData(index), type);
});
var swiperInitialized = initializeSwiper();
container.addEventListener("mouseover", showDescriptionOnHover);
container.addEventListener("mouseout", hideDescriptionOnHoverOut);
var slideList = document.querySelectorAll('.swiper-slide');
_toConsumableArray(slideList).forEach(function (item) {
  return item.setAttribute('role', 'Слайд');
});
function initializeSwiper() {
  return new Swiper(".swiper-container", {
    effect: "cube",
    cubeEffect: {
      slideShadows: false
    },
    speed: 1000,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination-rooms',
      clickable: true,
      renderBullet: function renderBullet(index, className) {
        return "<li class=\"".concat(className, "\">").concat(roomTexts[index], "</li>");
      }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    mousewheel: {
      invert: true
    }
  });
}
function getSchemaData(index) {
  return index === 0 ? _roomsShemaData.kitchenSchemaData : index === 1 ? _roomsShemaData.roomSchemaData : _roomsShemaData.bathSchemaData;
}
function showDescriptionOnHover(event) {
  var btn = getButtonFromHoveredItem(event.target);
  if (btn) {
    toggleDescriptionVisibility(btn, true);
  }
}
function hideDescriptionOnHoverOut(event) {
  var btn = getButtonFromHoveredItem(event.target);
  if (btn) {
    toggleDescriptionVisibility(btn, false);
  }
}
function getButtonFromHoveredItem(hoveredItem) {
  if (hoveredItem.classList.contains('plus-btn')) {
    return hoveredItem;
  } else if (hoveredItem.tagName === 'use' || hoveredItem.tagName === 'svg') {
    return hoveredItem.closest('.toolkit__btn');
  } else {
    return null;
  }
}
function toggleDescriptionVisibility(btn, show) {
  var desc = btn.closest('.toolkit__wrapper').querySelector('.toolkit__desc');
  desc.classList.toggle('is-shown', show);
}
function createSchemaElement(data, index) {
  var schema = document.createElement('div');
  schema.classList.add("toolkit__wrapper");
  schema.classList.add("wrapper-".concat(index + 1));
  schema.setAttribute('data-schema-id', "schema-".concat(index + 1));
  var span = document.createElement('span');
  span.classList.add('toolkit__desc');
  if (data.reverse) {
    span.classList.add('toolkit__desc--reverse');
  }
  span.textContent = data.description;
  var btnClass = data.reverse ? "plus-btn plus-btn--toolkit toolkit__btn toolkit__btn--reverse" : "plus-btn plus-btn--toolkit toolkit__btn";
  var buttonHTML = "\n    <button type=\"button\" class=\"".concat(btnClass, "\" aria-label=\"\u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F \u043F\u0440\u043E \u0432\u0438\u0434 \u0440\u043E\u0431\u0456\u0442, \u0449\u043E \u043D\u0430\u0434\u0430\u0454\u0442\u044C\u0441\u044F\">\n      <svg class=\"toolkit__icon\" width=\"18\" height=\"18\">\n        <use href=\"images/sprite.svg#icon-plus\"></use>\n      </svg>\n    </button>\n  ");
  schema.appendChild(span);
  schema.insertAdjacentHTML('beforeend', buttonHTML);
  var windowWidth = window.innerWidth;
  var styleToApply = windowWidth >= 1440 ? data.styles.mediaQuery1440 : windowWidth >= 768 ? data.styles.mediaQuery768 : data.styles.base;
  Object.assign(schema.style, styleToApply);
  return schema;
}
function initializeSchema(shemaData, selector) {
  var room = document.querySelector(selector);
  shemaData.forEach(function (data, index) {
    var schema = createSchemaElement(data, index);
    room.appendChild(schema);
  });
}
function updateSchemasOnResize(data, selector) {
  var schemaElements = document.querySelectorAll("".concat(selector, " .toolkit__wrapper"));
  schemaElements.forEach(function (schema) {
    var index = schema.classList[1].replace('wrapper-', '') - 1;
    var schemaData = data[index];
    applySchemaStyles(schema, schemaData.styles);
  });
}
function applySchemaStyles(schema, styles) {
  var windowWidth = window.innerWidth;
  var styleToApply = windowWidth >= 1440 ? styles.mediaQuery1440 : windowWidth >= 768 ? styles.mediaQuery768 : styles.base;
  Object.assign(schema.style, styleToApply);
}
//# sourceMappingURL=toolkit.js.map
