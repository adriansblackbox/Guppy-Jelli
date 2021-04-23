/*  Bailey: idea this is a general class that which coral and shark will be derived from.
 *  starting off using my code from the ship.js from the Rocket patrol work rdr
 *
 */
class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.body.setImmovable()
        this.speed = 2;
        this.body.collideWorldBounds = true;
    }

    update() {
        this.x -= this.speed;

        if(this.x <= borderUISize + borderPadding){
            this.x = game.config.width;
            this.y = Phaser.Math.Between(borderUISize + borderPadding,game.config.height - borderUISize - this.height);
        }
    }

    reset() {
        this.x = game.config.width + 30;
        this.y = Phaser.Math.Between(borderUISize*5, game.config.height-(borderUIsize*5));
        this.alpha = 1;
    }
}