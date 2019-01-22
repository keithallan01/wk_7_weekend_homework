const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Quotes = function() {
  this.data = [];
  this.authors = [];

};

Quotes.prototype.bindEvents = function () {
  debugger;
  PubSub.subscribe('SelectView:change', (evt)  => {
    // console.log(evt.detail)
    const authorIndex = evt.detail;
    this.publishQuotebyAuthor(authorIndex);
  })
};

Quotes.prototype.getData = function () {
  const url = `https://seinfeld-quotes.herokuapp.com/quotes`;
  const request = new RequestHelper(url);

  const myPromise = request.get();

    myPromise.then((data) => {
      this.data = data.quotes;
      // console.log(this.data);
      this.publishAuthors(this.data);
      PubSub.publish('Quotes:data-ready', this.data);
    })
    .catch((err) => {
      console.error(err);
    })
};

Quotes.prototype.publishAuthors = function (data) {
  // debugger
  this.uniqueAuthorList();
}

Quotes.prototype.authorList = function () {
  const fullList = this.data.map(quotes => quotes.author);
    return fullList;
}

Quotes.prototype.uniqueAuthorList = function () {
  const uniqueAuthors = this.authorList().filter((quote, index, array) => {
    return array.indexOf(quote) === index;
  });
  this.authors = uniqueAuthors
  PubSub.publish('Quotes:authors-ready', uniqueAuthors)
}

Quotes.prototype.quotesByAuthor = function (authorIndex) {
  // debugger
  const selectedAuthor = this.authors[authorIndex]; // this.authors is empty! --> doesnt save author string correctly
  const sortedData = this.data.filter((quote) => {
    return quote.author === selectedAuthor;
  });
  return sortedData
};

Quotes.prototype.publishQuotebyAuthor = function (authorIndex) {
  const foundQuotes = this.quotesByAuthor(authorIndex);
  PubSub.publish('Quotes:data-ready', foundQuotes);
  console.log('found these quotes by seleted author:', foundQuotes)
};

module.exports = Quotes;
