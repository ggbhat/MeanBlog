
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Blog = require('../models/Blog.js');



/* GET /Blogs listing. */
router.get('/', function(req, res, next) {
  Blog.find(function (err, blogs) {
    if (err) return next(err);
    res.json(blogs);
  });
});

/* POST /Blogs */
router.post('/', function(req, res, next) {
  Blog.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /Blogs/id */
router.get('/:id', function(req, res, next) {
  Blog.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /Blogs/:id */
router.put('/:id', function(req, res, next) {
  Blog.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /Blogs/:id */
router.delete('/:id', function(req, res, next) {
  Blog.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});







module.exports = router;
