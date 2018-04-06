'use strict';

import ServerEngine from 'lance/ServerEngine';
import PlayerAvatar from '../common/PlayerAvatar';

export default class MyServerEngine extends ServerEngine {

    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);
    }

    start() {
        super.start();
        console.log("start game?");

        this.gameEngine.initGame();

        //this.players = {
            //player1: null,
            //player2: null
        //};

        this.makeBot();
    }

    onPlayerConnected(socket) {
        super.onPlayerConnected(socket);

        let makePlayerShip = () => {
            let ship = this.gameEngine.makeShip(socket.playerId);
            console.log("create ship");
            //this.scoreData[ship.id] = {
                //kills: 0,
                //name: "guest"//nameGenerator('general')
            //};
            //this.updateScore();
        };

        //makePlayerShip();

        // handle client restart requests
        //socket.on('requestRestart', makePlayerShip);



        // attach newly connected player an available paddle
        //if (this.players.player1 === null) {
            //this.players.player1 = socket.id;
            //this.gameEngine.paddle1.playerId = socket.playerId;
        //} else if (this.players.player2 === null) {
            //this.players.player2 = socket.id;
            //this.gameEngine.paddle2.playerId = socket.playerId;
        //}
    }

    onPlayerDisconnected(socketId, playerId) {
        super.onPlayerDisconnected(socketId, playerId);

        //if (this.players.player1 == socketId) {
            //console.log('Player 1 disconnected');
            //this.players.player1 = null;
        //} else if (this.players.player2 == socketId) {
            //console.log('Player 2 disconnected');
            //this.players.player2 = null;
        //}
    }

    makeBot() {

        let bot = this.gameEngine.makeShip(0);

    }
}
