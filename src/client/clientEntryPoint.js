//console.log("game client!");

//import '../../assets/sass/main.scss';

import querystring from 'query-string';
import MyClientEngine from '../client/MyClientEngine';
import MyGameEngine from '../common/MyGameEngine';
const qsOptions = querystring.parse(location.search);

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults = {
    traceLevel: 1,
    delayInputCount: 3,
    scheduler: 'render-schedule',
    syncOptions: {
        sync: qsOptions.sync || 'extrapolate',
        localObjBending: 0.0,
        remoteObjBending: 0.8,
        bendingIncrements: 6
    }
};
let options = Object.assign(defaults, qsOptions);

// create a client engine and a game engine
const gameEngine = new MyGameEngine(options);
const clientEngine = new MyClientEngine(gameEngine, options);

document.addEventListener('DOMContentLoaded', function(e){
    //var app = new PIXI.Application();
    //document.body.appendChild(app.view);
    //console.log(clientEngine);
    //clientEngine.renderer.autoResize = true;
    //clientEngine.renderer.resize(200, 200);
    
    clientEngine.start();
    /*
    var size = [1920, 1080];
    var ratio = size[0] / size[1];
    function resize() {
        if (window.innerWidth / window.innerHeight >= ratio) {
            var w = window.innerHeight * ratio;
            var h = window.innerHeight;
        } else {
            var w = window.innerWidth;
            var h = window.innerWidth / ratio;
        }
        clientEngine.renderer.renderer.resize(w, h );
        clientEngine.renderer.renderer.autoResize = true;
    }
    window.onresize = resize;
    */
});

