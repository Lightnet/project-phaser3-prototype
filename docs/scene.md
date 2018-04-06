# scene

# Links:
 * https://www.youtube.com/watch?v=7cpZ5Y7THmo (user Gamefromscratch
)

# Information:
    Note it javascript base script.

```
<head>
    <script src="phaser.js"></scriptsrc>
    <script src="Example1.js"></scriptsrc>
    <script src="Example2.js"></scriptsrc>
    <script src="Game.js"></scriptsrc>
</head>
```

Game.js
```
var config = {
    type:Phaser.Auto,
    width:800,
    height:600,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:200}
        }
    },
    scene:[Example1, Example2]
}

var game = new Phaser.Game(config)

```

Example1.js
```
class Example1 extends Phaser.Scene{
    contructor(){
        super({key:"Example1"});
    }

    preload(){
        //this.load.image("key name","assets/file name");
    }

    create(){
        //this.image = this.add.image(400,300,"key name");

        this.input.keyboard.on('keyup_D',function(event){
            //this.image.x += 10;
        },this);

        this.key_A = this.input.keyboard.addKey(PhaserInput.KeyCodes.A);

        this.input.on('pointerdown',function(event){
            this.image.x = event.x;
            this.image.y = event.y;
        },this);

        this.input.keyboard.on('keyup_P',function(event){
            var physicsImage = this.physics.add.image(this.image.x,this.image.y,"key name");
            physicsImage.setVelocity(Phaser.Math.RND.intgerInRange(-100,100),-300);
        },this);

        //any key up
        this.input.keyboard.on('keyup',function(event){
            if(event.key == "2"){
                this.scene.start("Example2");
            }
        },this);
    }

    update(deta){
        if(this.key_A.isDown){
            this.image.x--;
        }
    }
}

```

Example2.js
```
class Example2 extends Phaser.Scene{
    contructor(){
        super({key:"Example2"});
    }

    preload(){
        //this.load.image("key name","assets/file name");
    }

    create(){
        //this.image = this.add.image(400,300,"key name");

        this.text = this.add.text(0,0,"Welcome to example2!",{font:40pc Impact});

        var tween = this.tweens.add({
            target:this.text,
            x:200,
            y:250,
            duration:2000,
            ease:"Elastic",
            easeParams:[1.5,0.5],
            delay:1000,
            onComplete:function(src,tgt){
                tgt[0].x = 0;
                tgt[0].y = 0;
                tgt[0].setColor("Red");
            }
        },this);

        this.key_1 = this.input.keyboard.addKey(PhaserInput.KeyCodes.ONE);
    }

    update(deta){
        if(this.key_1.isDown){
            this.scene.start("Example1");
        }
    }
}

```


Example2.js
```
class Example2 extends Phaser.Scene{
    contructor(){
        super({key:"Example2"});
    }

    preload(){
        //this.load.audio("key name","assets/file name");
    }

    create(){
        this.soundFX = this.sound.add("test",{loop:true});
        this.soundFX.play();
        this.soundFX.rate = 0.5;

        this.input.keyboard.on('keyup_L',function(event){
            this.soundFX.loop = !this.soundFX.loop;
            if(this.soundFX.loop) this.soundFX.play();
        },this);

        this.input.keyboard.on('keyup_P',function(event){
            if(this.soundFX.isPlaying) this.soundFX.pause()
            else this.soundFX.resume();
        },this);
    }

    update(deta){
        //if(this.key_1.isDown){
            //this.scene.start("Example1");
        //}
    }
}

```