var express = require('express');
var router = express.Router();
var PostModel = require('../models/post');

// GET news api
router.get('/', function(req, res) {
  PostModel.find({}, {}, function(err, posts) {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({postList: posts});
    }
  });
});

//POST news api
router.post('/', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var authorId = req.body.authorId;
  
  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.authorId = authorId;
  post.timestamp = new Date().toLocaleString();
  post.save(function(err, doc) {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: '创建成功' });
    }
  });
});

// PATCH news api
router.patch('/', function(req, res, next) {
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({ _id: id }, { title, content }, function(err) {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: '更新成功' });
    }
  })
})

// DELETE news api
router.delete('/', function(req, res, next) {
  var id = req.body.id;

  PostModel.deleteOne({ _id: id }, function(err) {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: '删除成功' });
    }
  })
});

module.exports = router;