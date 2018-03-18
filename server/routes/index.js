// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const express = require('express');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');
//const passport = require('passport');
const bcrypt = require('bcrypt');
const fileUpload = require('express-fileupload');

/* Controllers */
const main = require('../controllers/main');
const alarms = require('../controllers/alarms');

module.exports = function (app) {

  // Global var
  global.isDev = 'development' == app.get('env') ? true : false;

  app.use(favicon(path.join(BASEPATH, 'public', 'favicon.png')));
  //Expose public_media to the world
  app.use("/public", express.static("public"));

  //app.use(filterIp(app));

  //Use logger
  app.use(logger('dev'));

  //Init session
  app.use(session({
    secret: "TDkQMPtx#*]8`M6J", //secret key for create session
    resave: true,
    saveUninitialized: true
  }));

  //Populate cookies into req.cookie
  app.use(cookieParser());

  //POST type request
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  //JSON type request
  app.use(bodyParser.json());

  // Passport init
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.use(passport.authenticate('remember-me'));

  // Connect Flash
  app.use(flash());


  // Global Vars
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

  // default options
  app.use(fileUpload());

  //Use routers
  app.use("/", main);
  app.use("/alarms", alarms);
  //app.use("/backoffice", backoffice);

};