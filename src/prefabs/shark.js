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
        this.timeVar = 0;

        //this is the variable to change in play to change the sharks delay
        this.respawnDelay = 20000;
    }

    update(delta, spawnNoise) {
        this.x -= this.speed;
        this.timeVar = this.timeVar + delta;

        if(this.x <= -420){
            this.alpha = 0;
            if(this.timeVar > delta + this.respawnDelay){
                this.reset(spawnNoise);
                this.timeVar = 0;    
            }
        }
    }

    reset(spawnNoise) {
        spawnNoise.play();
        this.x = game.config.width + 210;
        this.y = Phaser.Math.Between(game.config.height-200, 200);
        this.alpha = 1;
    }
}