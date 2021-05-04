class tentacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, ground, cieling, bodyW, bodyH, offX, offY, description) {
        if(description == true)
            super(scene, x, y, ground, 0, bodyW, bodyH);
        else
            super(scene, x, y, cieling, 0, bodyW, bodyH);

        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.body.setImmovable()
        this.speed = 1.5;
        //this.body.collideWorldBounds = true;

        this.body.setSize(bodyW,bodyH);  //Adrian: collision box adjustments for shark (140,35)
        this.body.offset.x = offX;
        this.body.offset.y = offY;     // WARNING: Keep the offsets even if they're 0.
                                       // Just the way phaser works I guess
        this.isFloor = Math.floor(Math.random() * 10); 
        this.preference = description   // true if ground image, false if cieling image

        this.cieling = 0;
        this.ground = game.config.height;

        this.goingDown = true;
        this.goingUp = true;

        this.yorigin = y;

        this.tenteacleYVar = 1.5;

        this.ySpeed = Phaser.Math.Between(this.tenteacleYVar, this.tenteacleYVar + 1.5);

    }

    update() {
        this.x -= this.speed;
        if(this.preference){
            if(this.goingDown){
                this.downG(this.ground);
            }else
                this.upG(this.ground);
        }else{
            if(this.goingUp){
                this.upC(this.cieling);
            }else
                this.downC(this.cieling);
        }

        if(this.x <= -100){
            this.x = game.config.width + 50;
            this.alpha = 0;
            this.reset();
        }

    }

    reset() {


        if(this.preference){
            this.y = this.yorigin;
        }else{
            //this.setTexture(this.cieling);
            this.y = 0;
        }
        this.x = game.config.width;
        this.alpha = 1;

        this.ySpeed = Phaser.Math.Between(this.tenteacleYVar, this.tenteacleYVar+1.5);
    }


    upG(anchor){
        
        if(this.y > this.yorigin){  // Going up
            this.y -= this.ySpeed;
        }else{
            this.goingDown = true;
        }

    }
    downG(anchor){
        if(this.y < anchor - 100){  // Going down
            this.y += this.ySpeed;
        }else{
            this.goingDown = false;
        }
    }


    upC(anchor){
        
        if(this.y > anchor -300){  // Going up
            this.y -= this.ySpeed;
        }else{
            this.goingUp = false;
        }

    }
    downC(anchor){
        if(this.y < this.yorigin){  // Going down
            this.y += this.ySpeed;
        }else{
            this.goingUp = true;
        }
    }
}