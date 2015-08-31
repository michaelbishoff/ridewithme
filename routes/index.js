var express = require('express');
var twilio = require('twilio');
var router = express.Router();
var Parse = require('parse').Parse;

Parse.initialize("nQg6GAgEFvN69KWpPn4HDx27KIu7e3wwIF2ziJqr", "rdEIZgA6De7NUEVyV4oGfKvWLTwSxKOds61f0WEl");

var Ride = Parse.Object.extend('RidePath');

/* GET home page. */
router.get('/', function(req, res, next) {
    var query = new Parse.Query(Ride);
    query.descending('createdAt');
    query.find().then(function(results) {
        console.log(JSON.stringify(results, null, 2));
        res.render('home', {rides: results});
    });
});


router.get('/test', function(req, res, next) {
  res.render('index');
});

router.get('/map', function(req, res, next) {
  res.render('map');
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/shirley', function(req, res, next) {
  res.render('shirley');
});

router.get('/ride/:objectId', function(req, res, next) {
   res.render('ride', {rideId : req.params.objectId});
});

router.get('/twilio', function(req, res, next) {
//    var client = new twilio.RestClient('', '');
//    console.log(req.query['message']);
//    
//    client.sms.messages.create({
//        to:'+<number>',
//        from:'+<number>',
//        body:req.query['message']
//    }, function(error, message) {
//        // The HTTP request to Twilio will run asynchronously. This callback
//        // function will be called when a response is received from Twilio
//        // The "error" variable will contain error information, if any.
//        // If the request was successful, this value will be "falsy"
//        if (!error) {
//            // The second argument to the callback will contain the information
//            // sent back by Twilio for the request. In this case, it is the
//            // information about the text messsage you just sent:
//            console.log('Success! The SID for this SMS message is:');
//            console.log(message.sid);
//
//            console.log('Message sent on:');
//            console.log(message.dateCreated);
//        } else {
//            console.log('Oops! There was an error.');
//        }
//    });
});


module.exports = router;
