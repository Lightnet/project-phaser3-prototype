'use strict';

export default class ShipActor {

    constructor(renderer){
        this.gameEngine = renderer.gameEngine;

        var scene = renderer.game.scene.scenes[0];//get current index scenes
        this.sprite = scene.add.image(10, 10, 'ship');
        // keep a reference to the actor from the sprite
        this.sprite.actor = this;

        //super(renderer);
        //PIXI = require('pixi.js');
        //PixiParticles = require('pixi-particles');
        //console.log("ShipActor");
        //console.log(renderer);

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

    renderStep(delta){


    }

    destroy() {
        return new Promise((resolve) =>{



        });
    }
}