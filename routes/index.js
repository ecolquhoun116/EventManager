var express = require('express');
var router = express.Router();
var db = require("../db/db_acces");
var mailer = require('../mail/mail');

/* GET home page. 
When the user go on the root on the website
We render the template index (from views directory)
And we pass in parameter to the page the variable title.
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Event Manager' });
});

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Event Manager' });
});

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
router.get('/create-event', function(req, res, next) {
  // console.log( db.getAllEvents()); return all events in an array

  res.render('createEvent', { title: 'Event Manager' });
});

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.post('/submit-event', function(req, res, next) {
  var event = req.body;
  var emails = req.body['emails[]'];
  if (!Array.isArray(emails)) {
    emails = [ emails];
  }
  for (let i = 0 ; i < emails.length; i++) { 
    mailer.senEmail(email);
  }
  db.insertEvent(event);
  res.render('api', { title: 'Event Manager' });
});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
router.get('/mail', function(req, res, next) {
  mailer.senEmail("");

  res.render('api', { title: 'Event Manager' });
});

module.exports = router;
