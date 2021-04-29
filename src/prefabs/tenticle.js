class tenticle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, ground, cieling, bodyW, bodyH, offX, offY, description) {
        if(description == true)
            super(scene, x, y, ground, 0, bodyW, bodyH);
        else
            super(scene, x, y, cieling, 0, bodyW, bodyH);

        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.body.setImmovable()
        this.speed = 3;
        //this.body.collideWorldBounds = true;

        this.body.setSize(bodyW,bodyH);  //Adrian: collision box adjustments for shark (140,35)
        this.body.offset.x = offX;
        this.body.offset.y = offY;     // WARNING: Keep the offsets even if they're 0.
                                     // Just the way phaser works I guess
        this.isFloor = Math.floor(Math.random() * 10); 
        this.preference = description   // true if ground image, false if cieling image

        this.ground = ground;
        this.cieling = cieling;
    }

    update() {
        this.x -= this.speed;

        if(this.x <= -280){
            this.x = game.config.width;
            this.y = Phaser.Math.Between(borderUISize + borderPadding,game.config.height - borderUISize - this.height);
            this.alpha = 0;
            this.reset();
        }
    }

    reset() {

        this.isFloor = Math.floor(Math.random() * 10); 

        if (this.preference)
            this.randomSelect = 2;
        else
        this.randomSelect = 8;

        if( this.isFloor > this.randomSelect){
            this.setTexture(this.ground);
            this.y = game.config.height - 300;
        }else{
            this.setTexture(this.cieling);
            this.y = 0;
        }
        this.x = game.config.width;
        this.alpha = 1;
    }
}