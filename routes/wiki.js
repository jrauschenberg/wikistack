var express = require('express');
var router = express.Router();




router.get("/", function(req, res, next) {
  res.redirect('../');
});
router.post("/", function(req, res, next) {
  res.send('post working');
});
router.get("/add", function(req, res, next) {
  res.render('addpage.html');
});

module.exports = router;

