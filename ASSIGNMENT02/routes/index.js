var express = require('express');
var router = express.Router();
const passport = require("passport");
const User = require("../models/user")
const Project = require("../models/project");


// Authentification ROutes

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
    if (error.name === "UserExisitsError"){
      message = "Username already exists";
    }
    // send error not crsah
    return res.render("register", {
      title: "Register",
      error: error.message
    });
  }
});

// log out - referred to lesson08 code but added my lang
router.get("/logout", (req, res, next) => {
    const lang = req.query.lang || "en";
    req.logout((err) => {
        res.redirect("/?lang=" + lang);
    });
});

// Github - lesson08 code
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user.email"] })
);
router.get(
  "/github/callback", 
  passport.authenticate(
    "github", 
    { successRedirect: "/categories", 
      failureRedirect: "/login"
    }
  )
);


// CRUD
// adding form page (create)
router.get('/add', async function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Add';
  if (lang === 'es') {
      title = 'Agregar';
  }
  res.render('add', { title: title, lang: lang});
});router.post('/add', async function(req, res, next) {
  const lang = req.query.lang || 'en';
  try{
    const newEntry = new Project({
      // create new entry
      firstEntry: req.body.firstEntry,
      secondEntry: req.body.secondEntry,
      language: req.body.lang,
      usage: req.body.usage,
      category: req.body.category,
      type: req.body.type,
      note: req.body.note
    });
    await newEntry.save();
  } catch (error){
    console.log(error);
    let message = "Failed to add entry";
    let title = 'Add';
    if (lang === 'es') {
      title = 'Agregar';
    }
    return res.render("add", {title, error: error.message, lang: lang});
  }
  res.redirect("/all");
 });

 // update/edit
router.get("/edit/:id", async function(req, res, next) {
  const entry = await Project.findById(req.params.id);
  res.render("edit", { title: "Edit", entry, lang: req.query.lang || 'en'});
});

router.post("/edit/:id", async function(req, res, next) {
  // lesson08 code used
  try{
    const project = await Project.findByIdAndUpdate(req.params.id);
    project.firstEntry = req.body.firstEntry;
    project.secondEntry = req.body.secondEntry;
    project.usage = req.body.usage;
    project.category = req.body.category;
    project.type = req.body.type;
    project.note = req.body.note;
    await project.save();
  } catch (error){
      // tab filled out code
      console.log(error);
  }
      res.redirect("/all");
});

 // delete
 router.get("/delete/:id", async function(req, res, next) {
  try{
    // fidn id and await for it to be deleted
    await Project.findByIdAndDelete(req.params.id);
  } catch (error){
    //log error
    console.log(error);
  }
  res.redirect("/all");
 });


// Pages

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