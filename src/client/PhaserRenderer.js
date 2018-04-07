/*
    Information: Default build for Phaser Renderer Class
*/

//import isNode from 'detect-node'
//if (!isNode) {                                                                                                                                                                                        
    //require('phaser');
    //var Renderer = require('phaser/dist/phaser');
//}

import Renderer from 'lance/render/Renderer';
/**
 * Phaser Renderer
 */

export default class PhaserRenderer extends Renderer {

    get ASSETPATHS() {
        return {};
    }

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.sprites = {};
        this.config = {};
        this.game = null;
        this.isReady = false;
    }

    init() {
        // prevent calling init twice
        if (this.initPromise) return this.initPromise;

        this.viewportWidth = window.innerWidth;
        this.viewportHeight = window.innerHeight;
        /*
        //ignore since it could override config. This is test.
        this.config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };
        */

        if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
            this.onDOMLoaded();
        } else {
            document.addEventListener('DOMContentLoaded', ()=>{
                this.onDOMLoaded();
            });
        }

        this.initPromise = new Promise((resolve, reject)=>{
            let onLoadComplete = () => {
                this.isReady = true;
                resolve();
            };

            let resourceList = Object.keys(this.ASSETPATHS).map( x => {
                return {
                    name: x,
                    url: this.ASSETPATHS[x]
                };
            });

            // make sure there are actual resources in the queue
            if (resourceList.length > 0){
                //PIXI.loader.add(resourceList).load(onLoadComplete);
            }else{
                onLoadComplete();
            }
        });

        return this.initPromise;
    }

    onDOMLoaded() {
        //console.log(this.game);
        //Phaser.Physics.ARCADE
        //Phaser.Physics.Impact
        //Phaser.Physics.Matter
        //console.log(Phaser.Physics);

        this.game = new Phaser.Game(this.config);
    }

    preload(){

    }

    create(){

    }

    update(){

    }

    draw(t, dt) {
        super.draw(t, dt);
        if (!this.isReady) return; // assets might not have been loaded yet
        //for (let objId of Object.keys(this.sprites)) {
            //let objData = this.gameEngine.world.objects[objId];
            //let sprite = this.sprites[objId];

            //if (objData) {
                //sprite.x = objData.position.x;
                //sprite.y = objData.position.y;
                //sprite.rotation = this.gameEngine.world.objects[objId].angle * Math.PI/180;
            //}
        //}
        //this.renderer.render(this.stage);
    }

    addObject(obj) {
        super.addObject(obj);
        //if (obj.hasComponent(PixiRenderableComponent)){
            //let renderable = obj.getComponent(PixiRenderableComponent);
            //let sprite = this.sprites[obj.id] = renderable.createRenderable();
            //sprite.anchor.set(0.5, 0.5);
            //sprite.position.set(obj.position.x, obj.position.y);
            //this.layers.base.addChild(sprite);
        //}
    }

    removeObject(obj) {
        super.removeObject(obj);
        //if (obj.hasComponent(PixiRenderableComponent)){
            //let sprite = this.sprites[obj.id];
            //if (sprite) {
                //this.sprites[obj.id].destroy();
                //delete this.sprites[obj.id];
            //}
        //}
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