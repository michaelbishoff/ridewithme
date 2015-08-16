var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/list', function(req, res, next) {
  res.render('list');
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/ride', function(req, res, next) {
   res.render('ride', {rideId : "3SxhEeyL0n"});
});


module.exports = router;
