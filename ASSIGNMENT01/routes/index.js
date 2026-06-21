var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* home paeg */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

/* about me page */
router.get('/about', function(req, res) {
  res.render('about', { title: 'About Me' });
});

/* projects page */
router.get('/projects', function(req, res) {
  res.render('projects', { title: 'Projects' });
});

/* contact paeg */
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;
