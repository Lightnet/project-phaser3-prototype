/*
 Information: Game Client Setup
*/


import ClientEngine from 'lance-gg/ClientEngine';
import KeyboardControls from 'lance-gg/controls/KeyboardControls';
import MyRenderer from '../client/MyRenderer';
import Utils from '../common/Utils';

export default class MyClientEngine extends ClientEngine {

    constructor(gameEngine, options) {
        super(gameEngine, options, MyRenderer);

        this.controls = new KeyboardControls(this);
        this.controls.bindKey('left', 'left', { repeat: true });
        this.controls.bindKey('right', 'right', { repeat: true });
        this.controls.bindKey('up', 'up', { repeat: true } );
        this.controls.bindKey('space', 'space');

        this.controls.on('fire', () => {
            this.sendInput('space');
        });
        
    }
    
    start() {
        super.start();

        // handle gui for game condition
        this.gameEngine.on('objectDestroyed', (obj) => {
            if (obj instanceof Ship && this.gameEngine.isOwnedByPlayer(obj)) {
                console.log("Call defeat!");
                //document.body.classList.add('lostGame');
                //document.querySelector('#tryAgain').disabled = false;
            }
        });

        this.gameEngine.once('renderer.ready', () => {
            console.log("Renderer Ready!");
            // click event for "try again" button
            /*
            document.querySelector('#tryAgain').addEventListener('click', () => {
                if (Utils.isTouchDevice()){
                    this.renderer.enableFullScreen();
                }
                this.socket.emit('requestRestart');
            });
            */
            /*
            document.querySelector('#joinGame').addEventListener('click', (clickEvent) => {
                if (Utils.isTouchDevice()){
                    this.renderer.enableFullScreen();
                }
                clickEvent.currentTarget.disabled = true;
                this.socket.emit('requestRestart');
            });
            */
            /*
            document.querySelector('#reconnect').addEventListener('click', () => {
                window.location.reload();
            });
            */
            //  Game input
            //if (Utils.isTouchDevice()){
                //this.controls = new MobileControls(this.renderer);
            //} else {
                //this.controls = new KeyboardControls(this.renderer);
            //}

            //this.controls = new KeyboardControls(this);
            //this.controls.bindKey('left', 'left', { repeat: true });
            //this.controls.bindKey('right', 'right', { repeat: true });
            //this.controls.bindKey('up', 'up', { repeat: true } );
            //this.controls.bindKey('space', 'space');

            //this.controls.on('fire', () => {
                //this.sendInput('space');
            //});

        });



        //this.gameEngine.on('fireMissile', () => { this.sounds.fireMissile.play(); });
        this.gameEngine.on('missileHit', () => {
            // don't play explosion sound if the player is not in game
            if (this.renderer.playerShip) {
                //this.sounds.missileHit.play();
            }
        });

        this.networkMonitor.on('RTTUpdate', (e) => {
            this.renderer.updateHUD(e);
        });
    }

    // extend ClientEngine connect to add own events
    connect() {
        return super.connect().then(() => {
            this.socket.on('scoreUpdate', (e) => {
                this.renderer.updateScore(e);
            });

            this.socket.on('disconnect', (e) => {
                console.log('disconnected');
                //document.body.classList.add('disconnected');
                //document.body.classList.remove('gameActive');
                //document.querySelector('#reconnect').disabled = false;
            });

            if ('autostart' in Utils.getUrlVars()) {
                this.socket.emit('requestRestart');
            }
        });
    }
}
