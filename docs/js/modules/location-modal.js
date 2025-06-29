"use strict";

var _modal = require("./modal");
var refsLocation = {
  name: 'location',
  openModalBtn: document.querySelector('[data-location-modal-open]'),
  closeModalBtn: document.querySelector('[data-location-modal-close]'),
  modal: document.querySelector('[data-location-modal]'),
  backdrop: document.querySelector('.backdrop--location')
};
(0, _modal.initializeModal)(refsLocation);
//# sourceMappingURL=location-modal.js.map
