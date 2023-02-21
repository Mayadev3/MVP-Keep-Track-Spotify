var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // "/" is the homepage
  res.send({ title: "Express" }); //there was a render.. we deleted it and put the send
});

module.exports = router;
