import PhysicsEngine from 'lance/physics/PhysicsEngine';

//import 'phaser/src/physics/impact/index';

import PhaserArcade from './PhaserArcade';

//console.log(this);

console.log(PhaserArcade);

export default class PhaserPhysicsEngine extends PhysicsEngine {
    constructor(options) {
        super(options);

        //this.options.dt = this.options.dt || (1 / 60);
        //let world = this.world = new CANNON.World();
        //world.quatNormalizeSkip = 0;
        //world.quatNormalizeFast = false;
        //world.gravity.set(0, -10, 0);
        //world.broadphase = new CANNON.NaiveBroadphase();
        //this.CANNON = CANNON;
        //console.log(PhaserPhysics);
        console.log("Phaser Physics");
    }

    // entry point for a single step of the Simple Physics
    step(dt, objectFilter) {
        //this.world.step(dt || this.options.dt);
    }
}