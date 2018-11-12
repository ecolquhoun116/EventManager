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
  res.render('index', { title: 'Event Manager', home : true });
});

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Event Manager' });
});
router.get('/feed', isLoged, function(req, res, next) {
  res.render('feed', { title: 'Event Manager-feed' });
});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
router.get('/create-event', isLoged, function(req, res, next) {
  // console.log( db.getAllEvents()); return all events in an array
  res.render('createEvent', { title: 'Event Manager' });
});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.get('/profile', isLoged, function(req, res, next) {
  let sess = req.session;
  let email = "";
  if(sess.email) { 
    email = sess.email;
  }
  db.getUserByEmail(email).then((user) => {
    db.getMyCreatedEvents(user.uid).then((result_created) => {
      db.getParticipatingEvent(user.uid).then((result_participate) => {
        res.render('profile', { title: 'My profile', user : user, createdEvent : result_created, participateEvent : result_participate });
      })
    })
  });
});

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.post('/submit-event', isLoged, function(req, res, next) {
  let event = req.body;
  let emails = req.body['emails[]'];
  let sess = req.session;
  
  let user = sess.user;
  let id_event;

  if (!Array.isArray(emails)) {
    emails = [ emails];
  }

  try {
    db.insertEvent(event, user.uid).then((id_event) => {
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
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.post('/update', function(req, res, next) {
	let user = req.body;

});

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.post('/login', function(req, res, next) {
	let event =req.body;
	db.userLogin(event).then((right_user)=>
	{
		if(right_user==true)
		{
      var sess = req.session;
      sess.email=req.body.email;
      db.getUserByEmail(sess.email).then((user) => {
        sess.user = user;
  			res.status(200).send(right_user);
      }).catch(()=> {
        res.status(200).send(right_user);
      });
		}else
		{
			res.status(200).send(right_user);
		}
	});
	
});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

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

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
router.get('/logout', function(req, res, next) {
  req.session.destroy((err) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

router.get('/view-events', function(req, res, next) {
  res.render('feed', { title: 'View Events' });
});

function isLoged(req, res, next) {
  if ( !(req.session && req.session.user)) {
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports = router;
