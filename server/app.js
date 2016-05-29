(function() {

  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  var app = express();

  // set configurations
  app.set('json spaces', 2);

  // use Middleware
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());

  /**
   * Routes
   */
  var router = require('./router')(app);

  /**
   * Development Settings
   */
  if (app.get('env') === 'development') {

    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client')));

    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));
    app.use(express.static(path.join(__dirname, '../client/app')));

    // // Redirect user to base url if url doesn't exists
    // // refrence html5Mode(params)
    // app.use(function(req, res, next) {
    //   var regNum = new RegExp("\d{1,}");
    //
    //   if (req.url == '/views') {
    //     next();
    //   }
    //   if (req.url == '/views' + regNum) {
    //     next();
    //   }
    //
    //   res.redirect('/');
    // });

    // Error Handling
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  /**
   * Production Settings
   */
  if (app.get('env') === 'production') {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // // Redirect user to base url if url doesn't exists
    // // refrence html5Mode(params)
    // app.use(function(req, res, next) {
    //   if (req.url == '/views') {
    //     next();
    //   }
    //   if (req.url == '/views/[0-9]{1,20}/') {
    //     next();
    //   }
    //
    //   res.redirect('/');
    // });

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  }

  module.exports = app;

})();
