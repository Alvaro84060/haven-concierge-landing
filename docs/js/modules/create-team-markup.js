"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCategoryList = createCategoryList;
exports.createCircularSliderMarkup = createCircularSliderMarkup;
exports.createMembersNameList = createMembersNameList;
var _utils = require("./utils");
function createCategoryList(categories, teamObj) {
  var list = document.querySelector('.team__category-list');
  var fragment = document.createDocumentFragment();
  categories.forEach(function (category, index) {
    var listItem = document.createElement('li');
    if (index === 0) {
      listItem.className = 'team__category-item category--active';
    } else {
      listItem.className = 'team__category-item';
    }
    listItem.textContent = teamObj[category];
    listItem.setAttribute('data-category', category);
    fragment.appendChild(listItem);
  });
  list.appendChild(fragment);
}
function createMembersNameList(membersByCategory, category) {
  var membersList = document.querySelector('.team__members-name-list');
  var fragment = document.createDocumentFragment();
  var nameList = membersByCategory.find(function (member) {
    return member.name === category;
  }).members;
  (0, _utils.makeArrayReverse)(nameList).forEach(function (_ref, index) {
    var name = _ref.name,
      memberID = _ref.memberID;
    var listItem = document.createElement('li');
    if (index === 0) {
      listItem.className = 'team__name name--active';
    } else {
      listItem.className = 'team__name';
    }
    listItem.textContent = name;
    listItem.setAttribute('data-id', memberID);
    fragment.appendChild(listItem);
  });
  membersList.appendChild(fragment);
}
function createCircularSliderMarkup(categoryName, data) {
  var sliderElement = document.querySelector('.team__circular-slider');
  var filteredArray = data.filter(function (item) {
    return item.category === categoryName;
  });
  var fragment = document.createDocumentFragment();
  filteredArray.forEach(function (_ref2, index) {
    var memberID = _ref2.memberID,
      name = _ref2.name,
      category = _ref2.category;
    var liElement = document.createElement('li');
    var slideUniqueClass = "slide-".concat(index + 1);
    if (index === 1) {
      liElement.classList.add('team__circular-section', slideUniqueClass, 'team-active-slide');
    } else {
      liElement.classList.add('team__circular-section', slideUniqueClass);
    }
    liElement.setAttribute('data-member', memberID);
    liElement.setAttribute('data-category', category);
    var imgElement = createTeamImage(memberID, name);
    liElement.appendChild(imgElement);
    fragment.appendChild(liElement);
  });
  sliderElement.appendChild(fragment);
  return sliderElement;
}
function createTeamImage(imageName, altText) {
  var webpSrcset = "images/team/".concat(imageName, ".webp");
  var pngSrcset = "images/team/".concat(imageName, ".png");
  var picture = document.createElement('picture');
  picture.className = 'team__image';
  var webpSource = document.createElement('source');
  webpSource.setAttribute('srcset', webpSrcset);
  webpSource.setAttribute('type', 'image/webp');
  var pngSource = document.createElement('source');
  pngSource.setAttribute('srcset', pngSrcset);
  pngSource.setAttribute('type', 'image/png');
  var img = document.createElement('img');
  img.setAttribute('src', pngSrcset);
  img.setAttribute('width', '200');
  img.setAttribute('height', '200');
  img.setAttribute('alt', "\u0424\u043E\u0442\u043E \u0447\u043B\u0435\u043D\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0438 \u043D\u0430 \u0456\u043C'\u044F ".concat(altText));
  picture.appendChild(webpSource);
  picture.appendChild(pngSource);
  picture.appendChild(img);
  return picture;
}
//# sourceMappingURL=create-team-markup.js.map
