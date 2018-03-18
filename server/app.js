function define(constName, value) {
  //set property as const (read only)
  Object.defineProperty(global, constName, {
      value: value,
      writable: false
  });
}

global.reqlib = function (moduleNameRelativeToRoot) {
  return require(__dirname + moduleNameRelativeToRoot);
};

define("BASEPATH", __dirname);

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

//const index = require('./routes/index');
//const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* Security HTTP */
app.use(helmet.noCache());
app.use(helmet.frameguard({
    action: 'deny'
}));

app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());

const routes = require("./routes")(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

//Run New Web Server
const server = app.listen(app.port,
  function () {
      console.log(`Server been loaded on ${server.address().address}:${server.address().port}`);
  }
);

function _die() {
  console.log("Kill Server");
  process.exit(0);
}

//On restart Node from System Signal
//Linux
process.on("SIGTERM", _die);
process.on("SIGINT", _die);

//Windows CTRL+C and CTRL+BREAK Signals
process.on("SIGBREAK", _die); //Ctr+C
process.on("SIGHUP", _die); //Console Close

//System Error Event Node Server work and
process.on("uncaughtException", function (err) {
  //write to log
  console.log(err.message);
  console.log(err.stack);
});


// development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function (err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
      });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

module.exports = app;
