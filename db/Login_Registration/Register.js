var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wssurams',
  database: 'EventManager',
  insecureAuth : true
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login#',function(req,res){
  var first_name=req.body.firstname;
  var last_name=req.body.lastname;
  var email=req.body.email;
  var password=req.body.password;
  console.log(email);
	con.connect(function(err) {
	if (err) throw err;
		var sql="INSERT INTO users (email,firstname, lastname, password) VALUES ('"+email+"', '"+first_name+"', '"+last_name+"', '"+password+"')"
		con.query(sql, function(err, result)
		{
			if (err) throw err;
			console.log("1 record inserted, ID: " + result.insertId);
		});
		con. close;
	  });
  res.end("yes");
});



