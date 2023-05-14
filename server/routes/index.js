var express = require("express");
var router = express.Router(); // in express they say: var app = express.Router() so then  you would continue with app.get on line 5 instead of router.get

/* GET home page. */
router.get("/", function (req, res, next) {
  // "/api" is the homepage because in the index.js i decided that .api is the index...so in chrome if i put http://localhost:3000/api in the browser i will get the message title:Express
  res.send({ title: "Express" }); //there was a render.. we deleted it and put the send when scaffolding
});

//so here i am saying that on the homepage http://localhost:3000/api when a user lands on it, get this info that is on line 7

module.exports = router;
