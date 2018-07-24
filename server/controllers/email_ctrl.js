const log = require('loglevel');
const _ = require("lodash");
const moment = require("moment");
const PciMailer = require("../services/email_service").PciMailer;
var playerService = require('../services/player_service');
var gameService = require('../services/game_service');
var jwt = require('jsonwebtoken');

const secret = "storeThisSecretInAConfigFile"
var confirmationUrl = "http://localhost:3000/api/email/confirmation/";

module.exports = {
    sedmailToRegularPlayers: async function (req, res) {

        console.log('Inside email controller...');

        const gameId = 3;
        const playerStatusId = 2;

        var players = await gameService.getGamePlayersAvailability(gameId, playerStatusId)
        var gameInfo = await gameService.getOneById(gameId)

        log.debug(players)
        log.debug(gameInfo)

        _.forEach(players, (player) => {
            if (player.game_player_status == null) {
                log.debug(`Sending email to ${player.name} at ${player.email}`)

                var encodedLink = {};
                encodedLink.playerId = player.id;
                encodedLink.playerName = player.name;
                encodedLink.gameId = gameId;
                log.debug(`gameInfo.game_date = ${gameInfo.game_date}`);
                encodedLink.expiry = new moment(gameInfo.game_date).endOf('day');

                encodedLink.userAnswer = 'yes';
                var yesToken = jwt.sign(encodedLink, secret);

                encodedLink.userAnswer = 'no';
                var noToken = jwt.sign(encodedLink, secret);

                log.debug(encodedLink);
                //console.log(confirmationUrl + yesToken);

                data = {
                    player_name: player.name,
                    season_game_no: gameInfo.season_game_no,
                    game_date: gameInfo.game_date,
                    start_time: gameInfo.start_time,
                    email: player.email,
                    yesConfirmationLink: confirmationUrl + yesToken,
                    noConfirmationLink: confirmationUrl + noToken,
                }

                var mailer = new PciMailer('game_confirmation');
                mailer.send({ to: data.email, subject: 'Hockey' }, data);
            }
        });

        res.status(200).send("Messages sent...");


    },

    confirmationHandler: function (req, res) {
        console.log('Inside confirmationHandler...')
        var token = req.params.token;

        // invalid token - synchronous
        try {
            var data = jwt.verify(token, secret);

            console.log(new Date(data.expiry));
            console.log(new Date());
            if (new Date(data.expiry) > new Date()) {

                console.log(data);

                // TODO:  Save player's response into DB
                const GPA = gameService.setGamePlayersAvailability(data.playerId, data.gameId, data.userAnswer=='yes' ? 1 : 0 )

                // Maybe we could send the answer using a nice handlebar template.
                res.status(200).send(`Merci ${data.playerName} pour votre réponse!...`);

            } else {
                console.log("Link is expired");
                res.json({ error: "Link is expired" });
            }
        } catch (err) {
            console.log("Invalid Token");
            res.json({ error: "Invalid Token" });
        }
    }
}