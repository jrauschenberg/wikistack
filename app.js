var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var swig = require('swig');
var wikiRouter  = require('./routes/wiki.js');

app.use(morgan("dev"));
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/wiki', wikiRouter);

// templating boilerplate setup
app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });

app.listen(3000);