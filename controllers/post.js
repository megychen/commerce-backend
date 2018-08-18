var express = require('express');
var router = express.Router();
var PostModel = require('../models/post');

module.exports.more = function(req, res, next) {
  PostModel.find({}, {}, function(err, posts) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, postList: posts });
    }
  });
};

module.exports.one = function(req, res, next) {
  var id = req.params.id;

  PostModel.findOne({ _id: id }, function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, post });
    }
  });
};

module.exports.create = function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var author = req.body.author;
  var postLink = req.body.postLink;
  var timestamp = req.body.timestamp;

  var host = req.hostname;
  var filePath = req.protocol + "://" + host + '/' + req.file.path;

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.author = author;
  post.postLink = postLink;
  post.postImg = filePath;
  post.timestamp = timestamp.toLocaleString();
  post.save(function(err, doc) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '创建成功' });
    }
  });
};

module.exports.update = function(req, res, next) {
  var id = req.params.id;
  var title = req.body.title;
  var content = req.body.content;
  var author = req.body.author;
  var postLink = req.body.postLink;

  var host = req.host;
  var filePath = req.protocol + "://" + host + '/' + req.file.path;
  var postImg = filePath

  PostModel.findOneAndUpdate({ _id: id }, { title, content, author, postLink, postImg }, function(err) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '更新成功' });
    }
  });
};

module.exports.delete = function(req, res, next) {
  var id = req.params.id;

  PostModel.deleteOne({ _id: id }, function(err) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '删除成功' });
    }
  })
}