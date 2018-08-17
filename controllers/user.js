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

      // var opts = {
      //   path: '/',
      //   maxAge: 1000 * 60 * 60 * 24 * 30, // cookie 有效期30天
      //   signed: true,
      //   httpOnly: true
      // };

      // res.cookie(config.cookieName, authToken, opts);
      res.json({ success: true, message: '登录成功', token: authToken });
    }
  });
}