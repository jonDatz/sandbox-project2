var axios = require("axios");
var db = require("../models");

// THIS WILL BE BROKEN. IT WILL NOT WORK BECAUSE QUINCY HELPED BUT WE NEED TO COMPLETE HANDLEBARS FIRST

// this will allow you to change topics and make new api calls when a user picks a specific topic
function callNewsApi(param) {
  return axios.get(
    // change this vvvvv to allow "param" to pick what info we send to screen
    "https://newsapi.org/v2/top-headlines?" +
      param +
      "country=us&apiKey=481b5e898fd742f08451f15c0006bbdd2345"
  );
}

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // this uses the function to pick which article topic
    callNewsApi("q=technology&")
      .then(function(response) {
        console.log(response);
        // This is the code Quincy showed me
        // res.render("index", {
        //   data: response,
        //   error: false
        // });
        var dataObj = {
          data: response
          // error: false
        };
        console.log(dataObj);
        res.render("index", dataObj);
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
