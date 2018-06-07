var playerService = require('../services/player_service');
var log = require('loglevel');
//const _ = require("lodash");


module.exports = {
    name: "Player",
  
    list: function(req, res, next) {
        // console.log('Inside controller..')
       playerService.getAll().then(function(players) {
         res.send(players);
       })
    },
    get: function (req, res, next) {
        var id = req.params.id;
        playerService.getOneById(id).then(function(player) {
            res.send(player);
          })
    },

    update: function (req, res, next) {
        var id = req.params.id;
        var values = req.body
        playerService.update(id,values).then(function(players) {
            res.send(players);
          }).catch((err) => {
            console.log(`Error in player_ctrl::update()`);
            log.error(`Database UPDATE problems ${err}`);
            res.status(400).send(`Database UPDATE problems ${err}`);
        })
    }

}
  