/*
    Information: Test Build
*/

'use strict';

import isNode from 'detect-node'
if (!isNode) {                                                                                                                                                                                        
    //require('phaser');
    require('phaser/dist/phaser');
    //require('phaser/dist/phaser-arcade-physics');
}
//import 'phaser';
import Utils from './../common/Utils';
import Renderer from './PhaserRenderer';

import Ship from '../common/Ship';

export default class MyRenderer extends Renderer {

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.sprites = {};

        //Phaser config game 
        //this.config = {};

        this.config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            //physics: {
                //default: 'arcade',
                //arcade: {
                    //gravity: { y: 200 }
                //}
            //},
            scene: {
                preload: this.preload,
                create: this.create
            }
        };
        
        //console.log(this);
    }
    //Phaser
    preload(){
        super.preload();
        this.load.setBaseURL('http://localhost:3000/');
        this.load.image('ship', 'assets/sprites/asteroids_ship.png');
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }
    //Phaser
    create(){
        super.create();
        //console.log("create");
        //console.log(this);
        //this.add.image(400, 300, 'sky');

        /*
        var particles = this.add.particles('red');
    
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        
        var logo = this.physics.add.image(400, 100, 'logo');
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        emitter.startFollow(logo);
        */
    }
    //Phaser
    update(){
        super.update();
    }

    draw() {
        super.draw();
        //console.log("draw?");

        let now = Date.now();

        for (let objId of Object.keys(this.sprites)) {
            let objData = this.gameEngine.world.objects[objId];
            let sprite = this.sprites[objId];

            if (objData) {
                sprite.x = objData.position.x;
                sprite.y = objData.position.y;
            }

            if (objData instanceof Ship){
                //sprite.actor.shipContainerSprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
                sprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
            } else{
                if(this.gameEngine.world.objects[objId] !=null){
                    sprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
                }
            }

            if (sprite) {
                // object is either a Pixi sprite or an Actor. Actors have renderSteps
                if (sprite.actor && sprite.actor.renderStep) {
                    sprite.actor.renderStep(now - this.elapsedTime);
                }
            }
        }

        this.elapsedTime = now;
    }

    addObject(obj) {
        super.addObject(obj);
        console.log("renderer add object");
        //console.log(obj);
    }

    removeObject(obj) {
        super.removeObject(obj);
        //console.log(this.sprites);
        //console.log(obj);
        //console.log("renderer remove object");
        //this.sprites[obj.id].destroy();
        //delete this.sprites[obj.id];
    }

    addPlayerShip(sprite) {
        this.playerShip = sprite;
        /*
        document.body.classList.remove('lostGame');
        if (!document.body.classList.contains('tutorialDone')){
            document.body.classList.add('tutorial');
        }
        document.body.classList.remove('lostGame');
        document.body.classList.add('gameActive');
        document.querySelector('#tryAgain').disabled = true;
        document.querySelector('#joinGame').disabled = true;
        document.querySelector('#joinGame').style.opacity = 0;
        */

        this.gameStarted = true; // todo state shouldn't be saved in the renderer
    }

    removeOffscreenIndicator(objData) {
        //let indicatorEl = document.querySelector('#offscreenIndicator'+objData.id);
        //if (indicatorEl && indicatorEl.parentNode)
            //indicatorEl.parentNode.removeChild(indicatorEl);
    }

    updateHUD(data){

    }

    updateScore(data){


    }

}
