"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComparisonSliderItem = createComparisonSliderItem;
function createComparisonSliderItem(_ref) {
  var beforeName = _ref.beforeName,
    afterName = _ref.afterName,
    desc = _ref.desc,
    categories = _ref.categories;
  var listItem = document.createElement('li');
  listItem.classList.add('comparison-slider');
  var categoriesString = categories.join(', ');
  listItem.setAttribute("data-categories", categoriesString);
  var beforeImage = createComparisonImage(beforeName, desc, 'До прибирання');
  var afterImage = createComparisonImage(afterName, desc, 'Після прибирання');
  var beforeLabel = createLabel('До', 'label--before');
  var afterLabel = createLabel('Після', 'label--after');
  var handle = createHandle();
  listItem.appendChild(beforeImage);
  var wrapper = createComparisonWrapper(afterImage);
  listItem.appendChild(wrapper);
  listItem.appendChild(beforeLabel);
  listItem.appendChild(afterLabel);
  listItem.appendChild(handle);
  return listItem;
}
function createComparisonWrapper(afterImage) {
  var wrapper = document.createElement('div');
  wrapper.classList.add('comparison-slider__wrapper');
  wrapper.appendChild(afterImage);
  return wrapper;
}
function createComparisonImage(imageName, altText) {
  var webpSrcset = "images/before-after/".concat(imageName, ".webp");
  var jpgSrcset = "images/before-after/".concat(imageName, ".jpg");
  var picture = document.createElement('picture');
  picture.className = 'comparison-slider__image';
  var webpSource = document.createElement('source');
  webpSource.setAttribute('srcset', webpSrcset);
  webpSource.setAttribute('type', 'image/webp');
  var jpgSource = document.createElement('source');
  jpgSource.setAttribute('srcset', jpgSrcset);
  jpgSource.setAttribute('type', 'image/jpg');
  var img = document.createElement('img');
  img.setAttribute('src', jpgSrcset);
  img.setAttribute('alt', altText);
  img.setAttribute('width', '350');
  img.setAttribute('height', '375');
  picture.appendChild(webpSource);
  picture.appendChild(jpgSource);
  picture.appendChild(img);
  return picture;
}
function createLabel(text, className) {
  var label = document.createElement('span');
  label.textContent = text;
  label.classList.add('comparison-slider__label', className);
  return label;
}
function createHandle() {
  var handle = document.createElement('div');
  handle.classList.add('comparison-slider__handle');
  var line1 = document.createElement('div');
  line1.classList.add('handle__line');
  var circle = document.createElement('div');
  circle.classList.add('handle__circle');
  var chevronLeft = document.createElement('i');
  chevronLeft.classList.add('fas', 'fa-chevron-left');
  var chevronRight = document.createElement('i');
  chevronRight.classList.add('fas', 'fa-chevron-right');
  var line2 = document.createElement('div');
  line2.classList.add('handle__line');
  circle.appendChild(chevronLeft);
  circle.appendChild(chevronRight);
  handle.appendChild(line1);
  handle.appendChild(circle);
  handle.appendChild(line2);
  return handle;
}
//# sourceMappingURL=generate-comparison-slider.js.map
