/*
    Information:
*/

import Serializer from 'lance/serialize/Serializer';
import DynamicObject from 'lance/serialize/DynamicObject';
import Renderer from '../client/MyRenderer';
import ShipActor from '../client/ShipActor';

export default class Ship extends DynamicObject {

    constructor(gameEngine, options, props){
        super(gameEngine, options, props);
        this.showThrust = 0;
        this.isBot = false;
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
            let shipActor = new ShipActor(renderer);
            let sprite = shipActor.sprite;
            renderer.sprites[this.id] = sprite;
            sprite.id = this.id;
            //console.log(sprite);

            //sprite.position.set(this.position.x, this.position.y);
            //renderer.layer2.addChild(sprite);

            if (gameEngine.isOwnedByPlayer(this)) {
                //renderer.addPlayerShip(sprite);
            } else {
                //renderer.addOffscreenIndicator(this);
            }

        }
    }

    onRemoveFromWorld(gameEngine) {
        let renderer = Renderer.getInstance();
        if (renderer) {

        }
    }

    static get netScheme() {
        return Object.assign({
            showThrust: { type: Serializer.TYPES.INT32 }
        }, super.netScheme);
    }

    toString() {
        return `${this.isBot?'Bot':'Player'}::Ship::${super.toString()}`;
    }

    syncTo(other) {
        super.syncTo(other);
        this.showThrust = other.showThrust;
    }

    destroy() {
    }

    attachAI() {
        this.isBot = true;

        this.onPreStep = () => {
            this.steer();
        };

        this.gameEngine.on('preStep', this.onPreStep);

        let fireLoopTime = Math.round(250 + Math.random() * 100);
        this.fireLoop = this.gameEngine.timer.loop(fireLoopTime, () => {
            if (this.target && this.distanceToTargetSquared(this.target) < 160000) {
                this.gameEngine.makeMissile(this);
            }
        });
    }

    shortestVector(p1, p2, wrapDist) {
        let d = Math.abs(p2 - p1);
        if (d > Math.abs(p2 + wrapDist - p1)) p2 += wrapDist;
        else if (d > Math.abs(p1 + wrapDist - p2)) p1 += wrapDist;
        return p2 - p1;
    }

    distanceToTargetSquared(target) {
        let dx = this.shortestVector(this.position.x, target.position.x, this.gameEngine.worldSettings.width);
        let dy = this.shortestVector(this.position.y, target.position.y, this.gameEngine.worldSettings.height);
        return dx * dx + dy * dy;
    }

    steer() {
        let closestTarget = null;
        let closestDistance2 = Infinity;
        for (let objId of Object.keys(this.gameEngine.world.objects)) {
            let obj = this.gameEngine.world.objects[objId];
            if (obj != this) {
                let distance2 = this.distanceToTargetSquared(obj);
                if (distance2 < closestDistance2) {
                    closestTarget = obj;
                    closestDistance2 = distance2;
                }
            }
        }

        this.target = closestTarget;

        if (this.target) {

            let newVX = this.shortestVector(this.position.x, this.target.position.x, this.gameEngine.worldSettings.width);
            let newVY = this.shortestVector(this.position.y, this.target.position.y, this.gameEngine.worldSettings.height);
            let angleToTarget = Math.atan2(newVX, newVY)/Math.PI* 180;
            angleToTarget *= -1;
            angleToTarget += 90; // game uses zero angle on the right, clockwise
            if (angleToTarget < 0) angleToTarget += 360;
            let turnRight = this.shortestVector(this.angle, angleToTarget, 360);

            if (turnRight > 4) {
                this.isRotatingRight = true;
            } else if (turnRight < -4) {
                this.isRotatingLeft = true;
            } else {
                this.isAccelerating = true;
                this.showThrust = 5;
            }

        }
    }

}