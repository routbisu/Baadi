// =========================================================================================
// Email helper to send out emails from Zoho server
// =========================================================================================

const appConfig = require('../config/init/appConfig');
const util = require('util');
const nodemailer = require('nodemailer');

let zohoTransporter = nodemailer.createTransport({
    host: appConfig.EmailConfig.EmailHostName,
    port: appConfig.EmailConfig.EmailPort,
    secure: true, 
    auth: {
        user: appConfig.EmailConfig.DefaultEmailUser,   
        pass: appConfig.EmailConfig.DefaultEmailPassword       
    }
});

let mailer = {
    
    SendEmail: function(emailTo, emailSubject, emailText, emailIsHTML = false) {
        let emailFromText = util.format('"%s" <%s>', appConfig.EmailConfig.DefaultFromEmailFrom, 
            appConfig.EmailConfig.DefaultFromEmail);
            
        let mailOptions = {
            from: emailFromText,    
            to: emailTo,
            subject: emailSubject
        };

        if(emailIsHTML) {
            mailOptions.html = emailText;
        }
        else {
            mailOptions.text = emailText;
        }

        // Return a promise object
        return new Promise(function (resolve, reject) {
            zohoTransporter.sendMail(mailOptions, function (error, info) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(info);
                }
            });
        });
    }
}

module.exports = mailer;