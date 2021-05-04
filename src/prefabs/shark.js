/*  Bailey: idea this is a general class that which coral and shark will be derived from.
 *  starting off using my code from the ship.js from the Rocket patrol work rdr
 *
 */
class shark extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, bodyW, bodyH, offX, offY) {
        super(scene, x, y, texture, frame, bodyW, bodyH);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.body.setImmovable();
        this.speed = 2;
        //this.body.collideWorldBounds = true;

        this.body.setSize(bodyW,bodyH);  //Adrian: collision box adjustments for shark (140,35)
        this.body.offset.x = offX;
        this.body.offset.y = offY;     // WARNING: Keep the offsets even if they're 0.
                                     // Just the way phaser works I guess
        this.timeVar = 0;
    }

    update(delta) {
        this.x -= this.speed;
        this.timeVar = this.timeVar + delta;

        if(this.x <= -420){
            this.alpha = 0;
            if(this.timeVar > delta + 20000){
                this.reset();
                this.timeVar = 0;    
            }
        }
    }

    reset(time) {
        this.x = game.config.width + 210;
        this.y = Phaser.Math.Between(game.config.height-200, 200);
        this.alpha = 1;
    }
}