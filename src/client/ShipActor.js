'use strict';

export default class ShipActor {

    constructor(renderer){
        this.gameEngine = renderer.gameEngine;

        //var scene = renderer.game.scene.scenes[0];//get current index scenes
        var scene = renderer.getScene();//get current index scenes
        this.sprite = scene.add.image(10, 10, 'ship');
        // keep a reference to the actor from the sprite
        this.sprite.actor = this;
    }

    addThrustEmitter(){

    }

    renderStep(delta){

    }

    changeName(name){

    }

    destroy() {
        return new Promise((resolve) =>{
            console.log("delete ship sprite!");
            this.sprite.destroy();
            /*
            setTimeout(()=>{
                //this.shipContainerSprite.destroy();
                //this.explosionEmitter.destroy();
                console.log("delay delete ship sprite!");
                resolve();
            }, 300);
            */
        });
    }
}