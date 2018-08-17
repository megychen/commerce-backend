var express = require('express');
var router = express.Router();
var CompanyModel = require('../models/company');

module.exports.more = function(req, res, next) {
  CompanyModel.find({}, {}, function(err, companys) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, companyList: companys });
    }
  });
};

module.exports.one = function(req, res, next) {
  var id = req.params.id;

  CompanyModel.findOne({ _id: id }, function(err, company) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, company });
    }
  });
};

module.exports.create = function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var author = req.body.author;

  var company = new CompanyModel();
  company.title = title;
  company.content = content;
  company.author = author;
  company.timestamp = new Date().toLocaleString();
  company.save(function(err, doc) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '创建成功' });
    }
  });
};

module.exports.update = function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var author = req.body.author;

  post.title = title;
  post.content = content;
  post.author = author;

  CompanyModel.findOneAndUpdate({ _id: id }, { title, content, author }, function(err) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '更新成功' });
    }
  });
};

module.exports.delete = function(req, res, next) {
  var id = req.params.id;

  CompanyModel.deleteOne({ _id: id }, function(err) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '删除成功' });
    }
  })
}