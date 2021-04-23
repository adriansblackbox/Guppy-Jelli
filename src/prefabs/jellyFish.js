class JellyFish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.speed = 3;
    }

    update() {
       
    }

    reset() {
        this.x = game.config.width + 30;
        this.y = Phaser.Math.Between(borderUISize*5, game.config.height-(borderUIsize*5));
        this.alpha = 1;
    }
}