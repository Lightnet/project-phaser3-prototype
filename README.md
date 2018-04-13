# project-phaser3-prototype

# License: MIT

Created by: Lightnet

# Information:
 Simple prototype for running Phaser 3.4.0 on Lance-gg 2.0.5 nodejs multiplayer. Working on project template build.

 Porting [spaace](https://github.com/lance-gg/spaaace) Pixi.js > Phaser 3.4.0 Frameworks.

 Phaser 3.x.x Physics on server will not work since it required browser variables and functions to work. By using simple basic collision 2D on server and client as well to test collision running. Note physics will run on client and server for sync. Read more information on [lance-gg](http://lance.gg/) for multiplayer.

 For more 2D physics features would be using [matter.js](http://brm.io/matter-js/) since it can run client and server side node. Another project link to run Phaser 3.4.0 with matter.js physics 2D.

 [Project Phaser3 Matter.js](https://github.com/Lightnet/project-phaser3-matterjs)

# Notes:
 * Some files are from Phaser 3.4.0 and Lance-gg Github Examples for testing.
 * Work in progress.

# Browser notes:
 * Chrome Content Security Policy and image tends to break. Express server has to be setup and config right for dev.
 * Firefox work fine.

# Packages / Programs:
 * Viusal Studio Code 1.22.1 (IDE)
 * Nodejs 8.11.1 (run server and auto build script with gulp)
 * Phaser 3.4.0 (Note this is typescript and javascript from package npm)
 * Babel 6.26.0 (gulp auto build script for server and browser)
 * Gulp 3.9.1 (auto task build scripts)
 * Lance-gg 2.0.5 (Multiplayer Network for client and server engine or framework design)

# Install:

You need to download and install nodejs to get packages files running. As well IDE editor like Visual Studio Code.

Command Line:
```
 npm install
```
This will install packages from package.json file.


```
 gulp default 
```
This will run auto build development server and refesh files for update changes.

# Builds:

```
npm start
```
 This will start project build from command line or power shell.

 
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

# Phaser Assets & Examples: 
 * https://github.com/photonstorm/phaser3-examples/tree/master/public
 * https://labs.phaser.io/edit.html?src=src\camera\background%20color%20interpolate.js
 * https://labs.phaser.io/view.html?src=src\camera\follow%20sprite.js
 * https://labs.phaser.io/view.html?src=src\camera\overlap.js
 * https://github.com/photonstorm/phaser-examples/blob/master/examples/text/center%20text.js

# npm:
 * gulp-sass required node-sass to work.