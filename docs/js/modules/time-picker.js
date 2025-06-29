"use strict";

var _common = require("./common");
var _getElements = require("./get-elements");
var _dates = require("./dates");
var _localStorage = require("./local-storage");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var workShedule = [{
  day: 'пн',
  min: '07',
  max: '21'
}, {
  day: 'вт',
  min: '07',
  max: '21'
}, {
  day: 'ср',
  min: '07',
  max: '21'
}, {
  day: 'чт',
  min: '07',
  max: '21'
}, {
  day: 'пт',
  min: '07',
  max: '21'
}, {
  day: 'сб',
  min: '10',
  max: '19'
}, {
  day: 'нд',
  min: '10',
  max: '19'
}];
var timePickerElements = document.querySelectorAll('.time-picker-wrap');
timePickerElements.forEach(initializeTimePicker);
function initializeTimePicker(timePickerElement) {
  var _getTimePickerElement = (0, _getElements.getTimePickerElements)(timePickerElement),
    clockIcon = _getTimePickerElement.clockIcon,
    sheduleEl = _getTimePickerElement.sheduleEl,
    hourTablo = _getTimePickerElement.hourTablo,
    minuteTablo = _getTimePickerElement.minuteTablo,
    hourPicker = _getTimePickerElement.hourPicker,
    minutePicker = _getTimePickerElement.minutePicker,
    confirmTimeBtn = _getTimePickerElement.confirmTimeBtn,
    timeInput = _getTimePickerElement.timeInput;
  var selectedTimeObj = (0, _localStorage.getDataFromStorage)('selectedTimeObj') || {
    hours: '15',
    minutes: '00'
  };
  (0, _localStorage.storeDataInLocalStorage)('selectedTimeObj', selectedTimeObj);
  timeInput.addEventListener('click', handleTimePicker);
  clockIcon.addEventListener('click', handleTimePicker);
  timeInput.addEventListener('blur', function () {
    (0, _common.handleInputBlur)(timeInput, extractTime);
  });
  hourTablo.addEventListener('click', function (e) {
    return onTimeCellClick(e, '.time-picker__hours');
  });
  minuteTablo.addEventListener('click', function (e) {
    return onTimeCellClick(e, '.time-picker__minutes');
  });
  minutePicker.addEventListener('click', function () {
    return togglePickerBlock(minuteTablo, hourTablo);
  });
  hourPicker.addEventListener('click', function () {
    return togglePickerBlock(hourTablo, minuteTablo);
  });
  confirmTimeBtn.addEventListener('click', function () {
    resetDisabledPickerCells(timePickerElement);
    (0, _common.setShedulerVisibilityOptions)(timePickerElement, sheduleEl, clockIcon);
  });
  function handleTimePicker() {
    selectedTimeObj = (0, _localStorage.getDataFromStorage)('selectedTimeObj') || {
      hours: '15',
      minutes: '00'
    };
    var dateInput = (0, _getElements.getClosestDateInput)(timeInput);
    var dateString = dateInput.value;
    if (!!dateString) {
      resetDisabledPickerCells(timePickerElement);
      var _getMinAndMaxHours = getMinAndMaxHours(dateString, workShedule),
        minHour = _getMinAndMaxHours.minHour,
        maxHour = _getMinAndMaxHours.maxHour;
      disableHourCells(timePickerElement, minHour, maxHour);
      updateFullTabloInterface(selectedTimeObj);
      updateTimePicker(selectedTimeObj);
      (0, _common.setShedulerVisibilityOptions)(timePickerElement, sheduleEl, clockIcon);
      toggleClosestCalendarVisibility(timeInput);
      setTimeInputInterface(timePickerElement, timeInput);
    } else {
      showWarningMessage(timeInput);
    }
  }
  function onTimeCellClick(e, blockSelector) {
    var clickedElement = e.target;
    var isDisabled = clickedElement.classList.contains('disabled');
    if (isDisabled) return;
    if (!validateClickedNumber(clickedElement)) return;
    var partTimeName = getTimePartName(blockSelector);
    var elements = timePickerElement.querySelectorAll(".".concat(partTimeName));
    updateChosenPickerBlock(clickedElement, elements);
    var block = timePickerElement.querySelector(blockSelector);
    var value = clickedElement.dataset.id;
    updateBlockTabloInterface(block, value);
    updateTimeInput(blockSelector, value);
  }
  function updateTimePicker(selectedTimeObj) {
    var orderHour = selectedTimeObj.hours;
    var orderMinute = selectedTimeObj.minutes;
    var allHourElements = timePickerElement.querySelectorAll('.hours');
    var allMinuteElements = timePickerElement.querySelectorAll('.minutes');
    var hourElement = _toConsumableArray(allHourElements).find(function (el) {
      return el.getAttribute('data-id') == orderHour;
    });
    var minuteElement = _toConsumableArray(allMinuteElements).find(function (el) {
      return el.getAttribute('data-id') == orderMinute;
    });
    updateChosenPickerBlock(hourElement, allHourElements);
    updateChosenPickerBlock(minuteElement, allMinuteElements);
  }
  function getMinAndMaxHours(dateString, workShedule) {
    var dateObject = (0, _dates.parseDateStringToDate)(dateString);
    var dayName = (0, _dates.getDayNameFromDate)(dateObject);
    var dayInfoObj = workShedule.find(function (d) {
      return d.day === dayName;
    });
    var minHour = parseInt(dayInfoObj.min);
    var maxHour = parseInt(dayInfoObj.max);
    return {
      minHour: minHour,
      maxHour: maxHour
    };
  }
  function showWarningMessage(timeInput) {
    timeInput.value = 'Оберіть спочатку дату для прибирання';
  }
  function disableHourCells(timePickerElement, minHour, maxHour) {
    var hourCells = _toConsumableArray(timePickerElement.querySelectorAll('.hours'));
    var cellsToMakeDisable = hourCells.filter(function (cell) {
      var value = parseInt(cell.getAttribute('data-id'));
      return value < minHour || value > maxHour;
    });
    cellsToMakeDisable.forEach(function (cell) {
      if (!cell.classList.contains('disabled')) {
        cell.classList.remove('active');
        cell.classList.add('disabled');
      }
    });
  }
  function resetDisabledPickerCells(timePickerElement) {
    var hourCells = _toConsumableArray(timePickerElement.querySelectorAll('.hours'));
    hourCells.forEach(function (cell) {
      cell.classList.remove('disabled');
    });
  }
  function setTimeInputInterface(timePickerElement, timeInput) {
    var isTimePickerVisible = !timePickerElement.classList.contains('isHidden');
    if (isTimePickerVisible) {
      timeInput.value = "".concat(selectedTimeObj.hours, " : ").concat(selectedTimeObj.minutes);
    }
  }
  function validateClickedNumber(clickedElement) {
    return clickedElement.classList.contains('number') && !clickedElement.classList.contains('active');
  }
  function updateChosenPickerBlock(clickedElement, elements) {
    _toConsumableArray(elements).map(function (element) {
      return element === clickedElement ? selectElement(element) : deselectElement(element);
    });
  }
  function updateBlockTabloInterface(block, value) {
    block.innerHTML = value;
  }
  function updateFullTabloInterface(selectedTimeObj) {
    var orderHour = selectedTimeObj.hours;
    var orderMinute = selectedTimeObj.minutes;
    var blockHour = timePickerElement.querySelector('.time-picker__hours');
    var blockMinute = timePickerElement.querySelector('.time-picker__minutes');
    updateBlockTabloInterface(blockHour, orderHour);
    updateBlockTabloInterface(blockMinute, orderMinute);
  }
  function updateTimeInput(selector, value) {
    var partTime = getTimePartName(selector);
    selectedTimeObj[partTime] = value;
    (0, _localStorage.storeDataInLocalStorage)('selectedTimeObj', selectedTimeObj);
    setTimeInputInterface(timePickerElement, timeInput);
  }
  function selectElement(element) {
    element.classList.add('active');
  }
  function deselectElement(element) {
    element.classList.remove('active');
  }
  function getTimePartName(selector) {
    return selector.split('__')[1];
  }
  function extractTime(inputString) {
    var trimmedString = inputString.trim();
    var timeMatch = trimmedString.match(/\d{2}\s*:\s*\d{2}/);
    return timeMatch ? timeMatch[0] : null;
  }
  function togglePickerBlock(pickerToShow, pickerToHide) {
    var isVisible = !pickerToShow.classList.contains('isHidden');
    if (isVisible) return;
    pickerToShow.classList.remove('isHidden');
    pickerToHide.classList.add('isHidden');
  }
  function toggleClosestCalendarVisibility(timeInput) {
    var wrap = (0, _getElements.getClosestCalendarBlock)(timeInput);
    (0, _common.toggleClosestVisibility)(wrap, 'calendar', 'icon--calendar');
  }
}
//# sourceMappingURL=time-picker.js.map
