const QuotesListView = require('./views/quotes_list_view.js')
const Quotes = require('./models/quotes.js');
const SelectView = require('./views/select_view.js');



document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript Loaded');

  const selectElement = document.querySelector('select#author-select');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();


  const quotesListContainer = document.querySelector('#quotes');
  const quotesListView = new QuotesListView(quotesListContainer);
  quotesListView.bindEvents();

  const quotes = new Quotes();
  quotes.getData();

});
