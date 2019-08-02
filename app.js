const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const utils = require('./utils/utils');

// Routes variables
const indexRouter = require('./routes/index');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes API
const apiPath = '/api-v';
const apiVersion = '1';
const apiUri = apiPath + apiVersion;

// app.use(apiUri + '/loquesea', 'routeFile');

// Routes Web App
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // check validation error
  if ( err.array ) {
    err.status = 422;
    const errInfo = err.array({ onlyFirstError : true })[0];
    err.message = utils.isAPI(req, apiPath) ?
      { message : 'Not valid', error : err.mapped() } :
      `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }
  
  res.status(err.status || 500);

  if ( utils.isAPI(req, apiPath) ) {
    res.json({ success : false, error : err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});


module.exports = app;
