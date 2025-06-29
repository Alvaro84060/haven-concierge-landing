"use strict";

var _common = require("./common");
var _localStorage = require("./local-storage");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var userOrderDataObj = (0, _localStorage.getDataFromStorage)('userOrderDataObj');
var tableServices = document.querySelector('.success-order-services-table');
var tableInfo = document.querySelector('.success-order-info-table');
var sectionSuccess = document.querySelector('.section--success');
var tableServicesBody = document.querySelector('.success-order-services-table tbody');
var backToHomeBtn = document.querySelector('.back-to-home-btn');
backToHomeBtn.addEventListener('click', function () {
  return (0, _localStorage.resetLocalStorage)('userOrderDataObj');
});
function populateUserOrderTable() {
  Object.entries(userOrderDataObj).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    var element = document.querySelector(".success-order__value[data-field='".concat(key, "']"));
    if (element) {
      element.textContent = value;
      toggleRowDisplay(element.parentElement, value);
    }
  });
}
function setTotalOrderCostInTable(isComplexOrder) {
  var cell = document.querySelector('.success-order--total[data-field="total"]');
  if (isComplexOrder) {
    cell.textContent = calculateTotalCost(userOrderDataObj);
  } else {
    cell.textContent = '399zł';
  }
}
function toggleRowDisplay(row, value) {
  if (row) {
    row.style.display = value ? '' : 'none';
  }
}
function createTableRow(name, quantity, cost) {
  var newRow = document.createElement('tr');
  newRow.innerHTML = "\n    <th class=\"success-order__name\">".concat(name, "</th>\n    <td class=\"success-order__value success-order__quantity\">").concat(quantity, "</td>\n    <td class=\"success-order__value success-order__cost\">").concat(cost, "</td>\n  ");
  return newRow;
}
function calculateTotalCost(obj) {
  var userSquare = obj.userSquare,
    userServices = obj.userServices;
  var parseCost = function parseCost(cost) {
    return parseFloat(cost.replace('zł', '').replace(',', '.'));
  };
  var squareCost = parseCost(userSquare.cost);
  var totalServicesCost = userServices.reduce(function (acc, service) {
    return acc + parseCost(service.cost);
  }, 0);
  return "".concat(squareCost + totalServicesCost, "z\u0142");
}
function populateUserServicesTable() {
  var userSquare = userOrderDataObj.userSquare,
    userServices = userOrderDataObj.userServices;
  var isComplexOrder = userSquare.quantity.trim() !== '' || userSquare.cost.trim() !== '';
  if (isComplexOrder) {
    var newRow = createTableRow('Площа, м²', userSquare.quantity, userSquare.cost);
    (0, _common.appendElement)(tableServicesBody, newRow);
    populateServiceRows(userServices);
  } else {
    hideTable(tableServices);
  }
  setSectionSuccessStyle(isComplexOrder);
  setTotalOrderCostInTable(isComplexOrder);
}
function populateServiceRows(userServices) {
  userServices.forEach(function (_ref3) {
    var name = _ref3.name,
      quantity = _ref3.quantity,
      cost = _ref3.cost;
    var serviceRow = createTableRow(name, quantity, cost);
    (0, _common.appendElement)(tableServicesBody, serviceRow);
  });
}
function hideTable(table) {
  table.style.display = 'none';
}
function setSectionSuccessStyle(isComplexOrder) {
  if (isComplexOrder) {
    sectionSuccess.classList.add('isComplexOrder');
  } else {
    sectionSuccess.classList.remove('isComplexOrder');
  }
}
function showUserOrderResultData() {
  if (userOrderDataObj) {
    populateUserOrderTable();
    populateUserServicesTable();
  } else {
    hideTable(tableInfo);
    hideTable(tableServices);
  }
}
showUserOrderResultData();
//# sourceMappingURL=success-order-table.js.map
