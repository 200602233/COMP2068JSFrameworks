var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Category page
router.get('/categories', function(req, res, next) {
  res.render('categories', { title: 'Express' });
});
// Words page
router.get('/words', function(req, res, next) {
  res.render('words', { title: 'Express' });
});
// phrases apge
router.get('/phrases', function(req, res, next) {
  res.render('phrases', { title: 'Express' });
});
// adding form page
router.get('/add', function(req, res, next) {
  res.render('add-form', { title: 'Express' });
});
module.exports = router;
