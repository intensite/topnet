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
    getAll: async function (filters) {
        var sql = 'select pl.*, pos.name_fr as position, pos.abreviation_fr as position_abrv from players pl inner join positions pos on pl.position_id = pos.id'

        const possibleParams =["status", "position_id", "name", "skill_points"];
        var existingParams =[];

        if(filters && _.size(filters)) {
            existingParams = possibleParams.filter(field => filters[field]);
        }
    
        if (existingParams.length) {
            sql += " WHERE ";
            sql += existingParams.map(field => `${field} = ?`).join(" AND ");
        }

        sql += " order by name"

        log.debug(filters);
        log.debug(existingParams);
        log.debug(sql);

        try {
            console.log('Before the query..');
            const [result] = await db.query(sql,existingParams.map(field => filters[field]) )
            console.log('The wait is over..');
            return result;

        } catch (err) {
            return err;
        }
    },
    
    getOneById: async function (id) {
        const [result] = await db.query('select * from players where id = ?', id)
        return result[0];
    },

    update: async function (id, values) {
        try {
            const [result] = await db.query('UPDATE players SET ? where id = ?', [values, id]);
            return result;
        } catch (err) {
            console.log(`Error in player_service::update()`);
            console.log(`Database UPDATE problems ${err}`);
            throw new Error(err);
        }
    }
}