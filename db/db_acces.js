var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wssurams",
  database: "event_scheduler",
  insecureAuth : true
  

});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function insertEvent(event, orgId) {
  return new Promise((resolve, reject) => {
    let insertedEvent;
    console.log(event);
    var sql = "insert into event (title, description, date_start, date_end, location, notes, public, etype, orgid) \
    values( '"+ event.title + "', '"+ event.description + "', '" + event.date_start + "', '"+ event.date_end + "',\
    '" + event.location + "', '" + event.note +"', '" + event.public + "', '"+ event["type[]"] + "', '"+ orgId+"');";
  
    db.query(sql, function (err, result) {
      if (err) throw err;
      insertedEvent = result && result.insertId ? result.insertId : -1;
      console.log("DB: 1 event inserted " + insertedEvent);
      resolve( insertedEvent);  
    });
  });
  
}
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getAllEvents() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM event", function (err, result, fields) {
      if (err) throw err;
      resolve(result);
    });
  });
}
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function insertInvitate(id_event, email, organizer_id = -1) {

  let insertedInvitation;
  getUserByEmail(email).then((user) => {

    if ( user && user.uid ) {
      var sql = "insert into invited (Useruid, Eventtid, organizer_id) \
      values( '"+ user.uid  + "', '"+ id_event + "', '" + organizer_id + "');";
    
      db.query(sql, function (err, result) {
        if (err) throw err;
        insertedInvitation = result  ? result.insertId : -1;
        console.log("DB: 1 invited inserted " + insertedInvitation);
    
      });
    } else console.log("DB: invitation insertion failed !");
  });

  

}

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    let user;
    let sql = "select * from user where email = '" + email + "'";
  
    db.query(sql, function (err, result) {
      if (err) throw err;
      user = result && result[0] ? result[0] : null;
      resolve(user);
    });
  })
}
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function registerUser(event)
{
	let email=event.email;
	return new Promise((resolve, reject) => {
	userLogin(event).then((hasUser)=>{
		var sql = "select * from user where email= '"+ event.email +"'";
		db.query(sql, function (err, result, fields) {
		user = result && result[0] ? result[0] : null;
		if (err) throw err;
		if(hasUser || user!=null &&(user.email===email))
		{
			resolve(false);
		}else
		{

			var sql = "insert into user (firstname, lastname, email, password, email_verified) \
			values('"+ event.firstname + "', '" + event.lastname + "','"+event.email+"', '"+ event.password + "', '"+0+"');";
			db.query(sql, function (err, result, fields) {
			if (err) throw err;
			resolve(true);});
			
		}
		});
	});

    });
}
function userLogin(event)
{
	return new Promise((resolve, reject) => {
	let isMember;
	if(event.email=="" || event.password=="") resolve(false);
	var sql = "select * from user where email= '"+ event.email +"' and password='"+event.password+"'";
    db.query(sql, function (err, result, fields) {
      if (err) throw err;
	  user = result && result[0] ? result[0] : null;
	  if(user==null ){
	  isMember=false;}
	  else
	  {	
		if((user.email===(event.email))&& (user.password===(event.password)))
			isMember=true;
	  }
	  resolve(isMember);
    });
  });
}

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getMyCreatedEvents(orgId)
{
	return new Promise((resolve, reject) => {
	var sql = "select * from event e where orgid = " + orgId;
    db.query(sql, function (err, result, fields) {
      if (err) throw err;      
      resolve(result);
    });
  });
}

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getParticipatingEvent(userId)
{
	return new Promise((resolve, reject) => {
	var sql = "select * from event e, participate p where p.eventtid = e.tid and p.useruid = " + userId;
    db.query(sql, function (err, result, fields) {
      if (err) throw err;      
      resolve(result);
    });
  });
}


module.exports = {
  registerUser,
  insertEvent,
  getAllEvents,
  insertInvitate,
  getUserByEmail,
  getMyCreatedEvents,
  getParticipatingEvent,
  userLogin
}