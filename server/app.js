var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var log = require('loglevel');
var loglevelMessagePrefix = require('@natlibfi/loglevel-message-prefix');
var app = express();
var angularApp = express();

//var config = require("./config/config-node.js")

// Setup logging
// loglevelMessagePrefix(log);
// log.setLevel(config.loglevel);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});



//routes(app);

/*********************************************************************
* Routes
*********************************************************************/
var router = express.Router();
// router.use('/authenticate', require('./routes/auth_routes')());
router.use('/test', require('./routes/test')());  // To be moved in the autenticated route's section after testing

// Routes bellow this line are to be protected by security token
// var auth = require('./controllers/auth');
// router.use(auth.isAuthenticated);

// router.use('/client', require('./routes/client_routes')());
// router.use('/clientgroup', require('./routes/client_group_routes')());
app.use('/api', router);
// app.use('/', router);
var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

var angularServer = angularApp.listen(8088, function () {
    console.log('Angular running')
});

