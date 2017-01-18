var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');

//new
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

var jwt = require('jwt-simple');
// var LocalStrategy = require('passport-local'),Strategy;
var db = require('./config/db');

var app = express(); 
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('server listening on port %d in %s mode', port, app.get('env'));
});

app.use(passport.initialize());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');
// app.set('view engine', 'jade');

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// models config
var modelsPath = path.join(__dirname, 'model');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// api config
var apiPath = path.join(__dirname, 'api');
fs.readdirSync(apiPath).forEach(function(file) {
  app.use('/api', require(apiPath + '/' + file));
});


require('./config/passport')(passport);


module.exports = app;
