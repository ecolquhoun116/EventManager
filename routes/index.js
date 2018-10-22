var express = require('express');
var router = express.Router();
var db = require("../db/db_acces")

/* GET home page. 
When the user go on the root on the website
We render the template index (from views directory)
And we pass in parameter to the page the variable title.
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Event Manager' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Event Manager' });
});

router.get('/create-event', function(req, res, next) {
  res.render('createEvent', { title: 'Event Manager' });
});

router.post('/submit-event', function(req, res, next) {
  var event = req.body;
  var emails;
  // TODO: cannot get the emails of all the people, return 'emails[]' as a key
  // console.log(event);
  // console.log(emails);
  for (var key in req.body) {
    if ( key == 'emails[]') {
      emails = req.body[key];
    }
  }
  db.insertEvent(event);
  res.render('api', { title: 'Event Manager' });
});
module.exports = router;
