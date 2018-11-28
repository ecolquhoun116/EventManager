var nodemailer = require('nodemailer');
var fs = require('fs');
var validator = require("email-validator");
 

function senEmail(destination, event) {
    let content;

    // check if the email is valid email
    if ( validator.validate(destination)) {
        // add gmail credentials
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'eventmanager.cs5322@gmail.com',
                   pass: 'dicheva<3'
               }
           });

        // Get the content of the template email
        fs.readFile('./mail/content.html', 'utf8', function(err, data) {  
            if (err) console.log(err);
            else {
                content = data;
                const mailOptions = {
                    from: 'eventmanager.cs5322@gmail.com',
                    to: destination ? destination : 'eventmanager.cs5322@gmail.com', 
                    subject: 'You have been invited to ' + event.title + ' !',
                    html: '<html><h1>You have been invited to ' + event.title + ' !</h1> \
                    <p> comme check on event manager ;)</p>\
                    <p>You have to log to join the event now !</p>\
                    <h2>See you soon  8) xoxo</h2>'
                };

                // Now send email
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err) console.log(err)
                    else console.log("EMAIL : invitation sent to " + destination);
                });
            }
            
        });
    }
}


    module.exports = {
        senEmail
    }