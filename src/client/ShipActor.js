'use strict';

export default class ShipActor {

    constructor(renderer){

        this.gameEngine = renderer.gameEngine;
        let scene = renderer.getScene();//get current index scenes
        this.sprite = scene.add.sprite(10, 10, 'ship');
        // keep a reference to the actor from the sprite
        this.sprite.actor = this;
    }

    addThrustEmitter(){

    }

    renderStep(delta){
        if(this.sprite){
            if(this.nameText){
                this.nameText.x = this.sprite.x;
                this.nameText.y = this.sprite.y - 40;
            }
        }
    }

    changeName(name){
        if (this.nameText != null){
            this.nameText.destroy();
        }
        let scene = this.gameEngine.renderer.getScene()
        this.nameText = scene.add.text(0,0,name,{font:"18px Impact",fill: "#ffffff",align: 'center', boundsAlignH: 'center', boundsAlignV: 'middle'});
        //console.log(this.nameText);
    }

    destroy() {
        return new Promise((resolve) =>{
            console.log("delete ship sprite!");
            this.sprite.destroy();
            this.nameText.destroy();
            resolve();
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