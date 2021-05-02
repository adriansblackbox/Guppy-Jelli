class powerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, bodyW, bodyH, offX, offY) {
        super(scene, x, y, texture, frame, bodyW, bodyH);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.body.setImmovable()
        this.speed = 2;
        //this.body.collideWorldBounds = true;

        this.body.setSize(bodyW,bodyH);  //Adrian: collision box adjustments for shark (140,35)
        this.body.offset.x = offX;
        this.body.offset.y = offY;     // WARNING: Keep the offsets even if they're 0.
                                     // Just the way phaser works I guess
        this.currX = 0;
        this.upOrDown = true;
    }

    update() {
        this.x -= this.speed;
        this.currX = this.calculateSine(this.currX);
        this.y -= 10*this.currX;

        if(this.x <= -420){
            //this.x = game.config.width;
            //this.y = Phaser.Math.Between(borderUISize + borderPadding,game.config.height - borderUISize - this.height);
            this.alpha = 0;
            this.reset();
        }
    }

    //definitly not the cleaniest, but it works (maybe something with tweening will be better)
    calculateSine(currX){
        if(currX >= .3){
            this.upOrDown = false;
        }
        if(currX <= -.3){
            this.upOrDown = true;
        }
        if(currX <= .3 && this.upOrDown==true){
            return (currX+.01);
        }
        if (currX >= -.3 && this.upOrDown == false){
            return(currX-.01);
        }
        
    }
    reset() {
        this.x = game.config.width + 420;
        this.y = Phaser.Math.Between(game.config.height/4, game.config.height*(3/4));
        this.alpha = 1;
    }
}