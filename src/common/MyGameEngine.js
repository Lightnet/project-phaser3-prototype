'use strict';

import TwoVector from 'lance/serialize/TwoVector';
//import Paddle from './Paddle';
//import Ball from './Ball';

import Ship from './Ship';

const PADDING = 20;
const WIDTH = 400;
const HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 50;

import GameEngine from 'lance/GameEngine';
import SimplePhysicsEngine from 'lance/physics/SimplePhysicsEngine';
import PlayerAvatar from './PlayerAvatar';

export default class MyGameEngine extends GameEngine {

    constructor(options) {
        super(options);
        this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this });
    }

    registerClasses(serializer) {
        //serializer.registerClass(Paddle);
        //serializer.registerClass(Ball);
        serializer.registerClass(Ship);
    }

    start() {

        super.start();

        this.on('postStep', () => { 
            //this.postStepHandleBall(); 
        });
        this.on('objectAdded', (object) => {
            //if (object.class === Ball) {
                //this.ball = object;
            //} else if (object.playerId === 1) {
                //this.paddle1 = object;
            //} else if (object.playerId === 2) {
                //this.paddle2 = object;
            //}
        });
    }

    initGame() {

        // create the paddle objects
        //this.addObjectToWorld(new Paddle(this, null, { position: new TwoVector(PADDING, 0), playerId: 1 }));
        //this.addObjectToWorld(new Paddle(this, null, { position: new TwoVector(WIDTH - PADDING, 0), playerId: 2 }));
        //this.addObjectToWorld(new Ball(this, null, { position: new TwoVector(WIDTH /2, HEIGHT / 2) }));

        //this.addship();
        console.log("init game!");
    }

    addship(playerId){
        let ship = new Ship(this, null, {position: new TwoVector(5, 5)});
        ship.playerId = playerId;
        this.addObjectToWorld(ship);
        console.log(`ship added: ${ship.toString()}`);
        return ship;
    }

    makeShip(playerId){
        let ship = new Ship(this, null, {position: new TwoVector(200, 200)});
        ship.playerId = playerId;
        this.addObjectToWorld(ship);
        console.log(`ship added: ${ship.toString()}`);
        return ship;
    }

    postStepHandleBall() {
        /*
        if (!this.ball)
            return;
        
        // CHECK LEFT EDGE:
        if (this.ball.position.x <= PADDING + PADDLE_WIDTH &&
            this.ball.position.y >= this.paddle1.y && this.ball.position.y <= this.paddle1.position.y + PADDLE_HEIGHT &&
            this.ball.velocity.x < 0) {

            // ball moving left hit player 1 paddle
            this.ball.velocity.x *= -1;
            this.ball.position.x = PADDING + PADDLE_WIDTH + 1;
        } else if (this.ball.position.x <= 0) {

            // ball hit left wall
            this.ball.velocity.x *= -1;
            this.ball.position.x = 0;
            console.log(`player 2 scored`);
        }

        // CHECK RIGHT EDGE:
        if (this.ball.position.x >= WIDTH - PADDING - PADDLE_WIDTH &&
            this.ball.position.y >= this.paddle2.position.y && this.ball.position.y <= this.paddle2.position.y + PADDLE_HEIGHT &&
            this.ball.velocity.x > 0) {

            // ball moving right hits player 2 paddle
            this.ball.velocity.x *= -1;
            this.ball.position.x = WIDTH - PADDING - PADDLE_WIDTH - 1;
        } else if (this.ball.position.x >= WIDTH ) {

            // ball hit right wall
            this.ball.velocity.x *= -1;
            this.ball.position.x = WIDTH - 1;
            console.log(`player 1 scored`);
        }

        // ball hits top
        if (this.ball.position.y <= 0) {
            this.ball.position.y = 1;
            this.ball.velocity.y *= -1;
        } else if (this.ball.position.y >= HEIGHT) {
            // ball hits bottom
            this.ball.position.y = HEIGHT - 1;
            this.ball.velocity.y *= -1;
        }
        */
    }

    processInput(inputData, playerId) {

        super.processInput(inputData, playerId);

        // get the player ship tied to the player socket
        let playerShip = this.world.queryObject({
            playerId: playerId,
            instanceType: Ship
        });
        //console.log(playerShip.position);
        //console.log(inputData.input);

        if (playerShip) {
            if (inputData.input == 'up') {
                playerShip.isAccelerating = true;
                playerShip.showThrust = 5; // show thrust for next steps.
                //console.log(playerShip);
            } else if (inputData.input == 'right') {
                playerShip.isRotatingRight = true;
            } else if (inputData.input == 'left') {
                playerShip.isRotatingLeft = true;
            } else if (inputData.input == 'space') {
                console.log("fire missile");
                //this.makeMissile(playerShip, inputData.messageIndex);
                //this.emit('fireMissile');
            }
        }

        // get the player paddle tied to the player socket
        //let playerPaddle = this.world.queryObject({ playerId });
        //if (playerPaddle) {
            //if (inputData.input === 'up') {
                //playerPaddle.position.y -= 5;
            //} else if (inputData.input === 'down') {
                //playerPaddle.position.y += 5;
            //}
        //}
    }
}
