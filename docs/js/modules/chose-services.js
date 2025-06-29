"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateServiceCost = calculateServiceCost;
exports.calculateTotalOrderCost = calculateTotalOrderCost;
exports.filterObjectByQuantity = filterObjectByQuantity;
exports.userServicesOrderInfoObj = void 0;
var _userOrderForm = require("./user-order-form");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } // import { userOrderData, setPropertyInOrderObj } from './user-order-form';
var buildingsBtnList = document.querySelectorAll('.buildings__element');
var increaseSquareBtn = document.querySelector('.control-quantity-btn--plus');
var decreaseSquareBtn = document.querySelector('.control-quantity-btn--minus');
var serviceCheckboxList = document.querySelectorAll('.service-element .checkbox');
var totalCostTableElement = document.querySelector('.table__data');
var takeKeysBtn = document.querySelector('#take-keys-btn');
var giveKeysBtn = document.querySelector('#give-keys-btn');
var keysAddressBlock = document.querySelector('.keys-address-block');
var addressTakeBlock = document.querySelector('.keys-address-block__take-item');
var addressGiveBlock = document.querySelector('.keys-address-block__give-item');
increaseSquareBtn === null || increaseSquareBtn === void 0 || increaseSquareBtn.addEventListener('click', handleSquareQuantityChange);
decreaseSquareBtn === null || decreaseSquareBtn === void 0 || decreaseSquareBtn.addEventListener('click', handleSquareQuantityChange);
takeKeysBtn === null || takeKeysBtn === void 0 || takeKeysBtn.addEventListener('click', handleKeyBtn);
giveKeysBtn === null || giveKeysBtn === void 0 || giveKeysBtn.addEventListener('click', handleKeyBtn);
buildingsBtnList.forEach(function (el) {
  el.addEventListener('click', function (e) {
    (0, _userOrderForm.setPropertyInOrderObj)(e.target);
    onBuldingTypeBtnClick(e);
  });
});
serviceCheckboxList.forEach(function (el) {
  el.addEventListener('change', function (e) {
    toggleServiceItem(e);
  });
});
var interfaceServiceInfoObj = {
  square: {
    name: 'Площа',
    quantity: 1,
    price: 2
  },
  windowsStandard: {
    name: 'Миття вікон (стандартні)',
    quantity: 1,
    price: 35
  },
  windowsLarge: {
    name: 'Миття вікон (до підлоги)',
    quantity: 1,
    price: 40
  },
  microWave: {
    name: 'Мікрохвильовка',
    quantity: 1,
    price: 15
  },
  refrigerator: {
    name: 'Холодильник',
    quantity: 1,
    price: 40
  },
  plate: {
    name: 'Плита',
    quantity: 1,
    price: 35
  },
  officeChair: {
    name: 'Хімчистка офісних стільців',
    quantity: 1,
    price: 20
  },
  sofaDry2x: {
    name: 'Хімчистка дивану 2х',
    quantity: 1,
    price: 109.99
  },
  sofaDry3x: {
    name: 'Хімчистка дивану 3х',
    quantity: 1,
    price: 129.99
  },
  sofaDry4x: {
    name: 'Хімчистка дивану 4х',
    quantity: 1,
    price: 149.99
  }
};
var userServicesOrderInfoObj = exports.userServicesOrderInfoObj = {
  square: {
    name: 'Площа',
    quantity: 1,
    price: 2
  },
  windowsStandard: {
    name: 'Миття вікон (стандартні)',
    quantity: 0,
    price: 35
  },
  windowsLarge: {
    name: 'Миття вікон (до підлоги)',
    quantity: 0,
    price: 40
  },
  microWave: {
    name: 'Мікрохвильовка',
    quantity: 0,
    price: 15
  },
  refrigerator: {
    name: 'Холодильник',
    quantity: 0,
    price: 40
  },
  plate: {
    name: 'Плита',
    quantity: 0,
    price: 35
  },
  officeChair: {
    name: 'Хімчистка офісних стільців',
    quantity: 0,
    price: 20
  },
  sofaDry2x: {
    name: 'Хімчистка дивану 2х',
    quantity: 0,
    price: 109.99
  },
  sofaDry3x: {
    name: 'Хімчистка дивану 3х',
    quantity: 0,
    price: 129.99
  },
  sofaDry4x: {
    name: 'Хімчистка дивану 4х',
    quantity: 0,
    price: 149.99
  }
};
function updateServiceItemInterface(serviceName) {
  var servicesElementsList = document.querySelectorAll('.service-element');
  var label = _toConsumableArray(servicesElementsList).find(function (el) {
    return el.getAttribute('data-id') === serviceName;
  });
  var itemQntEl = label === null || label === void 0 ? void 0 : label.nextElementSibling.querySelector("[data-name=\"".concat(serviceName, "\"]"));
  var squareEl = document.querySelector('.wrap--square').querySelector("[data-name=\"".concat(serviceName, "\"]"));
  if (itemQntEl) {
    itemQntEl.textContent = interfaceServiceInfoObj[serviceName].quantity;
  }
  if (squareEl) {
    squareEl.textContent = interfaceServiceInfoObj[serviceName].quantity;
    var squareInTotal = document.querySelector('.square-value-total');
    squareInTotal.textContent = interfaceServiceInfoObj[serviceName].quantity;
  }
}
function updateQuantityData(itemName, operation) {
  if (operation === 'plus') {
    interfaceServiceInfoObj[itemName].quantity += 1;
  } else if (operation === 'minus') {
    if (interfaceServiceInfoObj[itemName].quantity === 1) return;
    interfaceServiceInfoObj[itemName].quantity -= 1;
  }
}
function changeOrderItemQuantity(e) {
  var serviceName = getChosenServiceName(e);
  var operationType = getClickedBtnType(e);
  updateQuantityData(serviceName, operationType);
  updateServiceItemInterface(serviceName);
  updateMinusBtnStyle(serviceName);
}
function handleServiceQuantityChange(e) {
  var serviceName = getChosenServiceName(e);
  changeOrderItemQuantity(e);
  updateTotalCostForService(serviceName);
  setTotalOrderCost(userServicesOrderInfoObj);
}
function handleSquareQuantityChange(e) {
  changeOrderItemQuantity(e);
  updateSquareTotalCost();
  setTotalOrderCost(userServicesOrderInfoObj);
}
function updateTotalCostForService(serviceName) {
  var orderServiceTotalCost = document.querySelector("[data-service=\"".concat(serviceName, "\"]"));
  var orderServiceTotalQuantity = document.querySelector("#".concat(serviceName, " .service-quantity"));
  var price = interfaceServiceInfoObj[serviceName].price;
  if (orderServiceTotalCost && orderServiceTotalQuantity) {
    var updatedQuantity = updateServiceQuantity(serviceName);
    var cost = calculateServiceCost(updatedQuantity, price);
    orderServiceTotalCost.textContent = cost;
    orderServiceTotalQuantity.textContent = updatedQuantity;
  } else {
    updateServiceQuantity(serviceName, 0);
  }
}
function calculateServiceCost(quantity, price) {
  var cost = (quantity * price).toFixed(2);
  return "".concat(cost, "z\u0142");
}
function filterObjectByQuantity(obj) {
  return Object.keys(obj).filter(function (key) {
    return obj[key].quantity > 0;
  }).reduce(function (filteredObj, key) {
    filteredObj[key] = _objectSpread({}, obj[key]);
    delete filteredObj[key].square;
    return filteredObj;
  }, {});
}
function updateSquareTotalCost() {
  var totalSquareCostEl = document.querySelector("[data-service=\"square\"]");
  userServicesOrderInfoObj.square.quantity = interfaceServiceInfoObj.square.quantity;
  totalSquareCostEl.textContent = "".concat(userServicesOrderInfoObj.square.quantity * userServicesOrderInfoObj.square.price, "z\u0142");
}
function toggleServiceItem(e) {
  var el = e.currentTarget;
  var label = el.closest('label');
  var controlQuantityBlock = label.nextElementSibling;
  var isServiceChosen = el.checked;
  toggleControlQuantityBlock(controlQuantityBlock, isServiceChosen);
  attachQuantityButtonListeners(controlQuantityBlock);
  var serviceItem = createServiceItem(label);
  var serviceName = label.getAttribute('data-id');
  updateTotalServicesTable(isServiceChosen, serviceItem);
  updateTotalCostForService(serviceName);
  setTotalOrderCost(userServicesOrderInfoObj);
}
function toggleControlQuantityBlock(controlQuantityBlock, isVisible) {
  controlQuantityBlock.classList.toggle('isHidden', !isVisible);
}
function attachQuantityButtonListeners(controlQuantityBlock) {
  var increaseQuantityBtn = controlQuantityBlock.querySelector('.control-quantity-btn--plus');
  var decreaseQuantityBtn = controlQuantityBlock.querySelector('.control-quantity-btn--minus');
  increaseQuantityBtn.addEventListener('click', handleServiceQuantityChange);
  decreaseQuantityBtn.addEventListener('click', handleServiceQuantityChange);
}
function updateTotalServicesTable(isServiceChosen, item) {
  var serviceName = item.id;
  var serviceInTable = findServiceInTable(serviceName);
  if (isServiceChosen && !serviceInTable) {
    addToTotalCostTable(item);
    updateServiceQuantity(serviceName);
  } else if (!isServiceChosen && serviceInTable) {
    updateServiceQuantity(serviceName, 0);
    removeFromTotalCostTable(serviceInTable);
  }
}
function updateServiceQuantity(serviceName, quantity) {
  var updatedQuantity = quantity !== undefined ? quantity : interfaceServiceInfoObj[serviceName].quantity;
  userServicesOrderInfoObj[serviceName].quantity = updatedQuantity;
  return updatedQuantity;
}
function calculateTotalOrderCost(obj) {
  var totalOrderCost = Object.keys(obj).reduce(function (acc, propertyName) {
    var property = obj[propertyName];
    return acc + property.quantity * property.price;
  }, 0).toFixed(2);
  return totalOrderCost;
}
function setTotalOrderCost(userServicesOrderInfoObj) {
  var costValue = calculateTotalOrderCost(userServicesOrderInfoObj);
  var totalOrderCostEl = document.querySelector('.total-order-value');
  totalOrderCostEl.textContent = "".concat(costValue, "z\u0142");
}
function createSpan(className, textContent) {
  var span = document.createElement('span');
  if (className) {
    span.className = className;
  }
  if (textContent) {
    span.textContent = textContent;
  }
  return span;
}
function createServiceItem(element) {
  var serviceName = element.querySelector('.service-element__text').textContent;
  var servicePrice = element.querySelector('.service-element__accent').getAttribute('data-value');
  var serviceID = element.getAttribute('data-id');
  var listItem = document.createElement('li');
  listItem.id = serviceID;
  listItem.className = 'table__item table__block';
  var nameSpan = createSpan('item__name', "".concat(serviceName));
  var textSpan = createSpan('', "x");
  var nameWrapper = createSpan('name-wrapper');
  var quantityWrapper = createSpan('quantity-wrapper');
  var quantitySpan = createSpan('item__quantity service-quantity', interfaceServiceInfoObj[serviceID].quantity);
  appendChildNodes(quantityWrapper, [textSpan, quantitySpan]);
  appendChildNodes(nameWrapper, [nameSpan, quantityWrapper]);
  var valueSpan = createSpan('service-value', "".concat(servicePrice, "z\u0142"));
  valueSpan.setAttribute('data-service', serviceID);
  appendChildNodes(listItem, [nameWrapper, valueSpan]);
  return listItem;
}
function appendChildNodes(parent, children) {
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}
function getClickedBtnType(e) {
  var type = e.currentTarget.getAttribute('data-type');
  return type;
}
function getChosenServiceName(e) {
  var _e$currentTarget, _e$currentTarget2;
  var chosenServiceName = (_e$currentTarget = e.currentTarget) === null || _e$currentTarget === void 0 || (_e$currentTarget = _e$currentTarget.closest('.wrap--service')) === null || _e$currentTarget === void 0 || (_e$currentTarget = _e$currentTarget.parentNode.querySelector('label')) === null || _e$currentTarget === void 0 ? void 0 : _e$currentTarget.getAttribute('data-id');
  var squareEl = (_e$currentTarget2 = e.currentTarget) === null || _e$currentTarget2 === void 0 || (_e$currentTarget2 = _e$currentTarget2.closest('.wrap--square')) === null || _e$currentTarget2 === void 0 ? void 0 : _e$currentTarget2.getAttribute('data-id');
  return chosenServiceName || squareEl;
}
function findServiceInTable(serviceName) {
  var tableElementsList = totalCostTableElement.querySelectorAll('li');
  return _toConsumableArray(tableElementsList).find(function (el) {
    return el.id === serviceName;
  });
}
function addToTotalCostTable(item) {
  totalCostTableElement.insertAdjacentElement('beforeend', item);
}
function removeFromTotalCostTable(item) {
  totalCostTableElement.removeChild(item);
}
function onBuldingTypeBtnClick(e) {
  var clickedButton = e.target;
  if (clickedButton.classList.contains('buildings__element--current')) return;
  _toConsumableArray(buildingsBtnList).forEach(function (button) {
    if (button === clickedButton) {
      var id = button.id;
      button.classList.add('buildings__element--current');
    } else {
      button.classList.remove('buildings__element--current');
    }
  });
}
function updateMinusBtnStyle(serviceName) {
  var _document$querySelect;
  var decreaseSquareIcon = (_document$querySelect = document.querySelector("[data-name=\"".concat(serviceName, "\"]")).parentNode) === null || _document$querySelect === void 0 || (_document$querySelect = _document$querySelect.parentNode) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.querySelector('.control-quantity-btn--minus .icon--minus');
  if (interfaceServiceInfoObj[serviceName].quantity === 1) {
    decreaseSquareIcon.style.fill = 'rgba(	77, 18, 153, 0.3)';
  } else {
    decreaseSquareIcon.style.fill = '#4D1299';
  }
}
function handleKeyBtn(e) {
  var btn = e.currentTarget;
  btn.classList.toggle('active');
  var addressType = btn.id;
  toggleAddressItem(addressType);
  toggleKeysAddressBlock();
}
function toggleAddressItem(addressType) {
  if (addressType === 'take-keys-btn') {
    addressTakeBlock.classList.toggle('isHidden');
  } else {
    addressGiveBlock.classList.toggle('isHidden');
  }
}
function toggleKeysAddressBlock() {
  var isAddressTakeBlockHidden = addressTakeBlock.classList.contains('isHidden');
  var isAddressGiveBlockHidden = addressGiveBlock.classList.contains('isHidden');
  if (isAddressTakeBlockHidden && isAddressGiveBlockHidden) {
    keysAddressBlock.classList.add('isHidden');
  } else {
    keysAddressBlock.classList.remove('isHidden');
  }
}
//# sourceMappingURL=chose-services.js.map
