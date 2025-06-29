"use strict";

var _modal = require("./modal");
var refsSupport = {
  name: 'support',
  openModalBtn: document.querySelector('[data-support-modal-open]'),
  closeModalBtn: document.querySelector('[data-support-modal-close]'),
  modal: document.querySelector('[data-support-modal]'),
  backdrop: document.querySelector('.backdrop--support')
};
(0, _modal.initializeModal)(refsSupport);
//# sourceMappingURL=support-modal.js.map
