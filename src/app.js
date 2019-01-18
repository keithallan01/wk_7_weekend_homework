const QuotesListView = require('./views/quotes_list_view.js')
const Quotes = require('./models/quotes.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript Loaded');

  const quotesListContainer = document.querySelector('#quotes');
  const quotesListView = new QuotesListView(quotesListContainer);
  quotesListView.bindEvents();

  const quotes = new Quotes();
  quotes.getData();

});
