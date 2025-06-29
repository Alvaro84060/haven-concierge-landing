"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeModal = initializeModal;
exports.toggleModal = toggleModal;
var _userOrderForm = require("./user-order-form");
// import {subscForm } from './user-order-form';

function initializeModal(refs) {
  var _refs$openModalBtn, _refs$closeModalBtn, _refs$backdrop;
  (_refs$openModalBtn = refs.openModalBtn) === null || _refs$openModalBtn === void 0 || _refs$openModalBtn.addEventListener('click', function () {
    return toggleModal(refs);
  });
  (_refs$closeModalBtn = refs.closeModalBtn) === null || _refs$closeModalBtn === void 0 || _refs$closeModalBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleModal(refs);
  });
  (_refs$backdrop = refs.backdrop) === null || _refs$backdrop === void 0 || _refs$backdrop.addEventListener('click', function (e) {
    if (e.target === refs.backdrop) {
      toggleModal(refs);
    }
  });
}
function toggleModal(refs) {
  var _refs$modal;
  document.body.classList.toggle("".concat(refs.name, "-modal-open"));
  (_refs$modal = refs.modal) === null || _refs$modal === void 0 || _refs$modal.classList.toggle('backdrop--hidden');
  if (refs.name === 'subscription') {
    (0, _userOrderForm.resetErrors)(_userOrderForm.subscForm === null || _userOrderForm.subscForm === void 0 ? void 0 : _userOrderForm.subscForm.elements);
    (0, _userOrderForm.hidePaymentTypeError)();
    (0, _userOrderForm.hidePolicyError)();
  }
}
//# sourceMappingURL=modal.js.map
