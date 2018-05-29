var mysql = require('mysql2');
var log = require('loglevel');
var conn = require('./connection');
//const _ = require("lodash");

// database connect
var db;

conn.DBConnect().then(dbconn => {
    db = dbconn;
})
.catch(err => {
    console.log(err)
});

module.exports = {
    getAll: function (filters) {

        return db.query('select * from players').then(([rows, fields]) => {
            // console.log(rows);
            return rows;
        })
    },
    getOneById: function(id) {
        
        return db.query('select * from players where id = ?', id).then(([rows, fields]) => {
            // console.log(rows);
            return rows;
        })
    }
}