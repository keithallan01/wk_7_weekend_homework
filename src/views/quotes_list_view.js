const PubSub = require('../helpers/pub_sub.js')
const QuoteView = require('./quote_view.js')

const QuotesListView = function(container) {
  this.container = container;
};

QuotesListView.prototype.bindEvents = function() {
  PubSub.subscribe('Quotes:data-ready', (event) => {
    console.log(event);
    this.quotes = event.detail;
    this.render();
  });
};

QuotesListView.prototype.render = function () {
  this.quotes.forEach((quote) => {
    const quoteView = new QuoteView(this.container, quote)
    quoteView.render();
  })
};

module.exports = QuotesListView
