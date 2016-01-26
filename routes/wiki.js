var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get("/", function(req, res, next) {
  res.redirect('../');
});

router.post("/", function(req, res, next) {
  var content = req.body.pageContent;
  var title = req.body.title;
  var page = new Page({
    title: title,
    content: content,
    tags: req.body.tags.split(" ")
  });
  page.save(function(err) {
    if (err) console.log(err.message);
  }).then(function(result) {res.redirect(result.urlTitle);});
});

router.get("/similar", function(req, res, next) {
  
});

router.get("/search", function(req, res, next) {
  Page.findByTag(req.query.tag).exec()
  .then(function(result) {
    console.log(result);
    res.render('index.html', {pages: result} );
  });
});

router.get("/add", function(req, res, next) {
  res.render('addpage.html');
});

router.get("/:pagename", function(req, res, next) {
  Page.findOne({ urlTitle: req.params.pagename }).
  exec(function(err, result) { 
    if (err) next();
    res.render('wikipage.html', { page: result }); 
  });
});

module.exports = router;

