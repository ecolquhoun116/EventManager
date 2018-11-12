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
router.get('/feed', function(req, res, next) {
  res.render('feed', { title: 'Event Manager-feed' });
});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
router.get('/create-event', function(req, res, next) {
  // console.log( db.getAllEvents()); return all events in an array
  res.render('createEvent', { title: 'Event Manager' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.post('/submit-event', function(req, res, next) {
  let event = req.body;
  let emails = req.body['emails[]'];
  let id_event;

  if (!Array.isArray(emails)) {
    emails = [ emails];
  }

  try {
    db.insertEvent(event).then((id_event) => {
      for (let i = 0 ; i < emails.length; i++) { 
        mailer.senEmail(emails[i]);
        db.insertInvitate(id_event, emails[i]);
      }
    });
  } catch (e) {
    console.log(e);
  }
  
  res.render('api', { title: 'Event Manager' });
});

router.post('/login', function(req, res, next) {
	let event =req.body;
	db.userLogin(event).then((right_user)=>
	{
		if(right_user==true)
		{
			res.status(200).send(right_user);
		}else
		{
			res.status(200).send(right_user);
		}
	});
	
});
router.post('/register', function(req, res, next) {
	let event =req.body;
	db.registerUser(event).then((addUser)=>{
		if(addUser==true)
		{
			res.status(200).send(addUser);
		}else
		{
			res.status(200).send(addUser);
		}
	});

});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
router.get('/mail', function(req, res, next) {
  mailer.senEmail("");

  res.render('api', { title: 'Event Manager' });
});

router.get('/view-events', function(req, res, next) {
  res.render('feed', { title: 'View Events' });
});

module.exports = router;
