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
    }

}
  