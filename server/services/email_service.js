var nodemailer = require('nodemailer'),
hbs = require('nodemailer-express-handlebars');

//var config = require('../config/config');

/*********************************************************
* Setup the common SMTP and Template parameters.
* Change with valid generic email address. 
*/
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



var options = {
    viewEngine: {
        helpers: {
            link: function (text, url) {
                // url = Handlebars.escapeExpression(url);
                // text = Handlebars.escapeExpression(text);
                
                // return new Handlebars.SafeString(
                //     "<a href='" + url + "'>" + text + "</a>"
                // );
                return "<a href='" + url + "'>" + text + "</a>";
            },
            // Helper used to alternate table rows style
            // everyOther: function (index, amount, scope) {
            //     if ( ++index % amount) 
            //         return scope.inverse(this);
            //     else 
            //         return scope.fn(this);
            // },
            cycle: function(index) {
                index = index % (arguments.length - 2); // -2 to leave out `index` and the final argument HB adds
                return arguments[index + 1];
            }
        },
        extname: '.hbs',
        // layoutsDir: 'views/email/'//,
        // defaultLayout : 'template',
        // partialsDir : 'views/partials/'
    },
    viewPath: 'views/email/',
    extName: '.hbs'
};


/**
* PciMailer class to simplify email sending with a template
*/

function PciMailer(template) {
    
    console.log('Inside the Mailer constructor');
    this.template = template;
    
    this.transporter = nodemailer.createTransport(smtpConfig);
    this.transporter.use('compile', hbs(options));
    
    // To be overited in the send method with the user envelope properties
    this.mailOptions = {
        from: '"Topnet System" <topnet@intensite.ca>', // sender address
        to: '', // list of receivers
        subject: 'No subject', // Subject line
        template: this.template,
        context: {}
    };
}

PciMailer.prototype.send = function (envelope, data) {
    
    console.log('Inside the Mailer send method...');
    this.mailOptions.to = envelope.to;
    this.mailOptions.subject = envelope.subject;
    this.mailOptions.context = data;
    
    // send mail with defined transport object
    this.transporter.sendMail(this.mailOptions, function (error, info) {
        if (error) {
            console.log('Error occured: ' + error);
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        return 'Message sent: ' + info.response;
    });
};

module.exports = {
    PciMailer: PciMailer
}


/** 
 * Sample usage
 * 
 */
// parkingPassPrompt: function (req, res) {
//     EmployeeFactory.getOneById(req.query.id).then(function (result) {
//         console.log(result.attributes);
//         data = {
//             month: req.month,
//             year: req.year,
//             employee_id: result.attributes.id,
//             email: result.attributes.email
//         }
//         var mailer = new PciMailer('parking_pass_prompt');
//         if (config.environment == 'PROD') {
            
//             mailer.send({ to: data.email, subject: 'Passe de stationnement' }, data);
//             res.status(250).json({ ok: true });
//         }
//         else {
//             res.status(304).json({ ok: true });
//         }
//     });
// }
