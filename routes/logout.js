var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var UserModel = require('../models/user');
var config = require('../config');

router.delete('/', function(req, res, next) {
  res.clearCookie(config.cookieName);
});

module.exports = router;