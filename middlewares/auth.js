module.exports.adminRequired = (req, res, next) => {
  // 此处需要传user_id做判断
  if (!req.user) {
    var err = new Error('需要登录');
    err.status = 403;
    next(err);
    return;
  }

  if (!req.user.isAdmin) {
    var err = new Error('需要管理员权限');
    err.status = 403;
    next(err);
    return;
  }

  next();
};