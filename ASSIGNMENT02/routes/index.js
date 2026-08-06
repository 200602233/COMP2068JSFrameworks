var express = require('express');
var router = express.Router();
const passport = require("passport");
const User = require("../models/user")
const Project = require("../models/project");

// Authentification ROutes
const ensureAuthenticated = require("../extensions/authentication");


// Login
router.get('/login', function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Rosita - Login';
  if (lang === 'es') {
      title = 'Rosita - Iniciar sesión';
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
  let title = 'Rosita - Register';
  if (lang === 'es') {
      title = 'Rosita - Registrarse';
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
      title: "Rosita - Register",
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
router.get('/add', ensureAuthenticated, async function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Rosita - Add';
  if (lang === 'es') {
      title = 'Rosita - Agregar';
  }
  res.render('add', { title: title, lang: lang});
});router.post('/add', ensureAuthenticated, async function(req, res, next) {
  const lang = req.query.lang || 'en';
  try{
    const newEntry = new Project({
      // create new entry
      firstEntry: req.body.firstEntry,
      secondEntry: req.body.secondEntry,
      language: req.body.lang,
      user: req.user._id,
      usage: req.body.usage,
      category: req.body.category,
      type: req.body.type,
      note: req.body.note
    });
    await newEntry.save();
  } catch (error){
    console.log(error);
    let message = "Failed to add entry";
    let title = 'Rosita - Add';
    if (lang === 'es') {
      title = 'Rosita - Agregar';
    }
    return res.render("add", {title, error: error.message, lang: lang});
  }
  res.redirect("/all");
 });

 // update/edit
router.get("/edit/:id", ensureAuthenticated, async function(req, res, next) {
  const entry = await Project.findById(req.params.id);
  const lang = req.query.lang || 'en';
  let title = 'Rosita - Edit Entry';
    if (lang === 'es') {
      title = 'Rosita - Editar Entrada';
    }
  res.render("edit", { title: title, entry, lang: req.query.lang || 'en'});
});

router.post("/edit/:id", ensureAuthenticated, async function(req, res, next) {
  // lesson08 code used
  try{
    const project = await Project.findByIdAndUpdate(req.params.id);
    project.firstEntry = req.body.firstEntry;
    project.secondEntry = req.body.secondEntry;
    project.language = req.body.lang;
    project.user= req.user._id;
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
 router.get("/delete/:id", ensureAuthenticated, async function(req, res, next) {
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
    let title = 'Rosita - Home';
    if (lang === 'es') {
        title = 'Rosita - Inicio';
    }
    res.render('index', {title: title, lang: lang});
});

// Category page
router.get('/categories', ensureAuthenticated, function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Rosita - Categories';
  if (lang === 'es') {
      title = 'Rosita - Categorías';
  }
  res.render('categories', { title: title, lang: lang});
});

// Words page
router.get('/words', ensureAuthenticated, async function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Rosita - Words';
  if (lang === 'es') {
      title = 'Rosita - Palabras';
  }
  const search = req.query.search || '';
  console.log(search);
  let s = {
    //shows word saved inputs only
    type: "Word"
  };
  // regex: https://www.mongodb.com/docs/manual/reference/operator/query/regex/ 
  // example I used
  // { <field>: { $regex: /pattern/, $options: '<options>' } }
// { "<field>": { "$regex": "pattern", "$options": "<options>" } }
// { <field>: { $regex: /pattern/<options> } }
  if(search){
    s = {
      $or: [
        {firstEntry : {$regex: search, $options: "i"}},
        {secondEntry : {$regex: search, $options: "i"}},
        {category : {$regex: search, $options: "i"}},
        {type : {$regex: search, $options: "i"}},
        {usage : {$regex: search, $options: "i"}},
        {note : {$regex: search, $options: "i"}}
      ]
    }
  }
  console.log(s);
  const words = await Project.find(s);
  console.log(words);
  res.render('words', { title: title, lang: lang, words, search});
});

// phrases apge
router.get('/phrases', ensureAuthenticated, async function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Rosita - Phrases';
  if (lang === 'es') {
      title = 'Rosita - Frases';
  }
  const search = req.query.search || '';
  let s = {
    //shwos phrase saved inputs only
    type: "Phrase"
  };
  // regex: https://www.mongodb.com/docs/manual/reference/operator/query/regex/ 
  // example I used
  // { <field>: { $regex: /pattern/, $options: '<options>' } }
// { "<field>": { "$regex": "pattern", "$options": "<options>" } }
// { <field>: { $regex: /pattern/<options> } }
  if(search){
    s = {
      $or: [
        {firstEntry : {$regex: search, $options: "i"}},
        {secondEntry : {$regex: search, $options: "i"}},
        {category : {$regex: search, $options: "i"}},
        {type : {$regex: search, $options: "i"}},
        {usage : {$regex: search, $options: "i"}},
        {note : {$regex: search, $options: "i"}}
      ]
    }
  }
  const words = await Project.find(s);
  res.render('phrases', { title: title, lang: lang, words, search});
});
// all page
router.get('/all', ensureAuthenticated, async function(req, res, next) {
  const lang = req.query.lang || 'en';
  let title = 'Rosita - All';
  if (lang === 'es') {
      title = 'Rosita - Todo';
  }

  const search = req.query.search || '';
  let s = {};
  // regex: https://www.mongodb.com/docs/manual/reference/operator/query/regex/ 
  // example I used
  // { <field>: { $regex: /pattern/, $options: '<options>' } }
// { "<field>": { "$regex": "pattern", "$options": "<options>" } }
// { <field>: { $regex: /pattern/<options> } }
  if(search){
    s = {
      $or: [
        {firstEntry : {$regex: search, $options: "i"}},
        {secondEntry : {$regex: search, $options: "i"}},
        {category : {$regex: search, $options: "i"}},
        {type : {$regex: search, $options: "i"}},
        {usage : {$regex: search, $options: "i"}},
        {note : {$regex: search, $options: "i"}}
      ]
    }
  }
  const words = await Project.find(s);
  res.render('all', { title: title, lang: lang, words, search});
});


// info pages (read only)
// about
router.get('/about', function(req, res, next){
  const lang = req.query.lang || 'en';
  let title = 'Rosita - About'
  if (lang === 'es'){
    title = 'Rosita - Acerca de'
  }
  res.render('about', {title: title, lang});
});

// contact
router.get('/contact', function(req, res, next){
  const lang = req.query.lang || 'en';
  let title = 'Rosita - Contact'
  if (lang === 'es'){
    title = 'Rosita - Contacto'
  }
  res.render('contact', {title: title, lang});
});
router.post('/contact', function(req, res, next){
  const lang = req.query.lang || 'en';
  res.redirect('/?lang=' + lang);
});


module.exports = router;