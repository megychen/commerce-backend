var express = require('express');
var auth = require('./middlewares/auth');
var post = require('./controllers/post');
var user = require('./controllers/user');
var company = require('./controllers/company');

var router = express.Router();

/* GET posts lists */
router.get('/posts', post.more);

/* GET one post */
router.get('/posts/:id', post.one);

/* POST create post */
router.post('/posts', auth.adminRequired, post.create);

/* PATCH edit post */
router.patch('/posts/:id', auth.adminRequired, post.update);

/* DELETE edit post */
router.delete('/posts/:id', auth.adminRequired, post.delete);

/* GET companies lists */
router.get('/companies', post.more);

/* GET one company */
router.get('/companies/:id', company.one);

/* POST create company */
router.post('/companies', auth.adminRequired, company.create);

/* PATCH edit company */
router.patch('/companies/:id', auth.adminRequired, company.update);

/* DELETE edit company */
router.delete('/companies/:id', auth.adminRequired, company.delete);

/* POST signup user */
router.post('/signup', user.signup);

/* POST signin user */
router.post('/signin', user.signin);

module.exports = router;