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

import Renderer from './PhaserRenderer';

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
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            },
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

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }
    //Phaser
    create(){
        super.create();
        this.add.image(400, 300, 'sky');

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
    }
    //Phaser
    update(){
        super.update();
    }

    draw() {
        super.draw();
    }

    addObject(obj) {
        super.addObject(obj);


    }

    removeObject(obj) {
        super.removeObject(obj);


    }

}
