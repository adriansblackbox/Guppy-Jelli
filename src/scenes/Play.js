class Play extends Phaser.Scene{
    preload(){
        this.load.image('platform','./assets/Ground.png');
        this.load.image('player','./assets/Player.png');
        //need a sprite for the jelly
    }
    create(){
        //origionally I started making this work for platforms
        //this.platforms = this.add.group({removeCallback: function(platform){platform.scene.platformPool.add(platform)}});
        //this.platformPool = this.add.group({removeCallback: function(platform){platform.scene.platforms.add(platform)}});

        //work in progress
        //this.player = new this.player(this,game.config.width/2, game.config.height-borderUISize-boarderPadding);

        this.jellyFish = new JellyFish(this,game.config.width + borderUISize * 6, borderUISize*4, 'JellyFish');

    }
    update(){
        //will need a bool var to check for gameover
        //also might work by not putting x/y, but will test once we get a testable game out
        this.jellyFish.x = this.input.activePointer.x;
        this.jellyFish.y = this.input.activePointer.y;
    }
    //functions

}