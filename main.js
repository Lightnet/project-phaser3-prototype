'use strict';

import express from 'express';
import socketIO from 'socket.io';
import path from 'path';



const PORT = process.env.PORT || 8080;
const INDEX = path.join(__dirname, '../index.html');

// define routes and socket
const server = express();

var helmet = require('helmet');
server.use(helmet());
server.use(helmet.noCache());

//https://enable-cors.org/server_expressjs.html
server.use(function(req, res, next) {
    //deal with img-src access and other for dev builds.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/*
const csp = require('express-csp-header');
server.use(csp({
    policies: {
        'default-src': [csp.SELF,'https://localhost:8080'],
		'script-src': [csp.SELF, csp.INLINE, 'https://localhost'],
		'style-src': [csp.SELF,csp.INLINE],
        //'img-src': [csp.SELF,],
        //'img-src': [csp.SELF,'https://localhost:3000'],
        //'img-src': [csp.SELF,'*','data:'],
        //'img-src': ['*'],
        'img-src': [csp.SELF,'data:'],
		'font-src': [csp.SELF,'data:', 'fonts.gstatic.com'],
		'object-src': [csp.NONE],
		//'block-all-mixed-content': true,
        'frame-ancestors': [csp.NONE],
        //'connectSources' : ["'self'", "ws://localhost:3000"]
        'connect-src' : [csp.SELF, 'ws://localhost:3000']
    }
    ,reportOnly: false
}));
*/
//server.use(express.bodyParser.json({type: ['application/json', 'application/csp-report']}));




//server.use(helmet.noCache());
/*
//===============================================
//
//===============================================
var csp = require('helmet-csp');
server.use(csp({
    directives: {
        defaultSrc: ["'self'","'*'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ['style.com'],
        fontSrc: ["'self'", 'fonts.com'],
        imgSrc: ["'self'", 'data:'],
        sandbox: ['allow-forms', 'allow-scripts'],
        connectSrc : ["'self'","ws://localhost:3000"],
        //reportUri: '/report-violation',
        objectSrc: ["'none'"]//,
        //upgradeInsecureRequests: true,
        //workerSrc: false  // This is not set.
    }
    ,loose: false
    ,reportOnly: false
    //,setAllHeaders: false
    //,disableAndroid: false
  }));
*/
/*
//===============================================
//
//===============================================
const csp = require('express-csp-header');
server.use(csp({
    policies: {
        'default-src': [csp.NONE],
        //'script-src': [csp.NONCE],
        //'script-src': [csp.SELF,'https://localhost:3000'],
        //'script-src': [csp.NONE],
        //'script-src': [csp.SELF,'unsafe-eval'],
        'script-src': [csp.SELF, csp.INLINE, 'https://localhost'],
		'style-src': [csp.NONCE],
        //'img-src': [csp.SELF,'data:'],
        'img-src': [csp.SELF],
		'font-src': [csp.NONCE, 'fonts.gstatic.com'],
		'object-src': [csp.NONE],
		'block-all-mixed-content': true,
        'frame-ancestors': [csp.NONE]
        ,'connect-src' : [csp.SELF,"ws://localhost:3000"]
    }
    //,reportUri: '/report-violation'
    ,reportOnly: false
}));
*/

//===============================================
// image doesn't work some reason
//===============================================




//===============================================
// 
//===============================================

/*
var csp = require('helmet-csp');
server.use(csp({
    // Specify directives as normal.
    directives: {
      defaultSrc: ["'self'", 'default.com'],
      scriptSrc: ["'self'", "'*'"],
      connectSrc : ["'self'", "'none'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", 'fonts.com'],
      imgSrc: ['img.com', 'data:'],
      sandbox: ['allow-forms', 'allow-scripts'],
      reportUri: '/report-violation',
      objectSrc: ["'none'"],
      upgradeInsecureRequests: true,
      workerSrc: false  // This is not set.
    },
    loose: false,
    reportOnly: false,
    setAllHeaders: false,
    disableAndroid: false,
    browserSniff: true
  }));
  */
//===============================================
// 
//===============================================
/*
var csp = require('helmet-csp');
server.use(csp({
  // Specify directives as normal.
  directives: {
    defaultSrc: ["'self'", 'default.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    connectSrc : ["'self'", "ws://localhost:3000"],
    styleSrc: ['style.com'],
    fontSrc: ["'self'", 'fonts.com'],
    imgSrc: ['img.com', 'data:'],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false  // This is not set.
  },
  loose: false,
  reportOnly: false,
  setAllHeaders: false,
  disableAndroid: false,
  browserSniff: true
}));
*/
//===============================================
// 
//===============================================
/*
var csp = require('helmet-csp');
server.use(csp({
    directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
    // reportUri: '/report-violation',
    //reportOnly: false, // set to true if you only want to report errors
    //setAllHeaders: false, // set to true if you want to set all headers
    //safari5: false // set to true if you want to force buggy CSP in Safari 5
    },
    loose: false,
  reportOnly: false,
  setAllHeaders: false,
  disableAndroid: false,
  browserSniff: true
}));
*/

server.get('/', function(req, res) { res.sendFile(INDEX); });
//server.use('/', express.static(path.join(__dirname, '.')));
server.use('/', express.static(path.join(__dirname, '../public')));
let requestHandler = server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(requestHandler);

// Game Server
import MyServerEngine from './src/server/MyServerEngine';
import MyGameEngine from './src/common/MyGameEngine';
//import Trace from '../../lance/lib/Trace';
import Trace from 'lance/lib/Trace';
//Trace.TRACE_NONE
//
var TRACE = Trace.TRACE_DEBUG
// Game Instances
//const gameEngine = new MyGameEngine({ traceLevel: Trace.TRACE_NONE });
const gameEngine = new MyGameEngine({ traceLevel: TRACE });
const serverEngine = new MyServerEngine(io, gameEngine, { 
    debug: {}
    ,updateRate: 6
    ,tracesPath: './logs'
    ,timeoutInterval: 0 // no timeout
});

// start the game
serverEngine.start();