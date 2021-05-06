class skelletonShark extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, bodyW, bodyH, offX, offY) {
        super(scene, x, y, texture, frame, bodyW, bodyH);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.body.setImmovable();
        this.speed = 3;

        this.body.setSize(bodyW,bodyH);  //Adrian: collision box adjustments for shark (140,35)
        this.body.offset.x = offX;
        this.body.offset.y = offY;     // WARNING: Keep the offsets even if they're 0.
        this.timeVar = 0;

        //this is the variable to change in play to change the sharks delay
        this.respawnDelay = 30000;
    }

    update(delta, spawnNoise, monstery) {
        this.x += this.speed;
        this.timeVar = this.timeVar + delta;

        if(this.x >= game.config.width + 420){
            this.alpha = 0;
            if(this.timeVar > delta + this.respawnDelay){
                this.reset(spawnNoise, monstery);
                this.timeVar = 0;    
            }
        }
    }

    reset(spawnNoise, monstery) {
        spawnNoise.play();
        this.x = -420;
        this.y = monstery;
        this.alpha = 1;
    }
}