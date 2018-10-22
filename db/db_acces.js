var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "event_scheduler",
  insecureAuth : true

});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

function insertEvent(event) {
  db.connect(function(err) {
    if (err) throw err;
    var sql = "insert into event (title, description, date_start, date_end, location, notes, public, etype) \
    values( '"+ event.title+"', '"+ event.description+"', '"+ event.date_start+"', '"+ event.date_end+"',\
    '"+ event.location+"', '"+ event.note+"', "+ event.public+", '"+ event.type+"');";
    console.log(sql);
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}

module.exports = {
  insertEvent
}