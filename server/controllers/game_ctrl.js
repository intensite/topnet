var gameService = require('../services/game_service');
var log = require('loglevel');
//const _ = require("lodash");


module.exports = {
    name: "Game",

    list: function (req, res, next) {
        gameService.getAll(req.query).then(function (result) {
            res.send(result);
        })
    },

    get: function (req, res, next) {
        var id = req.params.id;
        gameService.getOneById(id).then(function (result) {
            res.send(result);
        })
    },

    update: function (req, res, next) {
        var id = req.params.id;
        var values = req.body
        gameService.update(id, values).then(function (result) {
            res.send(result);
        }).catch((err) => {
            log.error(`Error in ${name}_ctrl::update()`);
            log.error(`Database UPDATE problems ${err}`);
            res.status(400).send(`Database UPDATE problems ${err}`);
        })
    }

}
