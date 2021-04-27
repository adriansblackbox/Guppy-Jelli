class Play extends Phaser.Scene{

    constructor() {
        super("playScene");
        //this.light = null;
        //this.renderTexture = null;
    }

    preload(){
        this.load.image('platform','./assets/Ground.png');
        this.load.image('player','./assets/Player.png');
        this.load.image('fish','./assets/fish.png');
        this.load.image('shark', './assets/temp-shark.png'); // Bailey: temp asset for the shark

        this.load.image('cover', './assets/BlackCover.png');
        this.load.image('BG', './assets/middlelayer.png');

        this.load.spritesheet('fishswim', 'assets/feesh_spreadsheet.png', {frameWidth: 40, frameHeight: 23, startFrame: 0, endFrame: 14});
        this.load.spritesheet('sharkswim', 'assets/shark.png', {frameWidth: 280, frameHeight: 112, startFrame: 0, endFrame: 30});
        //need a sprite for the jelly
        this.canvas = this.sys.canvas;
        this.canvas.style.cursor = 'none';
    }
    create(){
        //Adrian: Boolean var for checking if the player has died
        this.fishDead = false;

        //origionally I started making this work for platforms
        //this.platforms = this.add.group({removeCallback: function(platform){platform.scene.platformPool.add(platform)}});
        //this.platformPool = this.add.group({removeCallback: function(platform){platform.scene.platforms.add(platform)}});

        //work in progress
        //this.player = new this.player(this,game.config.width/2, game.config.height-borderUISize-boarderPadding);

        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('fishswim', { start: 0, end: 14, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'shark',
            frames: this.anims.generateFrameNumbers('sharkswim', { start: 0, end: 30, first: 0}),
            frameRate: 10
        });


        //const cX = game.config.width-370;
        //const cY = borderUISize+350;

        const cX = game.config.width-570;;
        const cY = borderUISize+350;

        this.background = this.add.image(cX, cY, 'BG');
        this.shark = new Obstacle(this, game.config.width, borderUISize*6 + borderPadding*4,null, 0, 280, 45, 15, 35).setOrigin(0,0);


        //====================== Place hidden things ^ =============================
        //==========================================================================

        const reveal = this.add.image(cX, cY, 'cover');
        reveal.alpha = 0

        this.cover = this.add.image(cX, cY, 'cover');
        this.cover.alpha = 1

        const covWidth = this.cover.width;
        const covHeight = this.cover.height;

        const rt = this.make.renderTexture({
            width: covWidth,
            height: covHeight,
            add: false
        }) 
        const maskImage = this.make.image({
            x: game.config.width/2,
            y: game.config.height/2,
            key: rt.texture.key,
            add: false
        })
        this.cover.mask = new Phaser.Display.Masks.BitmapMask(this,maskImage);
        this.cover.mask.invertAlpha = true;

        reveal.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage);

        this.light = this.add.circle(0,0,80,0x000000,1);    //circle with radius of 30 and alpha of 1
        this.light.visible = false;
        this.lightMid = this.add.circle(0,0,90,0x000000,0.5);    //circle with radius of 30 and alpha of 1
        this.lightMid.visible = false;
        this.lightFar = this.add.circle(0,0,95,0x000000,0.25);    //circle with radius of 30 and alpha of 1
        this.lightFar.visible = false;

        this.fishlight = this.add.circle(0,0,45,0x000000,1);    //circle with radius of 30 and alpha of 1
        this.fishlight.visible = false;
        this.fishlightMid = this.add.circle(0,0,50,0x000000,0.5);    //circle with radius of 30 and alpha of 1
        this.fishlightMid.visible = false;
        this.fishlightFar = this.add.circle(0,0,55,0x000000,0.25);    //circle with radius of 30 and alpha of 1
        this.fishlightFar.visible = false;

        this.renderTexture = rt;


        this.renderTexture = rt;
        this.renderTexture.setOrigin(game.config.width/2, game.config.height/2);

        //end of mask stuff

        let scoreConfig = {
            fontFamily: 'Courier',
            fontsize: '28px',
            backgroundColor: '#006994',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
    
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.timeVariable = game.settings.gameTimer;

        //this.clock = this.time.delayedCall(this.timeVariable, () => {
            //this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            //this.gameOver = true; 
        //}, null, this);

        this.player = new Player(this, borderUISize + borderPadding + 100,game.config.height/2);
        this.jellyFishCont = new JellyFish(this,game.config.width + borderUISize * 6, borderUISize*4, 'fish'); 

        //setting up time text
        let timeConfig = {fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#30D5C8', color: '#000000', align: 'left', padding:{top: 5, bottom: 5,}, fixedWidth: 150}
        this.timeLeft = this.add.text(borderUISize + borderPadding + 410, borderUISize + borderPadding*2, 'Time: ', timeConfig);
        this.timeVar = 0;
        this.timePassed = 0;
    }


    update(time,delta){
        //the jellyfish is clamped now (can edit how much it is clamped by easily now too)

        // Adrian: Collision detection between shark and fish calls onSharkCollision
        // log(4,23,21)
        if(!this.fishDead)
            this.physics.world.collide(this.player, this.shark, this.onSharkCollision, null, this);

        if(this.input.activePointer.x >= borderUISize + borderPadding && this.input.activePointer.x <= game.config.width - borderUISize - this.jellyFishCont.width && !this.fishDead){
            this.jellyFishCont.x = this.input.activePointer.x;
        }
        if(this.input.activePointer.y >= borderUISize + borderPadding && this.input.activePointer.y <= game.config.height - borderUISize - this.jellyFishCont.height && !this.fishDead){
            this.jellyFishCont.y = this.input.activePointer.y; // Baiely: temporarily commenting this out to see if shark movement across the basic screen works
        }

        

        //for the gameover text, if we want the top to not have as large as box we may need to change the fixedwidth in between the two texts
        let gameOverConfig = {fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#F3B141', color: '#843605', align: 'center', padding:{top: 5, bottom: 5,}, fixedWidth: 400}
        let scoreConfig = {
            fontFamily: 'Courier',
            fontsize: '28px',
            backgroundColor: '#006994',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeLeft.setText("Time: " + Math.round(this.timeVar*.001));
        //this.shark.speed += (this.timeVar*.000001);   //one way of speeding up sharks
        if(Math.round(this.timeVar*.001) >= this.timePassed+10){    //10 is the amount of time passed before it speeds up
            this.shark.speed += 1;
            this.timePassed+=10;
            console.log(this.shark.speed);
        }
        if(!this.gameOver){
            this.shark.update();
            this.player.update();
            this.player.anims.play('swim', true);
            this.shark.anims.play('shark', true);
            this.timeVar = this.timeVar + delta;
            if(this.player.isMoving){
                this.player.anims.msPerFrame = 35;
            }else{
                this.player.anims.msPerFrame = 75;
            }

            // light x/y values handled here
            this.renderTexture.clear();
            this.renderTexture.draw(this.light, this.jellyFishCont.x, this.jellyFishCont.y);
            this.renderTexture.draw(this.lightMid, this.jellyFishCont.x, this.jellyFishCont.y);
            this.renderTexture.draw(this.lightFar, this.jellyFishCont.x, this.jellyFishCont.y);

            this.renderTexture.draw(this.fishlight, this.player.x, this.player.y);
            this.renderTexture.draw(this.fishlightMid, this.player.x, this.player.y);
            this.renderTexture.draw(this.fishlightFar, this.player.x, this.player.y);

        }else{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart', gameOverConfig).setOrigin(0.5);
            this.player.stopMoving();
            this.player.anims.play('swim', false );
            this.player.alpha = 0;
            this.shark.anims.play('shark', false);

            this.renderTexture.clear();
            this.renderTexture.draw(this.light, this.jellyFishCont.x, this.jellyFishCont.y);
            this.renderTexture.draw(this.lightMid, this.jellyFishCont.x, this.jellyFishCont.y);
            this.renderTexture.draw(this.lightFar, this.jellyFishCont.x, this.jellyFishCont.y);
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }


    }

    
    //functions
    onSharkCollision(){
        this.gameOver = true;
        this.fishDead = true;
    }
}

//please delete me!!!