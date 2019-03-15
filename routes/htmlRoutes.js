var axios = require("axios");
var db = require("../models");

// THIS WILL BE BROKEN. IT WILL NOT WORK BECAUSE QUINCY HELPED BUT WE NEED TO COMPLETE HANDLEBARS FIRST

// this will allow you to change topics and make new api calls when a user picks a specific topic
function callNewsApi(param) {
  param = param || "top-headlines?category=general&country=us";
  return axios.get(
    // change this vvvvv to allow "param" to pick what info we send to screen
    "https://newsapi.org/v2/" +
      param +
      "&sortby=popularity&pagesize=20&apiKey=2aaed0c5bb03463c9a8487a1ec3ee5f1"
  );
}

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // this uses the function to pick which article topic
    // this will give the "view all" top articles. Can i leeave it like this? top-headlines?category=general&
    callNewsApi()
      .then(function(response) {
        console.log(response);
        res.render("index", {
          data: response,
          error: false
        });
      })
      .catch(function(error) {
        console.log(error);
        res.render("index", { error: true });
      });
    // nest this in axios function
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/savedjawns", function(req, res) {
    res.render("savedjawns");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
