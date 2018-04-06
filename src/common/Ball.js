'use strict';

import DynamicObject from 'lance/serialize/DynamicObject';

export default class Ball extends DynamicObject {

    get bendingMultiple() { return 0.8; }
    get bendingVelocityMultiple() { return 0; }

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        this.class = Ball;
        this.velocity.set(2, 2);
    }

    onAddToWorld(gameEngine) {
        if (gameEngine.renderer) {
            gameEngine.renderer.addSprite(this, 'ball');
        }
    }
}
