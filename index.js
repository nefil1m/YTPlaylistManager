'use strict';

var express = require('express');
var app = module.exports.app = exports.app = express();

app.use(require('connect-livereload')());
app.use(express.static(__dirname + '/dist/'));

app.get('/*', function(req, res) {
  res.sendFile('/dist/index.html', { root: __dirname });
});

var server = require('http').createServer(app).listen(8080, function() {
  console.log('Server running');
});
