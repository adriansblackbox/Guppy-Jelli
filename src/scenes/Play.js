class Play extends Phaser.Scene{

    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('platform','./assets/Ground.png');
        this.load.image('player','./assets/Player.png');
        this.load.image('fish','./assets/fish.png');
        this.load.image('shark', './assets/temp-shark.png'); // Bailey: temp asset for the shark
        //need a sprite for the jelly
    }
    create(){
        //origionally I started making this work for platforms
        //this.platforms = this.add.group({removeCallback: function(platform){platform.scene.platformPool.add(platform)}});
        //this.platformPool = this.add.group({removeCallback: function(platform){platform.scene.platforms.add(platform)}});

        //work in progress
        //this.player = new this.player(this,game.config.width/2, game.config.height-borderUISize-boarderPadding);

        this.jellyFishCont = new JellyFish(this,game.config.width + borderUISize * 6, borderUISize*4, 'player'); // Bailey: we should make sure to bound the jellyfish to playarea
        this.shark = new Obstacle(this, game.config.width, borderUISize*6 + borderPadding*4, 'shark', 0).setOrigin(0,0);
        this.player = new Player(this, borderUISize + borderPadding + 100,game.config.height/2, 'fish');

        // Bailey: importing old code from rocket patrol to set up bounds, game over state, and finally reset
        

        let scoreConfig = {
            fontFamily: 'Courier',
            fontsize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
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

        this.clock = this.time.delayedCall(this.timeVariable, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true; 
        }, null, this);
    }
    update(){
        //will need a bool var to check for gameover
        //also might work by not putting x/y, but will test once we get a testable game out

        //the jellyfish is clamped now (can edit how much it is clamped by easily now too)
        if(this.input.activePointer.x >= borderUISize + borderPadding && this.input.activePointer.x <= game.config.width - borderUISize - this.jellyFishCont.width){
            this.jellyFishCont.x = this.input.activePointer.x;
        }
        if(this.input.activePointer.y >= borderUISize + borderPadding && this.input.activePointer.y <= game.config.height - borderUISize - this.jellyFishCont.height){
            this.jellyFishCont.y = this.input.activePointer.y; // Baiely: temporarily commenting this out to see if shark movement across the basic screen works
        }

        if(!this.gameOver){
            this.shark.update();
            this.player.update();
        }else{
            this.player.stopMoving();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
    }
    //functions

}