var NewsAPI = require("newsapi");
require("dotenv").config();
var newsapi = new NewsAPI("481b5e898fd742f08451f15c0006bbdd");

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
