/*
    Information: Test Build
*/

'use strict';

import isNode from 'detect-node'
if (!isNode) {                                                                                                                                                                                        
    //require('phaser');
    require('phaser/dist/phaser');
    //require('phaser/dist/phaser-arcade-physics');
}
//import 'phaser';
import Utils from './../common/Utils';
import Renderer from './PhaserRenderer';

import Ship from '../common/Ship';


export default class MyRenderer extends Renderer {

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.sprites = {}; // server and client id objects
        //Phaser config game 
        //this.config = {};
        this.config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent	: 'phaser-app',//Id of the containing DOM-Element.
            //physics: {
                //default: 'arcade',
                //arcade: {
                    //gravity: { y: 200 }
                //}
            //},
            scene: {
                key:"default",//scene name
                preload: this.preload,
                create: this.create
            }
        };
        //console.log(this);
        //this.gameEngine.emit('renderer.ready');
    }

    init() {
        let p = super.init();

        this.lookingAt = { x: 0, y: 0 };
        this.elapsedTime = Date.now();

        this.viewportWidth = 800;
        this.viewportHeight = 600;

        window.addEventListener('resize', ()=>{ this.setRendererSize(); });
        this.resizeApp();
        //console.log(this.game);
        //console.log(this.game.camera);
        //console.log(this.game.cameras);
        //console.log(Phaser);
        //console.log(Phaser.Cameras);
        console.log(this.game);
        //console.log(this.game.scene.scenes);
        //console.log(this.game.scene.scenes.Cameras);
        //console.log(this.game.scene.keys['default']); //not loaded give null
        //this.gameEngine.emit('renderer.ready');
        return p; // eslint-disable-line new-cap
    }

    setRendererSize() {
        //this.viewportWidth = window.innerWidth;
        //this.viewportHeight = window.innerHeight;
        console.log("resize");
        //this.resizeApp();
    }

    // Resize
    resizeApp(){
	    //var div = document.getElementById('phaser-app');
	    //div.style.width = window.innerHeight * 0.6;
        //div.style.height = window.innerHeight;

        var guiContainer = document.querySelector("#guiContainer");
        
        var canvas = document.querySelector("canvas");
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var windowRatio = windowWidth / windowHeight;
        var gameRatio = this.game.config.width / this.game.config.height;
        if(windowRatio < gameRatio){
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";

            guiContainer.style.width = canvas.style.width;
            guiContainer.style.height = canvas.style.height;
        }
        else{
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";

            guiContainer.style.width = canvas.style.width;
            guiContainer.style.height = canvas.style.height;
        }
    }

    //Phaser
    preload(){
        this.load.setBaseURL('http://localhost:3000/');
        this.load.image('ship', 'assets/sprites/asteroids_ship.png');

        this.load.image('shot', 'assets/shot.png');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    //Phaser
    create(){
        let render = MyRenderer.getInstance();
        
        render.getCurrentCamera();
        render.isReady = true;
        render.gameEngine.emit('renderer.ready');
        
        //console.log(render.gameEngine);
        //this.setReady();
        //console.log("create");
        //console.log(this);
        this.add.image(400, 300, 'sky');
        /*
        var particles = this.add.particles('red');
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        var logo = this.physics.add.image(400, 100, 'logo');
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        emitter.startFollow(logo);
        */
        console.log(this.scene.manager.keys.default);
        //console.log(this.game.scene.keys['default']);
    }
    //Phaser
    update(){
        
    }

    draw(t, dt) {
        super.draw(t, dt);
        //console.log("draw?");

        let now = Date.now();

        if (!this.isReady) return; // assets might not have been loaded yet

        let worldWidth = this.gameEngine.worldSettings.width;
        let worldHeight = this.gameEngine.worldSettings.height;

        let viewportSeesRightBound = this.camera.x < this.viewportWidth - worldWidth;
        let viewportSeesLeftBound = this.camera.x > 0;
        let viewportSeesTopBound = this.camera.y > 0;
        let viewportSeesBottomBound = this.camera.y < this.viewportHeight - worldHeight;

        for (let objId of Object.keys(this.sprites)) {
            let objData = this.gameEngine.world.objects[objId];
            let sprite = this.sprites[objId];

            if (objData) {

                if (objData instanceof Ship && sprite != this.playerShip) {
                    this.updateOffscreenIndicator(objData);
                }

                sprite.x = objData.position.x;
                sprite.y = objData.position.y;

                if (objData instanceof Ship){
                    //sprite.actor.shipContainerSprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
                    sprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
                } else{
                    if(this.gameEngine.world.objects[objId] !=null){
                        sprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
                    }
                }

                
                // make the wraparound seamless for objects other than the player ship
                if (sprite != this.playerShip && viewportSeesLeftBound && objData.position.x > this.viewportWidth - this.camera.x) {
                    sprite.x = objData.position.x - worldWidth;
                }
                if (sprite != this.playerShip && viewportSeesRightBound && objData.position.x < -this.camera.x) {
                    sprite.x = objData.position.x + worldWidth;
                }
                if (sprite != this.playerShip && viewportSeesTopBound && objData.position.y > this.viewportHeight - this.camera.y) {
                    sprite.y = objData.position.y - worldHeight;
                }
                if (sprite != this.playerShip && viewportSeesBottomBound && objData.position.y < -this.camera.y) {
                    sprite.y = objData.position.y + worldHeight;
                }
                
                
            }

            if (sprite) {
                // object is either a Pixi sprite or an Actor. Actors have renderSteps
                if (sprite.actor && sprite.actor.renderStep) {
                    sprite.actor.renderStep(now - this.elapsedTime);
                }
            }
        }

        
        let cameraTarget;
        if (this.playerShip) {
            cameraTarget = this.playerShip;
            // this.cameraRoam = false;
        } else if (!this.gameStarted && !cameraTarget) {

            // calculate centroid
            cameraTarget = getCentroid(this.gameEngine.world.objects);
            this.cameraRoam = true;
        }
        

        
        if (cameraTarget) {
            // 'cameraroam' in Utils.getUrlVars()
            if (this.cameraRoam) {
                let lookingAtDeltaX = cameraTarget.x - this.lookingAt.x;
                let lookingAtDeltaY = cameraTarget.y - this.lookingAt.y;
                let cameraTempTargetX;
                let cameraTempTargetY;

                if (lookingAtDeltaX > worldWidth / 2) {
                    this.bgPhaseX++;
                    cameraTempTargetX = this.lookingAt.x + worldWidth;
                } else if (lookingAtDeltaX < -worldWidth / 2) {
                    this.bgPhaseX--;
                    cameraTempTargetX = this.lookingAt.x - worldWidth;
                } else {
                    cameraTempTargetX = this.lookingAt.x + lookingAtDeltaX * 0.02;
                }

                if (lookingAtDeltaY > worldHeight / 2) {
                    cameraTempTargetY = this.lookingAt.y + worldHeight;
                    this.bgPhaseY++;
                } else if (lookingAtDeltaY < -worldHeight / 2) {
                    this.bgPhaseY--;
                    cameraTempTargetY = this.lookingAt.y - worldHeight;
                } else {
                    cameraTempTargetY = this.lookingAt.y + lookingAtDeltaY * 0.02;
                }

                this.centerCamera(cameraTempTargetX, cameraTempTargetY);

            } else {
                this.centerCamera(cameraTarget.x, cameraTarget.y);
            }
        }

        


        this.elapsedTime = now;
    }

    addObject(obj) {
        super.addObject(obj);
        console.log("renderer add object");
        //console.log(obj);
    }

    removeObject(obj) {
        super.removeObject(obj);
        //console.log(this.sprites);
        //console.log(obj);
        //console.log("renderer remove object");
        //this.sprites[obj.id].destroy();
        //delete this.sprites[obj.id];
    }

    addPlayerShip(sprite) {
        this.playerShip = sprite;
        
        document.body.classList.remove('lostGame');
        if (!document.body.classList.contains('tutorialDone')){
            document.body.classList.add('tutorial');
        }
        document.body.classList.remove('lostGame');
        document.body.classList.add('gameActive');
        document.querySelector('#tryAgain').disabled = true;
        document.querySelector('#joinGame').disabled = true;
        document.querySelector('#joinGame').style.opacity = 0;

        //phaser 3 camera get renderer.getCamera();
        this.camera.startFollow(sprite);
        
        this.gameStarted = true; // todo state shouldn't be saved in the renderer
    }

    /**
     * Centers the viewport on a coordinate in the gameworld
     * @param {Number} targetX
     * @param {Number} targetY
     */
    centerCamera(targetX, targetY) {
        if (isNaN(targetX) || isNaN(targetY)) return;
        if (!this.lastCameraPosition){
            this.lastCameraPosition = {};
        }

        this.lastCameraPosition.x = this.camera.x;
        this.lastCameraPosition.y = this.camera.y;

        //this.camera.x = this.viewportWidth / 2 - targetX;
        //this.camera.y = this.viewportHeight / 2 - targetY;
        //this.cameras.main.setSize(400, 300);// from game with scene class
        //this.cameras.startFollow(clown);


        this.lookingAt.x = targetX;
        this.lookingAt.y = targetY;
    }

    addOffscreenIndicator(objData) {
        let container = document.querySelector('#offscreenIndicatorContainer');
        let indicatorEl = document.createElement('div');
        indicatorEl.setAttribute('id', 'offscreenIndicator' + objData.id);
        indicatorEl.classList.add('offscreenIndicator');
        container.appendChild(indicatorEl);
    }

    updateOffscreenIndicator(objData){
        // player ship might have been destroyed
        if (!this.playerShip) return;

        let indicatorEl = document.querySelector('#offscreenIndicator' + objData.id);
        if (!indicatorEl) {
            console.error(`No indicatorEl found with id ${objData.id}`);
            return;
        }
        let playerShipObj = this.gameEngine.world.objects[this.playerShip.id];
        let slope = (objData.position.y - playerShipObj.position.y) / (objData.position.x - playerShipObj.position.x);
        let b = this.viewportHeight/ 2;

        let padding = 30;
        let indicatorPos = { x: 0, y: 0 };

        if (objData.position.y < playerShipObj.position.y - this.viewportHeight/2) {
            indicatorPos.x = this.viewportWidth/2 + (padding - b)/slope;
            indicatorPos.y = padding;
        } else if (objData.position.y > playerShipObj.position.y + this.viewportHeight/2) {
            indicatorPos.x = this.viewportWidth/2 + (this.viewportHeight - padding - b)/slope;
            indicatorPos.y = this.viewportHeight - padding;
        }

        if (objData.position.x < playerShipObj.position.x - this.viewportWidth/2) {
            indicatorPos.x = padding;
            indicatorPos.y = slope * (-this.viewportWidth/2 + padding) + b;
        } else if (objData.position.x > playerShipObj.position.x + this.viewportWidth/2) {
            indicatorPos.x = this.viewportWidth - padding;
            indicatorPos.y = slope * (this.viewportWidth/2 - padding) + b;
        }

        if (indicatorPos.x == 0 && indicatorPos.y == 0){
            indicatorEl.style.opacity = 0;
        } else {
            indicatorEl.style.opacity = 1;
            let rotation = Math.atan2(objData.position.y - playerShipObj.position.y, objData.position.x - playerShipObj.position.x);
            rotation = rotation * 180/Math.PI; // rad2deg
            indicatorEl.style.transform = `translateX(${indicatorPos.x}px) translateY(${indicatorPos.y}px) rotate(${rotation}deg) `;
        }
    }

    removeOffscreenIndicator(objData) {
        let indicatorEl = document.querySelector('#offscreenIndicator'+objData.id);
        if (indicatorEl && indicatorEl.parentNode)
            indicatorEl.parentNode.removeChild(indicatorEl);
    }

    updateHUD(data){
        if (data.RTT){ qs('.latencyData').innerHTML = data.RTT;}
        if (data.RTTAverage){ qs('.averageLatencyData').innerHTML = truncateDecimals(data.RTTAverage, 2);}
    }

    updateScore(data){
        
        let scoreContainer = qs('.score');
        let scoreArray = [];

        // remove score lines with objects that don't exist anymore
        let scoreEls = scoreContainer.querySelectorAll('.line');
        for (let x=0; x < scoreEls.length; x++){
            if (data[scoreEls[x].dataset.objId] == null){
                scoreEls[x].parentNode.removeChild(scoreEls[x]);
            }
        }

        for (let id of Object.keys(data)){
            let scoreEl = scoreContainer.querySelector(`[data-obj-id='${id}']`);
            // create score line if it doesn't exist
            if (scoreEl == null){
                scoreEl = document.createElement('div');
                scoreEl.classList.add('line');
                if (this.playerShip && this.playerShip.id == parseInt(id)) scoreEl.classList.add('you');
                scoreEl.dataset.objId = id;
                scoreContainer.appendChild(scoreEl);
            }

            // stupid string/number conversion
            if (this.sprites[parseInt(id)])
                this.sprites[parseInt(id)].actor.changeName(data[id].name);

            scoreEl.innerHTML = `${data[id].name}: ${data[id].kills}`;

            scoreArray.push({
                el: scoreEl,
                data: data[id]
            });
        }

        scoreArray.sort((a, b) => {return a.data.kills < b.data.kills;});

        for (let x=0; x < scoreArray.length; x++){
            scoreArray[x].el.style.transform = `translateY(${x}rem)`;
        }
    }

    enableFullScreen(){
        let isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
            (document.mozFullScreen || document.webkitIsFullScreen);

        let docElm = document.documentElement;
        if (!isInFullScreen) {

            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        }
    }

    //get current scene
    getScene(){
        //return this.game.scene.scenes[0];
        //console.log(this.game.scene.keys['default']); //loaded
        //console.log(this.game.scene.keys['default'].cameras.main);
        return this.game.scene.keys['default'];
    }

    //get current camera
    getCamera(){
        return this.game.scene.keys['default'].cameras.main;
    }

    //get current camera
    getCurrentCamera(){
        this.camera = this.game.scene.keys['default'].cameras.main;
    }

}

function getCentroid(objects) {
    let maxDistance = 500; // max distance to add to the centroid
    let shipCount = 0;
    let centroid = { x: 0, y: 0 };
    let selectedShip = null;

    for (let id of Object.keys(objects)){
        let obj = objects[id];
        if (obj instanceof Ship) {
            if (selectedShip == null)
                selectedShip = obj;

            let objDistance = Math.sqrt( Math.pow((selectedShip.position.x-obj.position.y), 2) + Math.pow((selectedShip.position.y-obj.position.y), 2));
            if (selectedShip == obj || objDistance < maxDistance) {
                centroid.x += obj.position.x;
                centroid.y += obj.position.y;
                shipCount++;
            }
        }
    }

    centroid.x /= shipCount;
    centroid.y /= shipCount;


    return centroid;
}

// convenience function
function qs(selector) { return document.querySelector(selector);}

function truncateDecimals(number, digits) {
    let multiplier = Math.pow(10, digits);
    let adjustedNum = number * multiplier;
    let truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

function isMacintosh() {
    return navigator.platform.indexOf('Mac') > -1;
}

function isWindows() {
    return navigator.platform.indexOf('Win') > -1;
}

