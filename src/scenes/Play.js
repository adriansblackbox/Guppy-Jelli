class Play extends Phaser.Scene{

    constructor() {
        super("playScene");
        //this.light = null;
        //this.renderTexture = null;
        
    }

    preload(){
        this.load.image('cover', './assets/BlackCover.png');
        this.load.image('covercover', './assets/cover_cover.png');
        this.load.image('BG', './assets/first_background.png');
        this.load.image('base0', './assets/base_0.png');
        this.load.image('base1', './assets/base_1.png');
        this.load.image('base2', './assets/base_2.png');
        this.load.image('base3', './assets/base_3.png');
        this.load.image('monster', './assets/monster.png');

        this.load.image('wall1', './assets/wall1.png');

        this.load.spritesheet('fishswim', 'assets/feesh_spreadsheet.png', {frameWidth: 80, frameHeight: 46, startFrame: 0, endFrame: 14});
        this.load.spritesheet('sharkswim', 'assets/shark.png', {frameWidth: 420, frameHeight: 168, startFrame: 0, endFrame: 30});
        this.load.spritesheet('jelly', 'assets/jelly.png', {frameWidth: 32, frameHeight: 40, startFrame: 0, endFrame: 21});
        this.load.spritesheet('tentacle', 'assets/tentacle_bigger.png', {frameWidth: 120, frameHeight: 450, startFrame: 0, endFrame: 31});
        //need a sprite for the jelly
        this.canvas = this.sys.canvas;
        this.canvas.style.cursor = 'none';
    }
    create(){
        //Adrian: Boolean var for checking if the player has died
        this.fishDead = false;
        this.gameOver = false;
        this.jellyDown = false;
        this.wall2Delayed = false;
        this.wall3Delayed = false;
        this.wall4Delayed = false;

        this.initializeKeys();
        this.creatAnims();

        const cX = game.config.width/2;
        const cY = game.config.height/2;

        this.background = this.add.tileSprite(cX, cY, 1920, 720, 'BG');
        this.base0 = this.add.tileSprite(cX, cY, 1920, 720, 'base0');
        this.base1 = this.add.tileSprite(cX, cY, 1920, 720, 'base1');
        this.base2 = this.add.tileSprite(cX, cY, 1920, 720, 'base2');
        this.base3 = this.add.tileSprite(cX, cY, 1920, 720, 'base3');

        this.wall1 = new tentacle(
            this, game.config.width, game.config.height - 450,  //gorund
            null, null, 50, 400, 27.5, 0, true).setOrigin(0,0);

        this.wall3 = new tentacle(
            this, game.config.width, game.config.height - 450,  //gorund
            null, null, 50, 400, 27.5, 0, true).setOrigin(0,0);

        this.wall2 = new tentacle(
            this, game.config.width, 0, 
            null, null, 50, 400, 27.5, 0, false).setOrigin(0,0);  // cieling

        this.wall4 = new tentacle(
            this, game.config.width, 0, 
            null, null, 50, 400, 27.5, 0, false).setOrigin(0,0);  // cieling

        this.wall1.anims.play('tentacle', true);
        this.wall2.anims.play('tentacle', true);
        this.wall1.flipY = true;
        this.wall3.anims.play('tentacle', true);
        this.wall4.anims.play('tentacle', true);
        this.wall3.flipY = true;
    
        this.shark = new shark(this, game.config.width/2,game.config.height, null, 0, 400, 70, 15, 50).setOrigin(0,0);
        
        this.monster = new monster(this, 0, game.config.height/2, 'monster',0)
        

        //====================== Place hidden things ^ =============================
        //==========================================================================

        this.lightEffect(cX, cY);
        this.particles = this.add.tileSprite(cX, cY, 960, 720, 'covercover');
        
        this.player = new Player(this, borderUISize + borderPadding + 100,game.config.height/2);
        this.jellyFishCont = new JellyFish(this,game.config.width + borderUISize * 6, borderUISize*4, 'fish'); 

        this.powerUp = new powerUp(this, game.config.width/2,game.config.height, 'monster', 0, -200, 70, 15, 50)

        this.jellyFishCont.alpha = 0.75; 

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


        scoreConfig.fixedWidth = 0;
        this.timeVariable = game.settings.gameTimer;

        //this.clock = this.time.delayedCall(this.timeVariable, () => {
            //this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            //this.gameOver = true; 
        //}, null, this);

        //setting up time text
        let timeConfig = {fontFamily: 'Courier', fontSize: '28px', backgroundColor: null/*'#30D5C8'*/, color: '#FFFFFF', align: 'left', padding:{top: 5, bottom: 5,}, fixedWidth: 150}
        this.timeLeft = this.add.text(0, 0, 'Time: ', timeConfig);
        this.timeVar = 0;
        this.timePassed = 0;
    }
    creatAnims(){
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
        this.anims.create({
            key: 'jelly',
            frames: this.anims.generateFrameNumbers('jelly', { start: 0, end: 21, first: 0}),
            frameRate: 13
        });
        this.anims.create({
            key: 'tentacle',
            frames: this.anims.generateFrameNumbers('tentacle', { start: 0, end: 31, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        
    }
    lightEffect(cX, cY){
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

        this.light = this.add.circle(0,0,185,0x000000,1);    //circle with radius of 30 and alpha of 1
        this.light.visible = false;
        this.lightMid = this.add.circle(0,0,195,0x000000,0.5);    //circle with radius of 30 and alpha of 1
        this.lightMid.visible = false;
        this.lightFar = this.add.circle(0,0,200,0x000000,0.25);    //circle with radius of 30 and alpha of 1
        this.lightFar.visible = false;

        this.renderTexture = rt;


        this.renderTexture = rt;
        this.renderTexture.setOrigin(game.config.width/2, game.config.height/2);
    }

    initializeKeys(){
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }


    update(time,delta){
        //the jellyfish is clamped now (can edit how much it is clamped by easily now too)


        this.background.tilePositionX += 0.7;
        this.base0.tilePositionX += 0.8;
        this.base1.tilePositionX += 0.9;
        this.base2.tilePositionX += 1;
        this.base3.tilePositionX += 1.1;
        this.particles.tilePositionX += 0.7;

        // Adrian: Collision detection between shark and fish calls onSharkCollision
        // log(4,23,21)
        this.collisions();
        this.jellyMovement();
        

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
        //if(Math.round(this.timeVar*.001) >= this.timePassed+10){    //10 is the amount of time passed before it speeds up
            //this.shark.speed += 1;
            //this.timePassed+=10;
        //}
        if(!this.gameOver){
            this.updateTenticles();
            this.shark.update();
            this.player.update();
            this.monster.update(this.player.y);
            this.player.anims.play('swim', true);
            this.shark.anims.play('shark', true);
            this.jellyFishCont.play('jelly', true);
            this.powerUp.update();
            this.timeVar = this.timeVar + delta;
            if(this.player.isMoving){
                this.player.anims.msPerFrame = 35;
            }else{
                this.player.anims.msPerFrame = 75;
            }

            // light x/y values handled here
            this.renderTexture.clear();
            if(!this.jellyDown)
                this.drawJellyLight();

        }else{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart', gameOverConfig).setOrigin(0.5);
            this.player.stopMoving();
            this.player.anims.play('swim', false );
            this.player.alpha = 0;
            this.shark.anims.play('shark', false);
            this.jellyFishCont.play('jelly', false);
            this.jellyFishCont.alpha = 0;

            this.renderTexture.clear();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
    }
    updateTenticles(){
        this.wall1.update();
        if(this.wall2Delayed){
            this.wall2.update();
        }else if(this.wall1.x <= game.config.width - 252){
            this.wall2Delayed = true;
        }
        if(this.wall3Delayed){
            this.wall3.update();
        }else if(this.wall2.x <= game.config.width - 252){
            this.wall3Delayed = true;
        }
        if(this.wall4Delayed){
            this.wall4.update();
        }else if(this.wall3.x <= game.config.width - 252){
            this.wall4Delayed = true;
        }
    }

    collisions(){
        if(!this.fishDead){
            this.physics.world.collide(this.player, this.shark, this.onSharkCollision, null, this);
            this.physics.world.collide(this.jellyFishCont, this.wall1, this.onJellyWallCollision, null, this);
            this.physics.world.collide(this.jellyFishCont, this.wall2, this.onJellyWallCollision, null, this);
            this.physics.world.collide(this.jellyFishCont, this.shark, this.onJellyWallCollision, null, this);
        }
    }
    jellyMovement(){
        if(
            this.input.activePointer.x >= 0 + this.jellyFishCont.body.width &&
            this.input.activePointer.x <= game.config.width - this.jellyFishCont.body.width&&
            !this.fishDead){
            this.jellyFishCont.x = this.input.activePointer.x;
        }
        if(
            this.input.activePointer.y >= 0 + this.jellyFishCont.body.height && 
            this.input.activePointer.y <= game.config.height - this.jellyFishCont.body.height && 
            !this.fishDead){
            this.jellyFishCont.y = this.input.activePointer.y;
        }
    }
    drawJellyLight(){
        this.renderTexture.draw(this.light, this.jellyFishCont.x, this.jellyFishCont.y);
        this.renderTexture.draw(this.lightMid, this.jellyFishCont.x, this.jellyFishCont.y);
        this.renderTexture.draw(this.lightFar, this.jellyFishCont.x, this.jellyFishCont.y);
    }

    
    //functions
    onSharkCollision(){
        this.gameOver = true;
        this.fishDead = true;
    }
    onJellyWallCollision(){
        this.jellyDown = true;
        var timer = this.time.addEvent({
            delay: 5000,                // ms
            callback: this.resetJelly,
            
            callbackScope: this,
            loop: false
        });
    }
    resetJelly(){
        this.jellyDown = false;
    }
}
