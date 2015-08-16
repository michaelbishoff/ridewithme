var express = require('express');
var router = express.Router();
var Parse = require('parse').Parse;

Parse.initialize("nQg6GAgEFvN69KWpPn4HDx27KIu7e3wwIF2ziJqr", "rdEIZgA6De7NUEVyV4oGfKvWLTwSxKOds61f0WEl");

var Ride = Parse.Object.extend('RidePath');

/* GET home page. */
router.get('/home', function(req, res, next) {
    var query = new Parse.Query(Ride);
    query.descending('createdAt');
    query.find().then(function(results) {
        console.log(results);
        res.render('home', {rides: results});
    });
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

router.get('/ride/:objectId', function(req, res, next) {
   res.render('ride', {rideId : req.params.objectId});
});


module.exports = router;
