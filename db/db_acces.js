var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wssurams",
  database: "eventmanager",
  insecureAuth : true
  

});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function insertEvent(event) {
  return new Promise((resolve, reject) => {
    let insertedEvent;
    var sql = "insert into event (title, description, date_start, date_end, location, notes, public, etype) \
    values( '"+ event.title + "', '"+ event.description + "', '" + event.date_start + "', '"+ event.date_end + "',\
    '" + event.location + "', '" + event.note +"', '" + event.public + "', '"+ event.type + "');";
  
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
	return new Promise((resolve, reject) => {
	var sql = "insert into users (email, firstname, lastname, password) \
    values( '"+ event.email + "', '"+ event.firstname + "', '" + event.lastname + "', '"+ event.password + "');";
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
  getUserByEmail
}