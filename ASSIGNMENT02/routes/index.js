var express = require('express');
var router = express.Router();

/* GET home page. */
// add the const lang so user can choose websites main language
router.get('/', function (req, res) {
    const lang = req.query.lang || 'en';
    let title = 'Home';
    if (lang === 'es') {
        title = 'Inicio';
    }
    res.render('index', {title: title, lang: lang});
});

// Category page
router.get('/categories', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Categories';
  if (lang === 'es') {
      title = 'Categorías';
  }
  res.render('categories', { title: title, lang: lang});
});
// Words page
router.get('/words', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Words';
  if (lang === 'es') {
      title = 'Palabras';
  }
  res.render('words', { title: title, lang: lang});
});
// phrases apge
router.get('/phrases', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Phrases';
  if (lang === 'es') {
      title = 'Frases';
  }
  res.render('phrases', { title: title, lang: lang});
});
// adding form page
router.get('/add', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Add';
  if (lang === 'es') {
      title = 'Agregar';
  }
  res.render('add', { title: title, lang: lang});
});
// all page
router.get('/all', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'All';
  if (lang === 'es') {
      title = 'Todo';
  }
  res.render('all', { title: title, lang: lang});
});


// get current URL
app.use((req, res, next) => {

    res.locals.currentUrl = req.originalUrl;
    res.locals.lang = req.query.lang || 'en';

    next();

});


module.exports = router;
