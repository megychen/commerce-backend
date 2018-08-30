var express = require('express');
var router = express.Router();
var PostModel = require('../models/post');

module.exports.more = function(req, res, next) {
  var pageSize = parseInt(req.query.pageSize) || 10;
  var pageNo = parseInt(req.query.pageNo) || 1;
  var search = req.query.search,
      query,
      pattern = new RegExp(search,'i'),
      creteria = { title: pattern };

  if (search) {
    query = PostModel.find(creteria);
  } else {
    query = PostModel.find({});
  }

  PostModel.countDocuments(creteria, function(err, count) {
    query.sort({'timestamp': -1})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .exec(function(err, posts) {
      if (err) {
        next(err);
      } else {
        res.json({ success: true, postList: posts, total: count });
      }
    });
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
  var timestamp = req.body.timestamp || new Date();

  var filePath = req.file ? '/' + req.file.path : ''

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.author = author;
  post.postLink = postLink;
  post.postImg = filePath;
  post.timestamp = timestamp.toLocaleString().substr(0, 10).replace(',', '');

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
  var currentImg = req.body.currentImg;

  var filePath = req.file ? '/' + req.file.path : currentImg;
  var postImg = filePath

  PostModel.findOneAndUpdate({ _id: id }, { title, content, author, postLink, postImg, timestamp }, function(err) {
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