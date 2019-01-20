const QuoteView = function(container, quotes) {
  this.container = container;
  this.quotes = quotes;
};

QuoteView.prototype.render = function () {
  const quoteName = document.createElement('p');
  quoteName.textContent = this.quotes.quote;
  this.container.appendChild(quoteName)

  // const quoteAuthor = document.createElement('h3');
  // quoteAuthor.textContent = `Who said it: ${this.quotes.author}`;
  // this.container.appendChild(quoteAuthor)

  const quoteSeason = document.createElement('li');
  quoteSeason.textContent = `Series: ${this.quotes.season}`;
  this.container.appendChild(quoteSeason)

  const quoteEpisode = document.createElement('li')
  quoteEpisode.textContent = `Episode: ${this.quotes.episode}`;
  this.container.appendChild(quoteEpisode);
};
module.exports = QuoteView;
