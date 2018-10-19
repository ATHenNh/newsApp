
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
var fs = require('fs');

var router = express.Router();


var app = express();
var URL = 'http://webhose.io/filterWebContent?token=69551d38-da84-40ac-92fd-e01027170578&format=json&sort=crawled&q=site%3Acnetfrance.fr';

/*request(URL, function (error,response,body){
  fs.writeFile("./last_data.json", body, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  }); 
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode);
})*/
let rawdata = fs.readFileSync('last_data.json');  
let student = JSON.parse(rawdata);
console.log(student.posts[0]);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', { student : student,rawdata:rawdata,title : 'hoho World' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
