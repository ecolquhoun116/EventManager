var nodemailer = require('nodemailer');
var fs = require('fs');
var validator = require("email-validator");
 

function senEmail(destination) {
    let content;
    if ( validator.validate(destination)) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'eventmanager.cs5322@gmail.com',
                   pass: 'dicheva<3'
               }
           });
    
        fs.readFile('./mail/content.html', 'utf8', function(err, data) {  
        if (err) throw err;
            content = data;
            const mailOptions = {
                from: 'eventmanager.cs5322@gmail.com',
                to: destination ? destination : 'eventmanager.cs5322@gmail.com', 
                subject: 'Subject of your email',
                html: content
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                    console.log(err)
                else
                    console.log(info);
            });
        });
    }    
}


    module.exports = {
        senEmail
    }