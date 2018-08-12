var express = require('express');
var router = express.Router();
var EntrepreneurModel = require('../models/entrepreneur');

// GET autrepreneurs api
router.get('/', function(req, res) {
  EntrepreneurModel.find({}, {}, function(err, entrepreneurs) {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({entrepreneurtList: entrepreneurs});
    }
  });
});

// POST autrepreneurs api
router.post('/', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var authorId = req.body.authorId;
  
  var autrepreneur = new EntrepreneurModel();
  autrepreneur.title = title;
  autrepreneur.content = content;
  autrepreneur.authorId = authorId;
  autrepreneur.timestamp = new Date().toLocaleString();
  autrepreneur.save(function(err, doc) {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: '创建成功' });
    }
  });
});

// PATCH autrepreneurs api
router.patch('/', function(req, res, next) {
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;

  EntrepreneurModel.findOneAndUpdate({ _id: id }, { title, content }, function(err) {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: '更新成功' });
    }
  });
});

// DELETE autrepreneurs api
router.delete('/', function(req, res, next) {
  var id = req.body.id;

  EntrepreneurModel.deleteOne({ _id: id }, function(err) {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: '删除成功' });
    }
  })
});

module.exports = router;