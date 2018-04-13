//import 'phaser/src/physics/impact/index';

//import ArcadeWorld from 'phaser/src/physics/arcade/World';

//export default class PhaserArcade {
    //static World = require('phaser/src/physics/arcade/World');
    //static World = ArcadeWorld; 
//}

var CONST = require('phaser/src/physics/arcade/const');
var Extend = require('phaser/src/utils/object/Extend');

var Arcade = {
    //ArcadePhysics: require('phaser/src/physics/arcade/ArcadePhysics'),
    Body: require('phaser/src/physics/arcade/Body'),
    Collider: require('phaser/src/physics/arcade/Collider'),
    //Factory: require('phaser/src/physics/arcade/Factory'),
    //Group: require('phaser/src/physics/arcade/PhysicsGroup'),
    //Image: require('phaser/src/physics/arcade/ArcadeImage'),
    //Sprite: require('phaser/src/physics/arcade/ArcadeSprite'),
    StaticBody: require('phaser/src/physics/arcade/StaticBody'),
    //StaticGroup: require('phaser/src/physics/arcade/StaticPhysicsGroup'),
    World: require('phaser/src/physics/arcade/World')

}

//   Merge in the consts
Arcade = Extend(false, Arcade, CONST);

module.exports = Arcade;