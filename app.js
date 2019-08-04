const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


let app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Database connection
require('./lib/connectMongoose');


// Routes API
// Variables
const advertRouter = require('./routes/api/advert');
const tagRouter = require('./routes/api/tag');
const apiPath = '/api-v1';

app.use(apiPath + '/adverts', advertRouter);
app.use(apiPath + '/tags', tagRouter);


// Routes Web App
// Variables
const indexRouter = require('./routes/index');
const advertsRouter = require('./routes/advert');

app.use('/adverts', advertsRouter);
app.use('/', indexRouter);


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(error, req, res, next) {
  // Check validation error
  if ( error.array ) {
    error.status = 422;
    const errInfo = error.array({ onlyFirstError : true })[0];
    error.message = isAPI(req) ?
      { message : 'Not valid', error : error.mapped() } :
      `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }
  
  res.status(error.status || 500);

  if ( isAPI(req) ) {
    res.json({ success : false, error : error.message });
    return;
  }

  // Set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // Render the error page
  res.render('error');
});



// Aux functions...


/**
 * Aux function that checks if current request has been sent to the API
 * @param req Request object
 * @param apiPath API string on the URL (eg. /apiv)
 */
function isAPI( req ) {
  return req.originalUrl.indexOf(apiPath) === 0;
}


module.exports = app;
