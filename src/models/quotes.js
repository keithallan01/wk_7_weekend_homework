const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Quotes = function() {
  this.data = [];
  this.authors = [];
};

Quotes.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt)  => {
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
      console.log(this.data);
      PubSub.publish('Quotes:data-ready', this.data);
    })
    .catch((err) => {
      console.error(err);
    })
};

Quotes.prototype.publishAuthors = function (data) {
  this.data = data;
  this.authors = this.uniqueAuthorList();
  PubSub.publish('Quotes:authors-ready', this.authors);
}

Quotes.prototype.authorList = function () {
  const fullList = this.data.map(quotes => quotes.author);
  return fullList;
}

Quotes.prototype.uniqueAuthorList = function () {
  return this.authorList().filter((quote, index, array) => {
    return array.indexOf(quote) === index;
  });
}

Quotes.prototype.quotesByAuthor = function (authorIndex) {
  const selectedAuthor = this.author[authorIndex];
  return this.data.filter((quote) => {
    return quote.author === selectedAuthor;
  });
};

Quotes.prototype.publishQuotebyAuthor = function (authorIndex) {
  const foundQuotes = this.quotesByAuthor(authorIndex);
  PubSub.publish('Quotes:quotes-ready', foundQuotes);
};

module.exports = Quotes;
