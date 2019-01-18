const QuoteView = function(container, quotes) {
  this.container = container;
  this.quotes = quotes;
};

QuoteView.prototype.render = function () {
  const quoteName = document.createElement('p');
  quoteName.textContent = this.quotes.quote;
  this.container.appendChild(quoteName)

};
module.exports = QuoteView;
