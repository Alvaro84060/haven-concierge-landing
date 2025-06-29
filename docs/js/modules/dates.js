"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateStartDay = calculateStartDay;
exports.convertDateFormat = convertDateFormat;
exports.extractDate = extractDate;
exports.formatDateInfo = formatDateInfo;
exports.getCurrentDateAsString = getCurrentDateAsString;
exports.getCurrentYearAndMonth = getCurrentYearAndMonth;
exports.getDayNameFromDate = getDayNameFromDate;
exports.getLastDayOfPrevMonth = getLastDayOfPrevMonth;
exports.getMonthBoundaryDates = getMonthBoundaryDates;
exports.isDateBeforeToday = isDateBeforeToday;
exports.parseDateStringToDate = parseDateStringToDate;
exports.reverseConvertDateFormat = reverseConvertDateFormat;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function getCurrentDateAsString() {
  var currentDate = new Date();
  var day = currentDate.getDate().toString().padStart(2, '0');
  var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  var year = currentDate.getFullYear();
  return "".concat(day, "/").concat(month, "/").concat(year);
}
function extractDate(inputString) {
  var trimmedString = inputString.trim();
  var datePattern = /\d{2}\/\d{2}\/\d{4}/;
  var match = trimmedString.match(datePattern);
  if (match) {
    return match[0];
  } else {
    return null;
  }
}
function isDateBeforeToday(date, todayObj) {
  return date < todayObj;
}
function convertDateFormat(dateString) {
  var parts = dateString.split('/');
  var _parts = _slicedToArray(parts, 3),
    day = _parts[0],
    month = _parts[1],
    year = _parts[2];
  var newDateString = "".concat(month, "/").concat(day, "/").concat(year);
  return newDateString;
}
function reverseConvertDateFormat(dateString) {
  var parts = dateString.split('/');
  var _parts2 = _slicedToArray(parts, 3),
    month = _parts2[0],
    day = _parts2[1],
    year = _parts2[2];
  var newDateString = "".concat(day, "/").concat(month, "/").concat(year);
  return newDateString;
}
function calculateStartDay(firstDayOfMonth) {
  var initialNumberOfWeekDay = firstDayOfMonth.getDay();
  if (initialNumberOfWeekDay === 0) {
    initialNumberOfWeekDay = 7;
  }
  return initialNumberOfWeekDay;
}
function getLastDayOfPrevMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
function getCurrentYearAndMonth(obj) {
  var year = obj.getFullYear();
  var month = obj.getMonth();
  return {
    month: month,
    year: year
  };
}
function getMonthBoundaryDates(year, month) {
  var firstDayOfMonth = new Date(year, month, 1);
  var lastDayOfMonthObj = new Date(year, month + 1, 0);
  return {
    firstDayOfMonth: firstDayOfMonth,
    lastDayOfMonthObj: lastDayOfMonthObj
  };
}
function formatDateInfo(day, month, year) {
  var formattedDay = day < 10 ? "0".concat(day) : day;
  var formattedMonth = month === 0 ? 12 : month;
  var formattedYear = month === 0 ? year - 1 : year;
  return {
    formattedDay: formattedDay,
    formattedMonth: formattedMonth,
    formattedYear: formattedYear
  };
}
function parseDateStringToDate(dateString) {
  var dateParts = dateString.split('/');
  var day = parseInt(dateParts[0], 10);
  var month = parseInt(dateParts[1], 10) - 1;
  var year = parseInt(dateParts[2], 10);
  return new Date(year, month, day);
}
function getDayNameFromDate(dateObj) {
  var locale = 'uk-UA';
  var options = {
    weekday: 'short'
  };
  var dayOfWeekString = dateObj.toLocaleDateString(locale, options);
  return dayOfWeekString;
}
//# sourceMappingURL=dates.js.map
