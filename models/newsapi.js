var NewsAPI = require("newsapi");
require("dotenv").config();
var newsapi = new NewsAPI(MY_NEWSAPI_KEY);

module.exports = function() {
  newsapi.v2
    .topHeadlines({
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
