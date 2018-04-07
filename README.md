


# project-phaser3-prototype

# Created by: Lightnet

# License: MIT

# Information:
 Phaser 3.3.0, Lance-gg 2.0.5, and Nodejs 8.11.1 is for multiplayer game client and server build.
 
 Simple prototype for running Phaser 3.3.0 on Lance-gg 2.0.5 multiplayer. Working on simple template builds.

 Not sure if Phaser physics server side for nodejs hasn't been tested yet. Lance-gg network has another way to for 2D collision. Note it may required different way to code it since render the game for Phaser doesn't work on server nodejs since it required window and other objects to run headless is not possible. (It is possible but it required more R&D using more packages.)
  
 This is just a test build.

# Notes:
 * Some files are from Phaser 3.3.0 Github Examples for testing.
 * Phaser 3.3.0 physics server code have not yet work or tested to sync with client and server node of other framework engines.
 * Testing seem slow if bundle.js file is taking long time for chrome.
 * Work in progress.

# Browser notes:
 * Chrome Content Security Policy and image tends to break and it the express server is setup for dev.
 * Firefox work fine.


# Packages / Programs:
 * Viusal Studio Code 1.22.1 (IDE)
 * Nodejs 8.11.1 (run server and auto build script with gulp)
 * Phaser 3.3.0 (Note this is typescript and javascript from package npm)
 * Babel 6.26.0 (gulp auto build script for server and browser)
 * Gulp 3.9.1 (auto task build scripts)
 * Lance-gg 2.0.5 (Multiplayer Network for client and server engine or framework design)

# install:
 * npm install
 * gulp default
 
# Reference Links:
 * https://github.com/Flaxis/slick-ui
 * http://slick-ui.com/
 * https://phaser.io/news/2016/08/slickui
 * https://phaser.io/news/2017/12/dragonbones-phaser-plugin
 * https://phaser.io/news/2015/05/ezgui
 * http://www.phaser.io/news/2017/08/phaser-ui-package
 * https://phaser.io/tutorials/making-your-first-phaser-3-game
 * https://photonstorm.github.io/phaser3-docs/index.html
 * http://www.emanueleferonato.com/2018/02/21/your-first-phaser-3-matter-js-physics-example/
 * https://github.com/photonstorm/phaser3-examples/tree/master/public/src/physics/matterjs
 * https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser/Physics
 * https://phaser.io/tutorials/getting-started-phaser3/part5
 * http://browsergameshub.com/phaser3-lessons-and-code-pt1/#direct-1

# Phaser Assets: 
 * https://github.com/photonstorm/phaser3-examples/tree/master/public