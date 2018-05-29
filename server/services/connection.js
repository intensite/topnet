var mysql = require('mysql2/promise');
var config = require('../config.js');
var log = require('loglevel');


var DB;

exports.DBConnect = function () {
    return new Promise(function (resolve, reject) {

        // If DB is already set, return it
        if (DB) {
            return resolve(DB);
        }

        var dbconfig = config.db 

        // create the connection to database
        mysql.createConnection({
            host: dbconfig.host,
            user: dbconfig.user,
            password : dbconfig.password,
            database: dbconfig.database,
        }).then((conn) => {
            log.info(`Database connection established to mysql://${dbconfig.host}/${dbconfig.database}`);
            DB = conn;
            resolve(DB);
        }).catch((err) => {
            console.log(`Database connection problems ${err}`);
            reject(err);
        })
    })
};
