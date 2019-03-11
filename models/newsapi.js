var NewsAPI = require("newsapi");
var newsapi = new NewsAPI(MY_NEWSAPI_KEY);
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

module.exports = function() {
  newsapi.v2
    .topHeadlines({
      sources: "bbc-news,the-verge",
      q: "bitcoin",
      category: "business",
      language: "en",
      country: "us"
    })
    .then(function(response) {
      console.log(response);
      /*
        {
        status: "ok",
        articles: [...]
        }
      */
    });
};
