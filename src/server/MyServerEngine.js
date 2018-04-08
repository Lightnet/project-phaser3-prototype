'use strict';

const nameGenerator = require('./NameGenerator');

import ServerEngine from 'lance/ServerEngine';
import PlayerAvatar from '../common/PlayerAvatar';
const NUM_BOTS = 3;

export default class MyServerEngine extends ServerEngine {

    constructor(io, gameEngine, inputOptions) {
        super(io, gameEngine, inputOptions);
        this.scoreData = {};
        
    }

    start() {
        super.start();
        console.log("start game?");
        //for (let x = 0; x < NUM_BOTS; x++) this.makeBot();
        this.gameEngine.initGame();
        
        //this.makeBot();
    }

    onPlayerConnected(socket) {
        super.onPlayerConnected(socket);

        let makePlayerShip = () => {
            let ship = this.gameEngine.makeShip(socket.playerId);
            console.log("create ship");
            this.scoreData[ship.id] = {
                kills: 0,
                //name: "guest"//nameGenerator('general')
                name: nameGenerator('general')
            };
            this.updateScore();
        };

        //makePlayerShip();

        // handle client restart requests
        socket.on('requestRestart', makePlayerShip);

    }

    onPlayerDisconnected(socketId, playerId) {
        super.onPlayerDisconnected(socketId, playerId);

        // iterate through all objects, delete those that are associated with the player (ship and missiles)
        let playerObjects = this.gameEngine.world.queryObjects({ playerId: playerId});
        playerObjects.forEach( obj => {
            this.gameEngine.removeObjectFromWorld(obj.id);
            // remove score associated with this ship
            delete this.scoreData[obj.id];
        });

        this.updateScore();
    }

    makeBot() {
        let bot = this.gameEngine.makeShip(0);
    }

    updateScore() {
        // delay so player socket can catch up
        setTimeout(() => {
            this.io.sockets.emit('scoreUpdate', this.scoreData);
        }, 1000);
    }
}
