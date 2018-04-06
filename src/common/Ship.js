/*
    Information:
*/

//import Serializer from 'lance/serialize/Serializer';
import DynamicObject from 'lance/serialize/DynamicObject';
import Renderer from '../client/MyRenderer';


export default class Ship extends DynamicObject {

    constructor(gameEngine, options, props){
        super(gameEngine, options, props);
        this.showThrust = 0;
        //console.log("options");
        //console.log(options);
        //console.log(props);
        //console.log(this.position);
        //console.log(this);
    }

    get maxSpeed() { return 3.0; }
    
    onAddToWorld(gameEngine) {
        let renderer = Renderer.getInstance();
        if (renderer) {
            //console.log("ship build renderer");
            //console.log(renderer);
            /*
            let shipActor = new ShipActor(renderer);
            let sprite = shipActor.sprite;
            renderer.sprites[this.id] = sprite;
            sprite.id = this.id;
            //console.log(this.position);
            //this.position.x = 100;
            sprite.position.set(this.position.x, this.position.y);
            //sprite.position.set(100, 10);
            //console.log(renderer);
            //renderer.layer2.addChild(sprite);
            //this from 'lance/render/pixi/PixiRenderer'
            renderer.layers.base.addChild(sprite);

            if (gameEngine.isOwnedByPlayer(this)) {
                //renderer.addPlayerShip(sprite);
            } else {
                //renderer.addOffscreenIndicator(this);
            }
            */
        }
    }
}