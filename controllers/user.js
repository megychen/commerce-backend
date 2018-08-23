var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var UserModel = require('../models/user');
var config = require('../config');

module.exports.signup = function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  var rePass = req.body.rePass;

  UserModel.findOne({ name }, function(err, user) {
    if (err || user) {
      res.send({ success: false, message: '此用户名已被注册' });
    } else {
      if (password !== rePass) {
        res.json({success: false, message: '两次密码不一致'});
      }

      var user = new UserModel();
      user.name = name;
      user.password = bcrypt.hashSync(password, 10);
      user.save(function(err) {
        if (err) {
          next(err);
        } else {
          res.json({success: true, message: '注册成功'});
        }
      });
    }
  });
};

module.exports.signin = function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;

  UserModel.findOne({ name }, function(err, user) {
    if (err || !user) {
      res.json({ success: false, message: '找不到用户' });
    } else {
      var isOk = bcrypt.compare(password, user.password);
      if (!isOk) {
        res.json({ success: false, message: '密码不对' });
      }

      var authToken = {
        id: user._id,
        name: user.name,
        isAdmin: user.isAdmin
      };

      res.json({ success: true, message: '登录成功', token: authToken });
    }
  });
};

module.exports.more = function(req, res, next) {
  var pageSize = parseInt(req.query.pageSize) || 10;
  var pageNo = parseInt(req.query.pageNo) || 1;

  UserModel.countDocuments({}, function(err, count) {
    UserModel.find({})
    .skip((pageNo - 1) * pageSize)
    .limit(pageSize)
    .exec(function(err, users) {
      if (err) {
        next(err);
      } else {
        res.json({ success: true, userList: users, total: count });
      }
    });
  });
};

module.exports.update = function(req, res, next) {
  var id = req.params.id;
  var isAdmin = req.body.isAdmin;

  UserModel.findOneAndUpdate({ _id: id }, { isAdmin }, function(err) {
    if (err) {
      next(err);
    } else {
      res.json({ success: true, message: '更新成功' });
    }
  })
};

module.exports.reset = function(req, res, next) {
  var id = req.params.id;
  var newPass = req.body.newPass;
  var newRepass = req.body.newRepass;

  if (newPass !== newRepass) {
    res.json({success: false, message: '两次密码不一致'});
  }

  UserModel.findOne({ _id: id }, function(err, user) {
    if (err) {
      next(err);
    } else {
      user.password = bcrypt.hashSync(newPass, 10);
      user.save(function(err) {
        if (err) {
          next(err);
        } else {
          res.json({success: true, message: '更新成功'});
        }
      });
    }
  })
}