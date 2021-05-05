class powerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, bodyW, bodyH, offX, offY) {
        super(scene, x, y, texture, frame, bodyW, bodyH);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.body.setImmovable()
        this.speed = 2;

        this.body.setSize(bodyW,bodyH);  //Adrian: collision box adjustments for shark (140,35)
        this.body.offset.x = offX;
        this.body.offset.y = offY;     // WARNING: Keep the offsets even if they're 0.
                                     // Just the way phaser works I guess
        this.currX = 0;
        this.upOrDown = true;
        this.currTime = 0;
        this.timeVar = 0;

        //this is the variable to change to change how often the powerup changes (changes in play)
        this.powerUpRandom = 28000;

        this.powerUpDelayTime = Phaser.Math.Between(this.powerUpRandom, this.powerUpRandom + 3000);
    }

    update(delta) {
        this.x -= this.speed;
        this.currX = this.calculateSine(this.currX);
        this.y -= 10*this.currX;
        this.timeVar = this.timeVar + delta;
        if(this.x <= -20){
            this.alpha = 0;
            if(this.timeVar > delta + this.powerUpDelayTime){
                this.reset();
                this.timeVar = 0;    
            }
        }
        
    }

    //definitly not the cleaniest, but it works (maybe something with tweening will be better)
    calculateSine(currX){
        if(currX >= .5){
            this.upOrDown = false;
        }
        if(currX <= -.5){
            this.upOrDown = true;
        }
        if(currX <= .5 && this.upOrDown==true){
            return (currX+.01);
        }
        if (currX >= -.5 && this.upOrDown == false){
            return(currX-.01);
        }
        
    }
    reset() {
        this.x = game.config.width + 300;
        this.y = game.config.height/2 + 100;
        this.alpha = 1;
        this.upOrDown = true;
        this.currX = 0;
    }
}