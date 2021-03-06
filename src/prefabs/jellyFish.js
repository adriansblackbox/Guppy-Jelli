class JellyFish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.speed = 3;

        this.body.setSize(40,23,true);
        


        this.body.setSize(20, 30);  //Adrian: collision box adjustments
        this.body.offset.x = 6;
        this.body.offset.y = 2;     // WARNING: Keep the offsets even if they're 0.
                                    // Just the way phaser works I guess
    }

    update() {
       
    }

    reset() {
        this.x = game.config.width + 30;
        this.y = Phaser.Math.Between(borderUISize*5, game.config.height-(borderUIsize*5));
        this.alpha = 1;
    }
}