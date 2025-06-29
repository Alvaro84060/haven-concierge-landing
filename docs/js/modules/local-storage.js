"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataFromStorage = getDataFromStorage;
exports.resetLocalStorage = resetLocalStorage;
exports.storeDataInLocalStorage = storeDataInLocalStorage;
function storeDataInLocalStorage(key, obj) {
  var objJSON = JSON.stringify(obj);
  localStorage.setItem(key, objJSON);
}
function getDataFromStorage(key) {
  var objJSON = localStorage.getItem(key);
  return JSON.parse(objJSON);
}
function resetLocalStorage(key) {
  localStorage.removeItem(key);
}
//# sourceMappingURL=local-storage.js.map
