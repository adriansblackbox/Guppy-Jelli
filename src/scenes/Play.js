class Play extends Phaser.Scene{
    preload(){
        this.load.image('platform','./assets/Ground.png');
        this.load.image('player','./assets/Player.png');
        this.load.image('shark', './assets/temp-shark.png'); // Bailey: temp asset for the shark
        //need a sprite for the jelly
    }
    create(){
        //origionally I started making this work for platforms
        //this.platforms = this.add.group({removeCallback: function(platform){platform.scene.platformPool.add(platform)}});
        //this.platformPool = this.add.group({removeCallback: function(platform){platform.scene.platforms.add(platform)}});

        //work in progress
        //this.player = new this.player(this,game.config.width/2, game.config.height-borderUISize-boarderPadding);

        //this.jellyFish = new JellyFish(this,game.config.width + borderUISize * 6, borderUISize*4, 'JellyFish'); // Bailey: we should make sure to bound the jellyfish to playarea
        this.shark = new Obstacle(this, game.config.width, borderUISize*6 + boarderPadding*4, 'shark', 0).setOrigin(0,0);

        // Bailey: importing old code from rocket patrol to set up bounds, game over state, and finally reset
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
    
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.gameOver = false;

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
        /*this.jellyFish.x = this.input.activePointer.x;
        this.jellyFish.y = this.input.activePointer.y; // Baiely: temporarily commenting this out to see if shark movement across the basic screen works
        */

        if(!this.gameOver){
        this.shark.update();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
    }
    //functions

}