var config =  require('../config');
var UserModel = require('../models/user');

module.exports.adminRequired = (req, res, next) => {
  // 此处需要传user_id做判断
  var authToken = req.cookies[config.cookieName] || '';
  var isAdmin = JSON.parse(authToken)['isAdmin']

  if (!authToken) {
    var err = new Error('需要登录');
    err.status = 403;
    next(err);
    return;
  }

  if (!isAdmin) {
    var err = new Error('需要管理员权限');
    err.status = 403;
    next(err);
    return;
  }

  next();
};