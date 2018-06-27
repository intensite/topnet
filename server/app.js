var express = require("express");
var bodyParser = require("body-parser");
var log = require('loglevel');
var loglevelMessagePrefix = require('@natlibfi/loglevel-message-prefix');
var app = express();
var angularApp = express();
var path = require('path')
var config = require("./config.js")

// Setup logging
loglevelMessagePrefix(log);
log.setLevel(config.loglevel);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

/*********************************************************************
* Routes
*********************************************************************/
var router = express.Router();

app.route("/").get(function (req, res) {
    res.status(200).send("Welcome to our restful API");
});

// router.use('/authenticate', require('./routes/auth_routes')());
router.use('/player', require('./routes/player_routes')());  // To be moved in the autenticated route's section after testing
router.use('/game', require('./routes/game_routes')());  // To be moved in the autenticated route's section after testing

// Routes bellow this line are to be protected by security token
// var auth = require('./controllers/auth');
// router.use(auth.isAuthenticated);

// router.use('/client', require('./routes/client_routes')());
// router.use('/clientgroup', require('./routes/client_group_routes')());

// Prefix the router routes with /api
app.use('/api', router);

/*********************************************************************
* Start the servers (API & Angular client)
*********************************************************************/
var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
angularApp.use(express.static(path.join(__dirname, 'dist/topnet')));
var angularServer = angularApp.listen(8088, function () {
    console.log('Angular running')
});

