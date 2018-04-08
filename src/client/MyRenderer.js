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
        this.sprites = {};

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
                preload: this.preload,
                create: this.create
            }
        };
        //console.log(this);
        //this.gameEngine.emit('renderer.ready');
    }

    init() {
        let p = super.init();

        window.addEventListener('resize', ()=>{ this.setRendererSize(); });
        this.resizeApp();
        console.log(this.game);
        this.gameEngine.emit('renderer.ready');
        return p; // eslint-disable-line new-cap
    }

    setRendererSize() {
        //this.viewportWidth = window.innerWidth;
        //this.viewportHeight = window.innerHeight;
        console.log("resize");
        this.resizeApp();
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
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    //Phaser
    create(){
        let render = MyRenderer.getInstance();
        //render.setReady();
        render.gameEngine.emit('renderer.ready');
        console.log(render.gameEngine);
        //this.setReady();
        //console.log("create");
        //console.log(this);
        //this.add.image(400, 300, 'sky');
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
    }
    //Phaser
    update(){
        
    }

    draw(t, dt) {
        super.draw(t, dt);
        //console.log("draw?");

        let now = Date.now();

        for (let objId of Object.keys(this.sprites)) {
            let objData = this.gameEngine.world.objects[objId];
            let sprite = this.sprites[objId];

            if (objData) {
                sprite.x = objData.position.x;
                sprite.y = objData.position.y;
            }

            if (objData instanceof Ship){
                //sprite.actor.shipContainerSprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
                sprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
            } else{
                if(this.gameEngine.world.objects[objId] !=null){
                    sprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
                }
            }

            if (sprite) {
                // object is either a Pixi sprite or an Actor. Actors have renderSteps
                if (sprite.actor && sprite.actor.renderStep) {
                    sprite.actor.renderStep(now - this.elapsedTime);
                }
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
        

        this.gameStarted = true; // todo state shouldn't be saved in the renderer
    }

    addOffscreenIndicator(objData) {
        let container = document.querySelector('#offscreenIndicatorContainer');
        let indicatorEl = document.createElement('div');
        indicatorEl.setAttribute('id', 'offscreenIndicator' + objData.id);
        indicatorEl.classList.add('offscreenIndicator');
        container.appendChild(indicatorEl);
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

