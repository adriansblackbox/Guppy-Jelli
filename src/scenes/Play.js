class Play extends Phaser.Scene{
    preload(){
        this.load.image('platform','./assets/Ground.png');
        this.load.image('player','./assets/Player.png');
    }
    create(){
        this.platforms = this.add.group({removeCallback: function(platform){platform.scene.platformPool.add(platform)}});
        this.platformPool = this.add.group({removeCallback: function(platform){platform.scene.platforms.add(platform)}});
        this.player = new this.player(this,game.config.width/2, game.config.height-borderUISize-boarderPadding);
        
    }
    update(){

    }
    //functions

}