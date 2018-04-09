//console.log("game client!");

//import '../../assets/sass/main.scss';

import querystring from 'query-string';
import MyClientEngine from '../client/MyClientEngine';
import MyGameEngine from '../common/MyGameEngine';

import MyRenderer from './MyRenderer';
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
//const renderer = new MyRenderer(gameEngine);
//const clientEngine = new MyClientEngine(gameEngine, options, renderer);
const clientEngine = new MyClientEngine(gameEngine, options);

document.addEventListener('DOMContentLoaded', function(e){
    
    clientEngine.start();
    //renderer.start();

    gameEngine.once('gamestart',()=>{
        console.log("init connect!");
        //renderer.getCurrentCamera();
        //clientEngine.start();
    });
    
});

