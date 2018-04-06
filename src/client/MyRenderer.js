'use strict';

import isNode from 'detect-node'
if (!isNode) {                                                                                                                                                                                        
    //require('phaser');
    require('phaser/dist/phaser');
}
//import 'phaser';
//import Renderer from 'lance/render/pixi/PixiRenderer';
import Renderer from './PhaserRenderer';

export default class MyRenderer extends Renderer {

    get ASSETPATHS(){
        return {
            //ship: 'assets/ship1.png'
            //,missile: 'assets/shot.png'
            //,bg1: 'assets/space3.png'
            //,bg2: 'assets/space2.png'
            //,bg3: 'assets/clouds2.png'
            //,bg4: 'assets/clouds1.png'
            //,smokeParticle: 'assets/smokeparticle.png'
        };
    }

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.sprites = {};
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
    
        //var logo = this.physics.add.image(400, 100, 'logo');
    
        //logo.setVelocity(100, 200);
        //logo.setBounce(1, 1);
        //logo.setCollideWorldBounds(true);
    
        //emitter.startFollow(logo);
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
