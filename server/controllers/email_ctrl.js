const log = require('loglevel');
const _ = require("lodash");
const PciMailer = require("../services/email_service").PciMailer;
var playerService = require('../services/player_service');
var gameService = require('../services/game_service');
var jwt = require('jsonwebtoken');

const secret = "storeThisSecretInAConfigFile"

module.exports = {
    sedmailToRegularPlayers: async function (req, res) {

        console.log('Inside email controller...');

        const gameId = 3;
        const playerStatusId = 2;

        var players = await gameService.getGamePlayersAvailability(gameId, playerStatusId)

        // log.debug(players)

        /*** UNCOMMENT THE FOREACH LOOP IN PRODUCTION */
        // _.forEach(players, function(player){
        //     if(player.game_player_status == null) {
        //         log.debug(`Sending email to ${player.name} at ${player.email}`)

                var yesLinkEncoded = {};
                yesLinkEncoded.userId = 1;
                yesLinkEncoded.gameId = 1;
                yesLinkEncoded.userAnswer = 'yes';
                yesLinkEncoded.expiry = new Date(new Date('2018/08/31').getTime() + 24 * 60 * 60 * 1000);
                log.debug(yesLinkEncoded);
                var token = jwt.sign(yesLinkEncoded, secret);

                console.log("http://localhost:3000/api/email/confirmation/" + token);

                data = {
                    player_name: 'Stephen Remillard',
                    season_game_no: 1,
                    game_date: '2018/08/31',
                    start_time: '22:00',
                    email: 'stephenr70@gmail.com',
                }

                var mailer = new PciMailer('game_confirmation');
                mailer.send({ to: data.email, subject: 'Hockey' }, data);
                res.status(200).send("Message sent...");
        //     }
        // });


    },

    confirmationHandler: function (req, res) {
        console.log('Inside confirmationHandler...')
        var token = req.params.token;
        var data = jwt.decode(token, secret);
        console.log(new Date(data.expiry));
        console.log(new Date());
        if (new Date(data.expiry) > new Date()) {

            console.log(data);

            // TODO:  Save player's response into DB

        } else {
            console.log("Link is expired");
            res.json({ error: "Link is expired" });
        }
    }
}