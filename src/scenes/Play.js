class Play extends Phaser.Scene{

    constructor() {
        super("playScene");
        this.light = null;
    }

    preload(){
        this.load.image('platform','./assets/Ground.png');
        this.load.image('player','./assets/Player.png');
        this.load.image('fish','./assets/fish.png');
        this.load.image('shark', './assets/temp-shark.png'); // Bailey: temp asset for the shark
        this.load.image('cover', './assets/BlackCover.png');
        //need a sprite for the jelly
    }
    create(){

        //Adrian: Boolean var for checking if the player has died
        this.fishDead = false;

        //origionally I started making this work for platforms
        //this.platforms = this.add.group({removeCallback: function(platform){platform.scene.platformPool.add(platform)}});
        //this.platformPool = this.add.group({removeCallback: function(platform){platform.scene.platforms.add(platform)}});

        //work in progress
        //this.player = new this.player(this,game.config.width/2, game.config.height-borderUISize-boarderPadding);

        this.jellyFishCont = new JellyFish(this,game.config.width + borderUISize * 6, borderUISize*4, 'player'); // Bailey: we should make sure to bound the jellyfish to playarea
        this.shark = new Obstacle(this, game.config.width, borderUISize*6 + borderPadding*4, 'shark', 0).setOrigin(0,0);
        this.player = new Player(this, borderUISize + borderPadding + 100,game.config.height/2, 'fish');

        /*
        //really close to working, just need to figure out how to make the shark an image not an object
        const cX = game.config.width + borderUISize * 6;
        const cY = borderUISize*4;
        this.cover = this.add.image(game.config.width + borderUISize * 6, borderUISize*4, 'cover');
        const covWidth = this.cover.width;
        const covHeight = this.cover.height;
        const rt = this.make.renderTexture({
            covWidth,
            covHeight,
            add: false
        })
        const maskImage = this.make.image({
            cX,
            cY,
            key: rt.texture.key,
            add: false
        })
        this.cover.mask = new Phaser.Display.Masks.BitmapMask(this,maskImage);
        this.cover.mask.invertAlpha = true;
        this.shark.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage);
        this.light = this.add.circle(0,0,30,0x000000,1);    //circle with radius of 30 and alpha of 1
        this.light.visible = false;
        this.input.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this);
        this.renderTexture = rt;
        */

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
    }

    handlePointerMove(pointer){
        const x = pointer.x - this.cover.x + this.cover.width * .5;
        const y = pointer.y - this.cover.y + this.cover.height * .5;
        this.renderTexture.clear();
        this.renderTexture.draw(this.light, x, y);
    }

    update(){
        //will need a bool var to check for gameover
        //also might work by not putting x/y, but will test once we get a testable game out

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
        }else{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.player.stopMoving();
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