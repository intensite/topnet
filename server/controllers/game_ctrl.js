var gameService = require('../services/game_service');
var log = require('loglevel');
//const _ = require("lodash");


module.exports = {
    name: "Game",
  
    list: function(req, res, next) {
        // console.log('Inside controller..')
       gameService.getAll(req.query).then(function(games) {
         res.send(games);
       })
    },
    get: function (req, res, next) {
        var id = req.params.id;
        gameService.getOneById(id).then(function(games) {
            res.send(games);
          })
    },
    update: function (req, res, next) {
        var id = req.params.id;
        var values = req.body
        gameService.update(id,values).then(function(games) {
            res.send(games);
          }).catch((err) => {
            console.log(`Error in game_ctrl::update()`);
            log.error(`Database UPDATE problems ${err}`);
            res.status(400).send(`Database UPDATE problems ${err}`);
        })
    }

}
  