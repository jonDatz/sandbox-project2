// Require dependencies

require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Define Handlebars Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//Set Handlebars Engine
app.set("view engine", "handlebars");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize
  .sync(syncOptions)
  .then(function() {
    app.listen(PORT, function() {
      console.log("App is listening on PORT  " + PORT);
    });
  })
  .catch(function(err) {
    console.log(err);
  });

module.exports = app;
