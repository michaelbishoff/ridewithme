var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ffmpeg = require('fluent-ffmpeg');
var mkdirp = require('mkdirp');
//var Parse = require('parse').Parse;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/createframes/:name', function(req, res, next) {
  mkdirp(path.join(__dirname, '..', 'public', 'frames', req.body.unique_name), function(err) {
    req.body.frameData.forEach(function(frame) {
      data.file = data.file.split(',')[1];
      var buffer = new Buffer(data.file, 'base64');
      fs.writeFileSync(
        __dirname + '/../public/' + '/frames/' + req.body.unique_name + '/frame-' + data.frame + '.png', 
        buffer.toString('binary'), 'binary');
    });
  });
});

app.get('/createvideo/:name', function(req, res, next) {
  var video = ffmpeg(path.join(__dirname, 'public', 'frames', req.params.name, 'frame-%d.png'))
    .fps(10)
    .mergeToFile(path.join(__dirname, 'public', 'videos', req.params.name + '.mp4'))
    .on('end', function() {
      console.log('file has been converted succesfully');
      res.json({"message": "file successfully converted"});
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
