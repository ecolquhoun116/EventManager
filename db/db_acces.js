var mysql = require('mysql');

var db = mysql.createConnection({
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "b14dbbb037c751",
  password: "8dff0205",
  database: "heroku_b9b56dc76d38df1",
  insecureAuth : true
  

});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function handleDisconnect(db_connection) {
  db_connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    db = mysql.createConnection(db_connection.config);
    handleDisconnect(db);
    db.connect();
  });
}


/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function insertEvent(event, orgId) {
  return new Promise((resolve, reject) => {
    handleDisconnect(db);
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
    handleDisconnect(db);
    db.query("SELECT * FROM event", function (err, result, fields) {
      if (err) throw err;
      resolve(result);
    });
  });
}

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getInvitedEvent(userId) {
  return new Promise((resolve, reject) => {
    handleDisconnect(db);
    db.query("SELECT e.title, e.date_end, e.date_end, e.etype, e.location, e.notes, e.orgid, e.public, e.tid, e.description FROM event e, user u, invited i where i.useruid = u.uid and i.eventtid = e.tid and u.uid = " + userId, function (err, result, fields) {
      if (err) throw err;
      resolve(result);
    });
  });
}
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function insertInvitate(id_event, email, organizer_id = -1) {

  handleDisconnect(db);
  let insertedInvitation;
  getUserByEmail(email).then((user) => {
      if (  user && user.uid ) {
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

function insertJoin(id_event, email ) {

  let insertedInvitation;
  handleDisconnect(db);

  getUserByEmail(email).then((user) => {
    getParticipatingEvent(user.uid).then((eventsParticipate) => {
      let exist = eventsParticipate.some((events) => { return events.tid == id_event});
      if ( !exist &&  user && user.uid ) {
        var sql = "insert into participate (Useruid, Eventtid) \
        values( '"+ user.uid  + "', '"+ id_event + "');";
        try {
          db.query(sql, function (err, result) {
            if (err) throw err;
            insertedInvitation = result  ? result.insertId : -1;
            console.log("DB: 1 participate inserted " + insertedInvitation);
        
          });

      } catch (exception) {
        console.log(exception);
      }
    } else if ( exist && user && user.uid){
      var sql = "delete from participate where ( Useruid ='"+user.uid+"') and ( Eventtid ='"+id_event+"')";
      db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("DB: 1 participate deleted " + insertedInvitation);    
      });
    } else console.log("DB: invitation insertion failed !");
    });
  });
}

/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getUserByEmail(email) {
  handleDisconnect(db);
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

function registerUser(event) {
  handleDisconnect(db);

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
function userLogin(event){

	return new Promise((resolve, reject) => {
  handleDisconnect(db);

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
  handleDisconnect(db);

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
  handleDisconnect(db);

	var sql = "select * from event e, participate p where p.eventtid = e.tid and p.useruid = " + userId;
    db.query(sql, function (err, result, fields) {
      if (err) throw err;      
      resolve(result);
    });
  });
}
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function searchEvent(eventName)
{
	return new Promise((resolve, reject) => {
  handleDisconnect(db);

	var sql = "select * from event e where e.title like '%" + eventName +"%'";
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
  getInvitedEvent,
  insertInvitate,
  getUserByEmail,
  getMyCreatedEvents,
  getParticipatingEvent,
  userLogin,
  insertJoin,
  searchEvent
}