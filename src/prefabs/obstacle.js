/*  Bailey: idea this is a general class that which coral and shark will be derived from.
 *  starting off using my code from the ship.js from the Rocket patrol work 
 *
 */
class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(sceme, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.speed = 3;
    }

    update() {
        this.x -= this.speed;

        if(this.x < -this.width){
            this.x = game.config.width; 
        }
    }

    reset() {
        this.x = game.config.width + 30;
        this.y = Phaser.Math.Between(borderUISize*5, game.config.height-(borderUIsize*5));
        this.alpha = 1;
    }
}