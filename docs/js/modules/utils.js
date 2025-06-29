"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSwipeCount = calculateSwipeCount;
exports.canUseWebP = canUseWebP;
exports.chunkArray = chunkArray;
exports.copyToClipboard = copyToClipboard;
exports.createImage = createImage;
exports.createPicture = createPicture;
exports.createSlideClassesList = createSlideClassesList;
exports.createSource = createSource;
exports.getImageName = getImageName;
exports.getImageUrl = getImageUrl;
exports.getUniqueCategories = getUniqueCategories;
exports.groupTeamMembersByCategory = groupTeamMembersByCategory;
exports.makeArrayReverse = makeArrayReverse;
exports.splitContent = splitContent;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function getImageName(image) {
  return image.split('.')[0];
}
function canUseWebP() {
  var elem = document.createElement('canvas');
  return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}
function splitContent(inputString) {
  var sentences = inputString.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length >= 1) {
    return sentences;
  } else {
    return [inputString];
  }
}
function copyToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
function chunkArray(array, chunkSize) {
  var result = [];
  for (var i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
function getImageUrl(directory, imageName) {
  var supportsWebP = canUseWebP();
  return supportsWebP ? "url(images/".concat(directory, "/").concat(imageName, ".webp)") : "url('images/".concat(directory, "/").concat(image, "')");
}
function createPicture(_ref) {
  var width = _ref.width,
    srcPrefix = _ref.srcPrefix,
    media = _ref.media,
    alt = _ref.alt,
    className = _ref.className;
  var picture = document.createElement('picture');
  picture.className = className;
  picture.appendChild(createSource(width, srcPrefix, media));
  var params = {
    width: 26,
    height: 26,
    src: "".concat(srcPrefix, "@1x.png"),
    alt: alt,
    className: className
  };
  picture.appendChild(createImage(params));
  return picture;
}
function createSource(width, srcPrefix, media) {
  var source = document.createElement('source');
  source.width = width;
  source.height = width;
  source.srcset = "".concat(srcPrefix, "@1x.png 1x, ").concat(srcPrefix, "@2x.png 2x");
  source.media = media;
  return source;
}
function createImage(_ref2) {
  var width = _ref2.width,
    height = _ref2.height,
    src = _ref2.src,
    alt = _ref2.alt,
    className = _ref2.className;
  var img = document.createElement('img');
  img.className = className;
  img.width = width;
  img.height = height;
  img.src = src;
  img.alt = alt;
  return img;
}
function makeArrayReverse(originalArray) {
  if (originalArray.length < 2) {
    return originalArray.slice();
  }
  var customReorderedArray = _toConsumableArray(originalArray);
  var _ref3 = [customReorderedArray[1], customReorderedArray[0]];
  customReorderedArray[0] = _ref3[0];
  customReorderedArray[1] = _ref3[1];
  for (var i = 2, j = originalArray.length - 1; i < j; i++, j--) {
    var _ref4 = [customReorderedArray[j], customReorderedArray[i]];
    customReorderedArray[i] = _ref4[0];
    customReorderedArray[j] = _ref4[1];
  }
  return customReorderedArray;
}
function calculateSwipeCount(chosenMemberSlideIndex, quantity) {
  var visibleItems = 3;
  var activeItemSlideIndex = 2;
  if (quantity === 6) {
    return calculateSwipeCountFor6(quantity);
  } else if (quantity === 9) {
    return calculateSwipeCountFor9(quantity);
  } else if (quantity === 3) {
    return calculateSwipeCountFor3(quantity);
  } else if (quantity === 4) {
    return calculateSwipeCountFor4(quantity);
  }
  function calculateSwipeCountFor6(quantity) {
    var diff = chosenMemberSlideIndex - activeItemSlideIndex;
    if (diff > visibleItems) {
      return 2;
    } else if (diff < 0) {
      return 1;
    } else if (diff === visibleItems) {
      return 3;
    } else {
      return -diff;
    }
  }
  function calculateSwipeCountFor9(quantity) {
    var diff = chosenMemberSlideIndex - activeItemSlideIndex;
    switch (diff) {
      case 7:
        return diff + 4;
      case 6:
        return -diff;
      case 5:
        return 4;
      case 4:
        return 5;
      case visibleItems:
        return 6;
      case 2:
        return -2;
      case 1:
        return -1;
      default:
        return diff < 0 ? 1 : 0;
    }
  }
  function calculateSwipeCountFor3(quantity) {
    var diff = chosenMemberSlideIndex - activeItemSlideIndex;
    if (diff === -1) {
      return 1;
    } else if (diff === 1) {
      return -1;
    }
  }
  function calculateSwipeCountFor4(quantity) {
    var diff = chosenMemberSlideIndex - activeItemSlideIndex;
    if (diff === -1) {
      return 1;
    } else if (diff === 1) {
      return -1;
    } else if (diff === 2) {
      return 2;
    }
  }
}
function getUniqueCategories(data) {
  var uniqueCategories = new Set();
  data.forEach(function (_ref5) {
    var category = _ref5.category;
    uniqueCategories.add(category);
  });
  return Array.from(uniqueCategories);
}
function groupTeamMembersByCategory(data) {
  return Object.values(data.reduce(function (categoryData, member) {
    var category = member.category,
      name = member.name,
      memberID = member.memberID;
    if (!categoryData[category]) {
      categoryData[category] = {
        name: category,
        members: []
      };
    }
    categoryData[category].members.push({
      name: name,
      memberID: memberID
    });
    return categoryData;
  }, {}));
}
function createSlideClassesList(category, data) {
  var membersQuantity = data.filter(function (item) {
    return item.category === category;
  }).length;
  var slideClasses = [];
  for (var i = 1; i <= membersQuantity; i++) {
    slideClasses.push('slide-' + i);
  }
  return slideClasses;
}
//# sourceMappingURL=utils.js.map
