var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(postExamples) {
      res.json(postExamples);
    });
  });

  // move to apiroutes.js
  app.get("api/food", function(req, res) {
    param = "everything?q=cooking&language=en";
    callNewsApi(param)
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
  });

  // Create a new example
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(showPosts) {
      res.json(showPosts);
    });
  });

  // Delete an example by id
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(
      singlePost
    ) {
      res.json(singlePost);
    });
  });
};
