var nodemailer = require('nodemailer');
var fs = require('fs');
var validator = require("email-validator");
 

function senEmail(destination) {
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
                    subject: 'Subject of your email',
                    html: content
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