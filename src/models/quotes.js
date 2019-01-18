const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Quotes = function() {
  this.data = [];
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

module.exports = Quotes;
