var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get("/", function(req, res, next) {
  res.redirect('../');
});

router.post("/", function(req, res, next) {
  var page = new Page({
    title: req.body.title,
    content: req.body.pageContent,
    tags: req.body.tags.split(" ")
  });
  page.save(function(err) {
    if (err) console.log(err.message);
  }).then(function(result) {res.redirect(result.urlTitle);});
});

router.get("/:pageUrl/similar", function(req, res, next) {
  Page.findOne({ urlTitle: req.params.pageUrl})
  .then(function(page){
    return page.findSimilar();
  })
  .then(function(pages) {
     res.render('index', {pages: pages});
  });
  
});

router.get("/search", function(req, res, next) {
  Page.findByTag(req.query.tag).exec()
  .then(function(result) {
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

