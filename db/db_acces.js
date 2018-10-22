var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "event_scheduler",
  insecureAuth : true

});
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function connectToDB() {
  if(db.state === 'disconnected'){
    db.connect(function(err) {
      if (err) throw err;
      console.log("DB Connected!");
    });
  }  
}
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function insertEvent(event) {
  connectToDB();

  var sql = "insert into event (title, description, date_start, date_end, location, notes, public, etype) \
  values( '"+ event.title + "', '"+ event.description + "', '" + event.date_start + "', '"+ event.date_end + "',\
  '" + event.location + "', '" + event.note +"', '" + event.public + "', '"+ event.type + "');";

  db.query(sql, function (err, result) {
    if (err) throw err;
    let insertedEvent = result ? (result.insertId ? result.insertId : -1) : -1;
    console.log("DB: 1 event inserted " + insertedEvent);

  });
}
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function getAllEvents() {
  connectToDB();

  db.query("SELECT * FROM event", function (err, result, fields) {
    if (err) throw err;
    return result;
  });
}
/*  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports = {
  insertEvent,
  getAllEvents
}