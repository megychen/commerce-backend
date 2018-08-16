var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var UserModel = require('../models/user');
var config = require('../config');

// login api request
router.post('/', function(req, res, next) {
  var name = req.body.name || '';
  var password = req.body.password || '';

  UserModel.findOne({ name }, function(err, user) {
    if (err || !user) {
      res.json({ success: false, message: '找不到用户' });
    } else {
      var isOk = bcrypt.compare(password, user.password);
      if (!isOk) {
        res.json({ success: false, message: '密码不对' });
      }

      var authToken = user._id;
      var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // cookie 有效期30天
        signed: true,
        httpOnly: true
      };

      res.cookie(config.cookieName, authToken, opts);
      res.json({ success: true, message: '登录成功', token: authToken });
    }
  });
});

module.exports = router;