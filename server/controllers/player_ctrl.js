var playerService = require('../services/player_service');
var log = require('loglevel');
//const _ = require("lodash");


module.exports = {
    name: "Player",

    list: async function (req, res, next) {
        const players = await playerService.getAll();
        res.send(players);
    },

    get: async function (req, res, next) {
        var id = req.params.id;
        console.log(`Inside player::get(${id})`);
        const player = await playerService.getOneById(id);
        res.send(player);
    },

    update: async function (req, res, next) {
        var id = req.params.id;
        var values = req.body
        try {
            const players = await playerService.update(id, values)
            res.send(players);
        } catch (err) {
            console.log(`Error in player_ctrl::update()`);
            log.error(`Database UPDATE problems ${err}`);
            res.status(400).send(`Database UPDATE problems ${err}`);
        }
    }

}
