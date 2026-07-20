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

// PASSPORT - lesson08 https://github.com/eduardojaime/COMP2068JavaScriptFrameworks/blob/master/lesson08/app.js 
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
// configure github strategy
passport.use(new githubStrategy(
  {
    clientID: configs.Authentication.GitHub.ClientId,
    clientSecret: configs.Authentication.GitHub.ClientSecret,
    callbackURL: configs.Authentication.GitHub.CallbackURL
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ oauthId: profile.id });
    if (user) {
      return done(null, user);
    }
    else {
      // new user, register them in the db
      const newUser = new User({
        username: profile.username,
        oauthId: profile.id,
        oauthProvider: 'Github',
        created: Date.now()
      });
      const savedUser = await newUser.save();
      return done(null, savedUser);
    }
  }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// get url and verify user logged in
app.use((req, res, next) => {

    res.locals.currentUrl = req.path;
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
.connect(configs.ConnectStrings.MongoDB, { serverSelectionTimeoutMS: 5000 })
.then(() => console.log('Connected to MongoDB'))
.catch(async(error) => {
  console.error('Error connecting to MongoDB: ', error);
  // backup connect strng : https://mongoosejs.com/docs/connections.html#multiple_connections
  try{
    // clear failed connection and try to connect to non SRV link (my wifi router does not support SRV)
    await mongoose.disconnect();

    mongoose
    .connect(configs.ConnectStrings.MongoDBBackup)
    .then(() => console.log('Connected to MongoDB Backup'))
    .catch((backupError) => console.error('Error connecting to MongoDB & the MongoDB Backup: ', backupError));
  } catch (disconnectError){
    console.error("Failed to clean up failed connection to MongoDB: ", disconnectError);
  }
});

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
