var express = require('express');
var router = express.Router();
var EntrepreneurModel = require('../models/entrepreneur');

module.exports.more = function(req, res, next) {
  EntrepreneurModel.find({}, {}, function(err, entrepreneurs) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, entrepreneurList: entrepreneurs });
    }
  });
};

module.exports.one = function(req, res, next) {
  var id = req.params.id;

  EntrepreneurModel.findOne({ _id: id }, function(err, entrepreneur) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, entrepreneur });
    }
  });
};

module.exports.create = function(req, res, next) {
  var name = req.body.name;
  var title = req.body.title;
  var company = req.body.company;
  var description = req.body.description;

  var filePath = '/' + req.file.path;

  var entrepreneur = new EntrepreneurModel();
  entrepreneur.name = name;
  entrepreneur.title = title;
  entrepreneur.company = company;
  entrepreneur.description = description;
  entrepreneur.avatar = filePath;

  entrepreneur.save(function(err, doc) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '创建成功' });
    }
  });
};

module.exports.update = function(req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  var title = req.body.title;
  var company = req.body.company;
  var description = req.body.description;

  var host = req.host;
  var filePath = req.protocol + "://" + host + '/' + req.file.path;
  var avatar = filePath

  EntrepreneurModel.findOneAndUpdate({ _id: id }, { name, title, company, description, avatar  }, function(err) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '更新成功' });
    }
  });
};

module.exports.delete = function(req, res, next) {
  var id = req.params.id;

  EntrepreneurModel.deleteOne({ _id: id }, function(err) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '删除成功' });
    }
  })
}