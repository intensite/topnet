var mysql = require('mysql2');
var log = require('loglevel');
var conn = require('./connection');
const _ = require("lodash");

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

        var sql = "SELECT * from games ";
        const possibleParams =["league_id", "season_id", "location_id", "game_date"];
        var existingParams =[];

        if(filters && _.size(filters)) {
            existingParams = possibleParams.filter(field => filters[field]);
        }
    
        if (existingParams.length) {
            sql += " WHERE ";
            sql += existingParams.map(field => `${field} = ?`).join(" AND ");
        }
    
        log.debug(filters);
        log.debug(existingParams);
        log.debug(sql);

        return db.query(sql,existingParams.map(field => filters[field]) ).then(([rows, fields]) => {
            // console.log(rows);
            return rows;
        })
    },
    getOneById: function(id) {        
        return db.query('select * from games where id = ?', id).then(([rows, fields]) => {
            // console.log(rows);
            return rows;
        })
    },
    update: function(id, values) {        
        return db.query('UPDATE games SET ? where id = ?', [values, id]).then(([rows, fields]) => {
            // console.log(rows);
            return rows;
        }).catch((err) => {
            console.log(`Error in game_service::update()`);
            console.log(`Database UPDATE problems ${err}`);
            throw new Error(err);
            // return err;
        })
    }
}