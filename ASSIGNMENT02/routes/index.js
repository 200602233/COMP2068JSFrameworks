var express = require('express');
var router = express.Router();
const passport = require("passport");
const User = require("../models/user")
const Project = require("../models/project");


// Login
router.get('/login', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Login';
  if (lang === 'es') {
      title = 'Iniciar sesión';
  }
  // Handle validation messages from failed login attempts
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', { title: title, lang: lang, messages: messages});
});
// based off of lesson08 of demos from github
router.post('/login', passport.authenticate("local",  {
  successRedirect: "/categories",
  failureRedirect: "/login",
  failureMessage: "Invalid Login"
}));

// Register
router.get('/register', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Register';
  if (lang === 'es') {
      title = 'Registrarse';
  }
  res.render('register', { title: title, lang: lang});
});
//post - based on lesson08 code
router.post('/register', async (req, res, next) =>{
  try{
    const user = await User.register(
      new User({
        username: req.body.username,
        email: req.body.email
      }),
      req.body.password,
    );
    req.login(user, (err) =>{
      if (err){
        console.log(err);
        return res.redirect("/register");
      }
      return res.redirect("/");
    });
  } catch (error){
    console.log(error);
    let message = "Registration failed";
    if(err.name === "UserExisitsError"){
      message = "Username already exists";
    }
    // send error not crsah
    return res.render("register", {
      title: "Register",
      error: error.message
    });
  }
});


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
router.get('/words', async function(req, res, next) {
  const lang = req.query.lang || 'en';
  const words = await Project.find({type: "Words"});
  let title = 'Words';
  if (lang === 'es') {
      title = 'Palabras';
  }
  res.render('words', { title: title, lang: lang, words});
});

// phrases apge
router.get('/phrases', async function(req, res, next) {
  const lang = req.query.lang || 'en';
  const words = await Project.find({type: "Phrases"});
  let title = 'Phrases';
  if (lang === 'es') {
      title = 'Frases';
  }
  res.render('phrases', { title: title, lang: lang, words});
});

// adding form page
router.get('/add', async function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Add';
  if (lang === 'es') {
      title = 'Agregar';
  }
  const newEntry = new Project({

        firstWord: req.body.firstWord,
        secondWord: req.body.secondWord,
        pronunciation: req.body.pronunciation,
        usage: req.body.usage,
        category: req.body.category,
        type: req.body.type,
        note: req.body.note

    });

    await newEntry.save();
    res.redirect("/all");
  res.render('add', { title: title, lang: lang});
});

// all page
router.get('/all', async function(req, res, next) {
  const lang = req.query.lang || 'en';
  const words = await Project.find();
  let title = 'All';
  if (lang === 'es') {
      title = 'Todo';
  }
  res.render('all', { title: title, lang: lang, words});
});



module.exports = router;
