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

        var sql = `select * from v_games`;

        const possibleParams =["league_id", "season_id", "location_id", "game_date"];
        var existingParams =[];

        if(filters && _.size(filters)) {
            existingParams = possibleParams.filter(field => filters[field]);
        }
    
        if (existingParams.length) {
            sql += " WHERE ";
            sql += existingParams.map(field => `${field} = ?`).join(" AND ");
        }

        sql += " order by season_game_no"
    
        log.debug(filters);
        log.debug(existingParams);
        log.debug(sql);

        return db.query(sql,existingParams.map(field => filters[field]) ).then(([rows, fields]) => {
            return rows;
        })
    },

    getOneById: function(id) {        
        return db.query('select * from v_games where id = ?', id).then(([rows, fields]) => {
            return rows[0];
        })
    },

    update: function(id, values) {        
        return db.query('UPDATE games SET ? where id = ?', [values, id]).then(([rows, fields]) => {
            return rows;
        }).catch((err) => {
            console.log(`Error in game_service::update()`);
            console.log(`Database UPDATE problems ${err}`);
            throw new Error(err);
        })
    },

    getGamePlayersAvailability: function(game_id, player_status) {
        
        var sql = `select P.id, P.name, P.email, P.status, PGA.id as pga_id, player_id, game_id, game_player_status  from players P 
        Left join player_game_availability PGA
        on P.id = PGA.player_id and PGA.game_id = ?`;
        
        if (player_status) {
            sql += " WHERE P.status = ?";
        }                    
        
        log.debug(sql);
        
        return db.query(sql,[game_id,player_status]).then(([rows, fields]) => {
            return rows;
        })            
    },
    
    setGamePlayersAvailability: function(player_id, game_id, player_status) {
        return db.query('REPLACE INTO player_game_availability (player_id, game_id, game_player_status) VALUES (?, ?, ?)', [player_id, game_id, player_status]).then(([rows, fields]) => {
            return rows;
        }).catch((err) => {
            console.log(`Error in game_service::setGamePlayersAvailability()`);
            console.log(`Database UPDATE problems ${err}`);
            throw new Error(err);
        })
    },
}