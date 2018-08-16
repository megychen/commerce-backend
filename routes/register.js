var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var UserModel = require('../models/user');

// register api request
router.post('/', function(req, res, next) {
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
          res.json({ success: false, message: err });
        } else {
          res.json({success: true, message: '注册成功'});
        }
      });
    }
  });
});

module.exports = router;