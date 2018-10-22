var express = require('express');
var router = express.Router();
// var db = require("../db/db_acces")

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
module.exports = router;
