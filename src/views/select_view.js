const PubSub = require('../helpers/pub_sub');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Quotes:authors-ready', (evt) => {
    console.log(evt.detail);
    this.populateSelect(evt.detail);

  });

  this.selectElement.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

SelectView.prototype.populateSelect = function (authors) {
  authors.forEach((author, index) => {
    const option = this.createAuthorOption(author, index);
    this.selectElement.appendChild(option);
  })
};

SelectView.prototype.createAuthorOption = function (author, index) {
  const option = document.createElement('option');
  option.textContent = author;
  option.value = index;
  return option;
};

module.exports = SelectView;
