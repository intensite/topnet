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
        var sql = 'select pl.*, pos.name_fr as position, pos.abreviation_fr as position_abrv from players pl inner join positions pos on pl.position_id = pos.id'


        return db.query(sql).then(([rows, fields]) => {
            // console.log(rows);
            return rows;
        })
    },
    getOneById: function(id) {
        
        return db.query('select * from players where id = ?', id).then(([rows, fields]) => {
            // console.log(rows);
            return rows;
        })
    },

    update: function(id, values) {        
        return db.query('UPDATE players SET ? where id = ?', [values, id]).then(([rows, fields]) => {
            return rows;
        }).catch((err) => {
            console.log(`Error in player_service::update()`);
            console.log(`Database UPDATE problems ${err}`);
            throw new Error(err);
        })
    }    
}