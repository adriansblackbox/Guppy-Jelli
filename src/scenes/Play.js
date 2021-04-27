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
        this.load.spritesheet('sharkswim', 'assets/shark.png', {frameWidth: 140, frameHeight: 56, startFrame: 0, endFrame: 30});
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
            frames: this.anims.generateFrameNumbers('fishswim', { start: 0, end: 15, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'shark',
            frames: this.anims.generateFrameNumbers('sharkswim', { start: 0, end: 30, first: 0}),
            frameRate: 10
        });

        
        this.background = this.add.image(game.config.width-370, borderUISize+350, 'BG');

        this.shark = new Obstacle(this, game.config.width, borderUISize*6 + borderPadding*4,null, 0, 140, 35).setOrigin(0,0);

        //this.middle = this.add.image(game.config.width-370, borderUISize+350, 'middle');

        
        //really close to working, just need to figure out how to make the shark an image not an object
        //const cX = game.config.width + borderUISize * 6;
        //const cY = borderUISize*4;
        const cX = game.config.width-370;
        const cY = borderUISize+350;

    
        //this.cover = this.add.image(game.config.width-370, borderUISize+350, 'cover'); // these values should be variables (570,350)
        //const reveal = this.add.image(cX, cY, 'cover');
        //reveal.alpha = 0;
        //this.cover = this.add.image(cX, cY, 'cover'); // these values should be variables (570,350)
        //this.cover.alpha = 0.8;
        const image = this.add.image(cX, cY, 'cover');

        const shape = this.make.graphics();

        shape.fillStyle(0x000000);

        shape.beginPath();

        shape.moveTo(0,0);

        shape.arc(0,0, 250, 0, Math.PI *2);

        shape.fillPath();

        const mask = shape.createGeometryMask();

        image.setMask(mask);

        this.input.on('pointermove', function (pointer) {

            shape.x = pointer.x;
            shape.y = pointer.y;

        });

        //const covWidth = this.cover.width;
        //const covHeight = this.cover.height;

        //const rt = this.make.renderTexture({
        //    width: covWidth,
        //    height: covHeight,
        //    add: false
        //})
        //const maskImage = this.make.image({
        //    cX,
        //    cY,
        //    key: rt.texture.key,
        //    add: false
        //})
        //this.cover.mask = new Phaser.Display.Masks.BitmapMask(this,maskImage);
        //this.cover.mask.invertAlpha = true;

        //reveal.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage);

        //this.light = this.add.circle(0,0,30,0x000000,1);    //circle with radius of 30 and alpha of 1
        //this.light.visible = false;

        //this.renderTexture = rt;

        //this.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this);

        //this.renderTexture = rt;
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
    }

    //handlePointerMove(pointer){
    //
    //    const x = pointer.x - this.cover.x + (this.cover.width * 0.5);
    //    const y = pointer.y - this.cover.y + (this.cover.height * 0.5);
    //    
    //    this.renderTexture.clear();
    //    this.renderTexture.draw(this.light, x, y);
    //}

    update(){
        //the jellyfish is clamped now (can edit how much it is clamped by easily now too)

        // Adrian: Collision detection between shark and fish calls onSharkCollision
        // log(4,23,21)
        if(!this.fishDead)
            this.physics.world.collide(this.player, this.shark, this.onSharkCollision, null, this);

        if(this.input.activePointer.x >= borderUISize + borderPadding && this.input.activePointer.x <= game.config.width - borderUISize - this.jellyFishCont.width){
            this.jellyFishCont.x = this.input.activePointer.x;
        }
        if(this.input.activePointer.y >= borderUISize + borderPadding && this.input.activePointer.y <= game.config.height - borderUISize - this.jellyFishCont.height){
            this.jellyFishCont.y = this.input.activePointer.y; // Baiely: temporarily commenting this out to see if shark movement across the basic screen works
        }


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

        if(!this.gameOver){
            this.shark.update();
            this.player.update();
            this.player.anims.play('swim', true);
            this.shark.anims.play('shark', true);

            if(this.player.isMoving){
                this.player.anims.msPerFrame = 35;
            }else{
                this.player.anims.msPerFrame = 75;
            }

        }else{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.player.stopMoving();
            this.player.anims.play('swim', false );
            this.shark.anims.play('shark', false);
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