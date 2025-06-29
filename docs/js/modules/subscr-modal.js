"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refsSubscr = void 0;
var _modal = require("./modal");
var refsSubscr = exports.refsSubscr = {
  name: 'subscription',
  openModalBtn: document.querySelector('[data-subscription-modal-open]'),
  closeModalBtn: document.querySelector('[data-subscription-modal-close]'),
  modal: document.querySelector('[data-subscription-modal]'),
  backdrop: document.querySelector('.backdrop--subscr')
};
(0, _modal.initializeModal)(refsSubscr);
//# sourceMappingURL=subscr-modal.js.map
