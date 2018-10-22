var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "event_scheduler",
  insecureAuth : true

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});