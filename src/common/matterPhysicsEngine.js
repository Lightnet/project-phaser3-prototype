import PhysicsEngine from 'lance/physics/PhysicsEngine';

//https://github.com/liabru/matter-js/issues/101
//var Matter = require('matter-js/build/matter.js');
import Matter from 'matter-js';

export default class matterPhysicsEngine extends PhysicsEngine {
    constructor(options) {
        super(options);

        console.log("matter Physics");

        this.options.dt = this.options.dt || (1 / 60);
        //https://github.com/liabru/matter-js/wiki/Getting-started

        this.Engine = Matter.Engine;
        this.Render = Matter.Render;
        this.World = Matter.World;
        this.Bodies = Matter.Bodies;
        this.Composite = Matter.Composite;
        this.Events = Matter.Events;

        // create an engine
        this.engine = this.Engine.create();
    }

    addBox(x, y, options) {
        let box = this.Bodies.rectangle(x, y, 40, 40);
        this.World.add(this.engine.world, box);
    }

    // entry point for a single step of the Simple Physics
    step(dt, objectFilter) {
        //this.world.step(dt || this.options.dt);
        console.log("step!");
        //https://github.com/liabru/matter-js/wiki/Running
        this.Engine.update(this.engine, dt || this.options.dt);
    }
}