var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  UserModel.find({}, {}, function(err, users) {
    if (err) {
      next(err);
    } else {
      res.json({userList: users});
    }
  });
});

module.exports = router;
