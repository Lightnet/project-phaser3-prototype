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

    preload(){
        super.preload();
    }

    create(){
        super.create();
        this.add.image(400, 300, 'sky');

    }

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
