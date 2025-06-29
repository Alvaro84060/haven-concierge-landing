"use strict";

var _common = require("./common");
var _dates = require("./dates");
var _getElements = require("./get-elements");
var _localStorage = require("./local-storage");
var calendarBlocks = document.querySelectorAll('.calendar');
calendarBlocks.forEach(initializeCalendar);
function initializeCalendar(calendarBlock) {
  var _getCalendarElements = (0, _getElements.getCalendarElements)(calendarBlock),
    calendarIcon = _getCalendarElements.calendarIcon,
    dateInput = _getCalendarElements.dateInput,
    sheduleEl = _getCalendarElements.sheduleEl,
    calendarBody = _getCalendarElements.calendarBody,
    calendarHeadMonthAndYear = _getCalendarElements.calendarHeadMonthAndYear,
    prevMonthBtn = _getCalendarElements.prevMonthBtn,
    nextMonthBtn = _getCalendarElements.nextMonthBtn;
  var selectedDateObj = new Date();
  var monthToShowInCalendarObj = new Date();
  var orderDayString = (0, _dates.getCurrentDateAsString)();
  dateInput.addEventListener('click', handleCalendar);
  calendarIcon.addEventListener('click', handleCalendar);
  dateInput.addEventListener('blur', function () {
    (0, _common.handleInputBlur)(dateInput, _dates.extractDate);
  });
  prevMonthBtn === null || prevMonthBtn === void 0 || prevMonthBtn.addEventListener('click', function () {
    updateCalendar(-1);
  });
  nextMonthBtn === null || nextMonthBtn === void 0 || nextMonthBtn.addEventListener('click', function () {
    updateCalendar(1);
  });
  function handleCalendar() {
    (0, _common.setShedulerVisibilityOptions)(calendarBlock, sheduleEl, calendarIcon);
    toggleClosestTimePickerVisibility(dateInput);
    monthToShowInCalendarObj = new Date(selectedDateObj);
    generateCalendar(selectedDateObj);
    setDateInputInterface(calendarBlock, dateInput);
  }
  function handleCellClick(event) {
    var clickedDate = (0, _dates.convertDateFormat)(event.target.dataset.date);
    var currentDateObj = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    var clickedDateObj = new Date(clickedDate);
    selectedDateObj = clickedDateObj;
    var currentDateObjObj = new Date(currentDateObj);
    var differenceInMilliseconds = clickedDateObj - currentDateObjObj;
    if (differenceInMilliseconds >= 0) {
      var chosenDate = (0, _dates.reverseConvertDateFormat)(clickedDate);
      orderDayString = chosenDate;
      var timeInput = (0, _getElements.getClosestTimeInput)(dateInput);
      timeInput.value = '';
      (0, _localStorage.resetLocalStorage)('selectedTimeObj');
      setDateInputInterface(calendarBlock, dateInput);
      (0, _common.setShedulerVisibilityOptions)(calendarBlock, sheduleEl, calendarIcon);
    }
  }
  function generateCalendar(dateobj) {
    clearCalendarData();
    var _getCurrentYearAndMon = (0, _dates.getCurrentYearAndMonth)(dateobj),
      year = _getCurrentYearAndMon.year,
      month = _getCurrentYearAndMon.month;
    setMonthAndYearName(year);
    var _getMonthBoundaryDate = (0, _dates.getMonthBoundaryDates)(year, month),
      firstDayOfMonth = _getMonthBoundaryDate.firstDayOfMonth,
      lastDayOfMonthObj = _getMonthBoundaryDate.lastDayOfMonthObj;
    var initialNumberOfWeekDay = (0, _dates.calculateStartDay)(firstDayOfMonth);
    var lastDayOfPrevMonth = (0, _dates.getLastDayOfPrevMonth)(year, month);
    var currentDayNumber = 1;
    var currentRow = createCalendarRow();
    for (var i = initialNumberOfWeekDay - 1; i >= 1; i--) {
      var day = lastDayOfPrevMonth - i + 1;
      var cell = createCalendarCell(day, 'previous-month');
      (0, _common.appendElement)(currentRow, cell);
    }
    while (currentDayNumber <= lastDayOfMonthObj.getDate()) {
      var _cell = createCalendarCell(currentDayNumber, 'current-month');
      (0, _common.appendElement)(currentRow, _cell);
      var isWeekRowFull = currentRow.children.length === 7;
      if (isWeekRowFull) {
        (0, _common.appendElement)(calendarBody, currentRow);
        currentRow = createCalendarRow();
      }
      currentDayNumber++;
    }
    var isAnyEmptyCell = currentRow.children.length > 0;
    if (isAnyEmptyCell) {
      for (var _i = 1; currentRow.children.length < 7; _i++) {
        var _cell2 = createCalendarCell(_i, 'next-month');
        (0, _common.appendElement)(currentRow, _cell2);
      }
      (0, _common.appendElement)(calendarBody, currentRow);
    }
  }
  function setCellText(cell, day) {
    cell.textContent = day;
  }
  function setCellAttributes(cell, _ref) {
    var day = _ref.day,
      month = _ref.month,
      year = _ref.year;
    cell.dataset.date = "".concat(day, "/").concat(month < 9 ? '0' : '').concat(month + 1, "/").concat(year);
  }
  function addCellClasses(cell, options) {
    var monthType = options.monthType,
      isCellSelectedDay = options.isCellSelectedDay,
      isDisabledDate = options.isDisabledDate;
    if (isDisabledDate) {
      cell.classList.add('disabled-day');
    }
    if (monthType === 'current-month' && isCellSelectedDay) {
      cell.classList.add('order-day');
    }
    cell.classList.add(monthType);
  }
  function addClickEventIfNotDisabled(cell, isDisabledDate) {
    if (!isDisabledDate) {
      cell.addEventListener('click', handleCellClick);
    }
  }
  function createCellEl(cellData) {
    var day = cellData.day,
      month = cellData.month,
      year = cellData.year,
      isDisabledDate = cellData.isDisabledDate,
      monthType = cellData.monthType,
      isCellSelectedDay = cellData.isCellSelectedDay;
    var cell = document.createElement('td');
    var options = {
      monthType: monthType,
      isCellSelectedDay: isCellSelectedDay,
      isDisabledDate: isDisabledDate
    };
    setCellText(cell, day);
    setCellAttributes(cell, {
      day: day,
      month: month,
      year: year
    });
    addClickEventIfNotDisabled(cell, isDisabledDate);
    addCellClasses(cell, options);
    return cell;
  }
  function createCalendarCell(day, monthType) {
    var _getCurrentYearAndMon2 = (0, _dates.getCurrentYearAndMonth)(monthToShowInCalendarObj),
      year = _getCurrentYearAndMon2.year,
      month = _getCurrentYearAndMon2.month;
    var todayObj = new Date();
    var cellDateObj;
    if (monthType === 'previous-month') {
      var _formatDateInfo = (0, _dates.formatDateInfo)(day, month, year),
        _formattedDay = _formatDateInfo.formattedDay,
        formattedMonth = _formatDateInfo.formattedMonth,
        formattedYear = _formatDateInfo.formattedYear;
      cellDateObj = new Date(formattedYear, formattedMonth - 1, _formattedDay);
    } else if (monthType === 'current-month') {
      var _formatDateInfo2 = (0, _dates.formatDateInfo)(day),
        _formattedDay2 = _formatDateInfo2.formattedDay;
      cellDateObj = new Date(year, month, _formattedDay2);
    } else if (monthType === 'next-month') {
      var _formatDateInfo3 = (0, _dates.formatDateInfo)(day, month, year),
        _formattedDay3 = _formatDateInfo3.formattedDay;
      var nextMonth = month === 11 ? 0 : month + 1;
      var nextYear = month === 11 ? year + 1 : year;
      cellDateObj = new Date(nextYear, nextMonth, _formattedDay3);
    }
    var isDisabledDate = (0, _dates.isDateBeforeToday)(cellDateObj, todayObj);
    var isCellSelectedDay = isCellSelected(cellDateObj, selectedDateObj, day);
    var formattedDay = String(cellDateObj.getDate()).padStart(2, '0');
    var cellData = {
      day: formattedDay,
      month: cellDateObj.getMonth(),
      year: cellDateObj.getFullYear(),
      isDisabledDate: isDisabledDate,
      monthType: monthType,
      isCellSelectedDay: isCellSelectedDay
    };
    var cell = createCellEl(cellData);
    return cell;
  }
  function isCellSelected(cellDateObj, selectedDateObj, day) {
    var isYearEqual = cellDateObj.getFullYear() === selectedDateObj.getFullYear();
    var isMonthEqual = cellDateObj.getMonth() === selectedDateObj.getMonth();
    var isDayEqual = day === selectedDateObj.getDate();
    var isCellSelectedDay = isYearEqual && isMonthEqual && isDayEqual;
    return isCellSelectedDay;
  }
  function setMonthAndYearName(year) {
    var monthName = monthToShowInCalendarObj.toLocaleDateString('uk-UA', {
      month: 'long'
    });
    var capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    calendarHeadMonthAndYear.textContent = "".concat(capitalizedMonth, " ").concat(year);
  }
  function setDateInputInterface(calendarBlock, dateInput) {
    var isCalendarVisible = !calendarBlock.classList.contains('isHidden');
    if (isCalendarVisible) {
      dateInput.value = "".concat(orderDayString);
    }
  }
  function clearCalendarData() {
    calendarBody.innerHTML = '';
  }
  function updateCalendar(monthOffset) {
    monthToShowInCalendarObj.setMonth(monthToShowInCalendarObj.getMonth() + monthOffset);
    generateCalendar(monthToShowInCalendarObj);
  }
  function createCalendarRow() {
    return document.createElement('tr');
  }
  function toggleClosestTimePickerVisibility(dateInput) {
    var wrap = (0, _getElements.getClosestTimePickerBlock)(dateInput);
    (0, _common.toggleClosestVisibility)(wrap, 'time-picker-wrap', 'icon--clock');
  }
  generateCalendar(selectedDateObj);
}
//# sourceMappingURL=calendar.js.map
