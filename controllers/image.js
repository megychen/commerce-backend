var express = require('express');
var router = express.Router();

module.exports.upload = function(req, res, next) {
  var filePath = '/' + req.file.path;

  res.json({success: true, filePath: filePath})
};