var express = require('express');
var auth = require('./middlewares/auth');
var post = require('./controllers/post');
var user = require('./controllers/user');
var company = require('./controllers/company');
var entrepreneur = require('./controllers/entrepreneur');
var multer  = require('multer');
var postsUpload = multer({ dest: 'uploads/posts/' });
var companyUpload = multer({ dest: 'uploads/company/' });
var entrepreneurUpload = multer({ dest: 'uploads/entrepreneur/' });

var image= require('./controllers/image');
var imageUpload = multer({ dest: 'uploads/markdown/' });

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

/* DELETE edit entrepreneur */
router.delete('/companies/:id', auth.adminRequired, company.delete);

/* GET entrepreneur lists */
router.get('/entrepreneurs', entrepreneur.more);

/* GET one entrepreneur */
router.get('/entrepreneurs/:id', entrepreneur.one);

/* POST create entrepreneur */
router.post('/entrepreneurs', auth.adminRequired, entrepreneurUpload.single('avatar'), entrepreneur.create);

/* PATCH edit entrepreneur */
router.patch('/entrepreneurs/:id', auth.adminRequired, entrepreneurUpload.single('avatar'), entrepreneur.update);

/* DELETE edit entrepreneur */
router.delete('/entrepreneurs/:id', auth.adminRequired, entrepreneur.delete);

/* GET user lists */
router.get('/users', auth.adminRequired, user.more);

/* PATCH edit user */
router.patch('/users/:id', auth.adminRequired, user.update);

/* PATCH edit user password */
router.patch('/users/:id/reset', auth.adminRequired, user.reset);

/* GET user information */
router.get('/auth/:id', user.auth);

/* POST signup user */
router.post('/signup', user.signup);

/* POST signin user */
router.post('/signin', user.signin);

/* POST image */
router.post('/image', imageUpload.single('imgFile'), image.upload)

module.exports = router;