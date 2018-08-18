var express = require('express');
var auth = require('./middlewares/auth');
var post = require('./controllers/post');
var user = require('./controllers/user');
var company = require('./controllers/company');
var multer  = require('multer');
var postsUpload = multer({ dest: 'uploads/posts/' });
var companyUpload = multer({ dest: 'uploads/company/' });

var router = express.Router();

/* GET posts lists */
router.get('/posts', post.more);

/* GET one post */
router.get('/posts/:id', post.one);

/* POST create post */
router.post('/posts', auth.adminRequired, postsUpload.single('postImg'), post.create);

/* PATCH edit post */
router.patch('/posts/:id', auth.adminRequired, postsUpload.single('postImg'), post.update);

/* DELETE edit post */
router.delete('/posts/:id', auth.adminRequired, post.delete);

/* GET companies lists */
router.get('/companies', company.more);

/* GET one company */
router.get('/companies/:id', company.one);

/* POST create company */
router.post('/companies', auth.adminRequired, companyUpload.single('postImg'), company.create);

/* PATCH edit company */
router.patch('/companies/:id', auth.adminRequired, companyUpload.single('postImg'), company.update);

/* DELETE edit company */
router.delete('/companies/:id', auth.adminRequired, company.delete);

/* POST signup user */
router.post('/signup', user.signup);

/* POST signin user */
router.post('/signin', user.signin);

module.exports = router;