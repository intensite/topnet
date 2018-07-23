const log = require('loglevel');
const _ = require("lodash");
const nodemailer = require("nodemailer");

var smtpConfig = {
    host: 'smtp.bellnet.ca',
    port: 25,
    secure: false, // use SSL
    // auth: {
    //     user: 'user@gmail.com',
    //     pass: 'pass'
    // }
        tls: {
            rejectUnauthorized: false
        }
};

// var smtpConfig = {
//     host: 'relais.videotron.ca',
//     port: 587,
//     secure: false, // use SSL
//     auth: {
//         user: 'pci_system@videotron.ca',
//         pass: 'pci85246'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// };


module.exports = {
    sedmail: function (req, res) {

        console.log('Inside email controller...');

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport(smtpConfig);

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Topnet System" <jupiter@intensite.ca>', // sender address
            to: 'sremillard@pciauto.com', // list of receivers
            subject: 'Test email', // Subject line
            text: 'Hello world 🐴', // plaintext body
            html: '<b>Hello world 🐴</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(403).send(error);
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.status(200).send("Message sent...");
        });
    }
}