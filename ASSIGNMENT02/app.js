require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');

// load mongoose adn global config
var mongoose = require('mongoose');
var configs = require('./configs/globals');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

const passport = require("passport");
const session = require("express-session");
var User = require('./models/user');
var githubStrategy = require("passport-github2").Strategy;

var app = express();

// switch language from en to es
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure passport module https://www.npmjs.com/package/express-session
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false
}));

// PASSPORT
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
// Link passport to the user model
passport.use(User.createStrategy());
// configure github strategy
passport.use(new githubStrategy(
  // options object
  {
    clientID: configs.Authentication.GitHub.ClientId,
    clientSecret: configs.Authentication.GitHub.ClientSecret,
    callbackURL: configs.Authentication.GitHub.CallbackURL
  },
  // callback function
  // profile is github profile
  async (accessToken, refreshToken, profile, done) => {
    // search user by ID
    const user = await User.findOne({ oauthId: profile.id });
    // user exists (returning user)
    if (user) {
      // no need to do anything else
      return done(null, user);
    }
    else {
      // new user so register them in the db
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github',
        created: Date.now()
      });
      // add to DB
      const savedUser = await newUser.save();
      // return
      return done(null, savedUser);
    }
  }
));
// Set passport to write/read user data to/from session object
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// get url and verify user logged in
app.use((req, res, next) => {

    res.locals.currentUrl = req.originalUrl;
    res.locals.lang = req.query.lang || 'en';
    res.locals.user = req.user || null;
    next();

});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// connect to MongoDB using Mongoose
mongoose
.connect(configs.ConnectStrings.MongoDB)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB: ', error));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
