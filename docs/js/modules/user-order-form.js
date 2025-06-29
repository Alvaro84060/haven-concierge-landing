"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hidePaymentTypeError = hidePaymentTypeError;
exports.hidePolicyError = hidePolicyError;
exports.resetErrors = resetErrors;
exports.setPropertyInOrderObj = setPropertyInOrderObj;
exports.subscForm = void 0;
exports.togglePaymentTypeErrorVisibility = togglePaymentTypeErrorVisibility;
exports.togglePolicyErrorVisibility = togglePolicyErrorVisibility;
exports.userOrderDataObj = void 0;
var _subscrModal = require("./subscr-modal");
var _modal = require("./modal");
var _localStorage = require("./local-storage");
var _choseServices = require("./chose-services");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var subscForm = exports.subscForm = document.querySelector('.subscr__form');
var paymentBtnList = document.querySelectorAll('.payment__btn');
var paymentErrorMessage = document.querySelector('.form__payment-error-text');
var formInputList = document.querySelectorAll('.form__input');
var makeOrderBtn = document.querySelector('.calc-btn');
var policyCheckBox = document.querySelector('[name="studio-policy-check"]');
var observer;
if (policyCheckBox) {
  observer = new MutationObserver(function (mutationsList, observer) {
    mutationsList.forEach(function (mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-checked') {
        var isChecked = policyCheckBox.getAttribute('data-checked') === 'true';
        hidePolicyError();
      }
    });
  });
  observer.observe(policyCheckBox, {
    attributes: true,
    attributeFilter: ['data-checked']
  });
  policyCheckBox.addEventListener('change', function () {
    policyCheckBox.setAttribute('data-checked', policyCheckBox.checked);
  });
}
subscForm === null || subscForm === void 0 || subscForm.addEventListener('submit', onSubmitForm);
makeOrderBtn === null || makeOrderBtn === void 0 || makeOrderBtn.addEventListener('click', function (e) {
  e.preventDefault();
  onSubmitForm(e);
});
paymentBtnList.forEach(function (el) {
  el.addEventListener('click', function (e) {
    onPaymentTypeBtnClick(e);
    hidePaymentTypeError();
  });
});
formInputList.forEach(function (el) {
  el.addEventListener('focus', function () {
    el.classList.remove('error');
  });
});
var validationFields = ['userName', 'userSurname', 'userTel', 'userEmail', 'userLocation', 'userDate', 'userTime'];
var userOrderDataObj = exports.userOrderDataObj = {
  userPaymentType: '',
  userBuildingType: '',
  userTakeKeyAddress: '',
  userGiveKeyAddress: '',
  userSquare: {
    quantity: '',
    cost: ''
  },
  userServices: {}
};
function setPropertyInOrderObj(el) {
  var _el$getAttribute;
  var propertyName = el.getAttribute('data-type');
  var propertyValue = (_el$getAttribute = el.getAttribute('data-id')) !== null && _el$getAttribute !== void 0 ? _el$getAttribute : '';
  userOrderDataObj[propertyName] = propertyValue;
}
function setSquarePropertyInOrderObj(orderObj, quantity, price) {
  orderObj.userSquare = {
    quantity: "".concat(quantity),
    cost: (0, _choseServices.calculateServiceCost)(quantity, price)
  };
}
function setServicesPropertyInOrderObj(orderObj) {
  var filteredObj = (0, _choseServices.filterObjectByQuantity)(_choseServices.userServicesOrderInfoObj);
  orderObj.userServices = Object.keys(filteredObj).filter(function (key) {
    return key !== 'square';
  }).map(function (key) {
    var _filteredObj$key = filteredObj[key],
      name = _filteredObj$key.name,
      quantity = _filteredObj$key.quantity,
      price = _filteredObj$key.price;
    var cost = (0, _choseServices.calculateServiceCost)(quantity, price);
    return {
      name: name,
      quantity: quantity,
      cost: cost
    };
  });
}
function validateFields(elements, fieldNames) {
  return fieldNames.filter(function (fieldName) {
    return elements[fieldName].value.trim() === '';
  }).map(function (fieldName) {
    return elements[fieldName];
  });
}
function resetErrors(elements) {
  _toConsumableArray(elements).forEach(function (element) {
    element.classList.remove('error');
  });
}
function addErrorClass(elementsWithErrors) {
  elementsWithErrors.forEach(function (element) {
    element.classList.add('error');
  });
}
function checkIfPaymentTypeChosen() {
  return _toConsumableArray(paymentBtnList).some(function (btn) {
    return btn.classList.contains('active');
  });
}
function checkIfPolicyAgreed() {
  var policyCheckBox = document.querySelector('[name="studio-policy-check"]');
  var isAgreed = policyCheckBox.checked;
  return isAgreed;
}
function togglePaymentTypeErrorVisibility() {
  var paymentErrorMessage = document.querySelector('.form__payment-error-text');
  paymentErrorMessage.classList.toggle('isHidden');
}
function hidePaymentTypeError() {
  var isPaymentErrorMessageVisible = !paymentErrorMessage.classList.contains('isHidden');
  if (isPaymentErrorMessageVisible) {
    togglePaymentTypeErrorVisibility();
  }
}
function togglePolicyErrorVisibility() {
  var policyErrorMessage = document.querySelector('.form__policy-error-text');
  policyErrorMessage.classList.add('isHidden');
  var isPolicyAgreed = checkIfPolicyAgreed();
  if (!isPolicyAgreed) {
    policyErrorMessage.classList.remove('isHidden');
  }
}
function hidePolicyError() {
  var policyErrorMessage = document.querySelector('.form__policy-error-text');
  policyErrorMessage.classList.add('isHidden');
}
function onSubmitForm(e) {
  e.preventDefault();
  var isComplexOrder = e.currentTarget.tagName === 'BUTTON';
  var elements = isComplexOrder ? subscForm.elements : e.currentTarget.elements;
  var elementsWithErrors = validateFields(elements, validationFields);
  resetErrors(elements);
  addErrorClass(elementsWithErrors);
  var isPaymentTypeChosen = checkIfPaymentTypeChosen();
  var isAnyError = elementsWithErrors.length > 0;
  if (!isPaymentTypeChosen) {
    togglePaymentTypeErrorVisibility();
  }
  togglePolicyErrorVisibility();
  var isPolicyAgreed = checkIfPolicyAgreed();
  if (!isPaymentTypeChosen || isAnyError || !isPolicyAgreed) {
    return;
  }
  var form = isComplexOrder ? subscForm : e.target;
  if (isComplexOrder) {
    initializeComplexOrder();
  }
  setOrderDataObj(form);
  (0, _localStorage.storeDataInLocalStorage)('userOrderDataObj', userOrderDataObj);
  resetFormFields(elements);
  resetChosenPaymentType();
  observer.disconnect();
  if (!isComplexOrder) {
    (0, _modal.toggleModal)(_subscrModal.refsSubscr);
  }
  window.location.href = window.location.href = 'https://marynashavlak.github.io/comfort-group-cleaning/success-order.html';
}
function initializeComplexOrder() {
  setKeyPropertiesInOrderObj();
  setSquarePropertyInOrderObj(userOrderDataObj, _choseServices.userServicesOrderInfoObj.square.quantity, _choseServices.userServicesOrderInfoObj.square.price);
  setServicesPropertyInOrderObj(userOrderDataObj);
}
function onPaymentTypeBtnClick(e) {
  var clickedButton = e.target.closest('button');
  setPropertyInOrderObj(clickedButton);
  if (clickedButton.classList.contains('active')) return;
  _toConsumableArray(paymentBtnList).forEach(function (button) {
    if (button === clickedButton) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}
function resetFormFields(elements) {
  _toConsumableArray(elements).forEach(function (element) {
    if (element.type === 'text' || element.type === 'email' || element.type === 'tel' || element.tagName === 'TEXTAREA') {
      element.value = '';
    } else if (element.type === 'checkbox') {
      element.checked = true;
    }
  });
}
function resetChosenPaymentType() {
  _toConsumableArray(paymentBtnList).forEach(function (button) {
    button.classList.remove('active');
  });
}
function setOrderDataObj(form) {
  var formData = new FormData(form);
  formData.forEach(function (value, key) {
    if (key.startsWith('user')) {
      userOrderDataObj[key] = value;
    }
  });
}
function setKeyPropertiesInOrderObj() {
  var takeKeyInput = document.querySelector('[data-type="userTakeKeyAddress"]');
  var giveKeyInput = document.querySelector('[data-type="userGiveKeyAddress"]');
  setPropertyInOrderObj(takeKeyInput);
  setPropertyInOrderObj(giveKeyInput);
}
//# sourceMappingURL=user-order-form.js.map
