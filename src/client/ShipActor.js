'use strict';

export default class ShipActor {

    constructor(renderer){
        //super(renderer);
        //PIXI = require('pixi.js');
        //PixiParticles = require('pixi-particles');
        //console.log("ShipActor");
        //console.log(renderer);

        this.gameEngine = renderer.gameEngine;
        //this.backLayer = renderer.layer1;
        //this.sprite = new PIXI.Container();
        //this.shipContainerSprite = new PIXI.Container();

        //this.shipSprite = new PIXI.Sprite(PIXI.loader.resources.ship.texture);
        /*
        this.shipSprite = new PIXI.Sprite();

        // keep a reference to the actor from the sprite
        this.sprite.actor = this;

        this.shipSprite.anchor.set(0.5, 0.5);
        this.shipSprite.width = 50;
        this.shipSprite.height = 45;

        //this.addThrustEmitter();
        this.sprite.addChild(this.shipContainerSprite);
        this.shipContainerSprite.addChild(this.shipSprite);
        */
        
    }
}