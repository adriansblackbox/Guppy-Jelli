class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.accel = 750;
        this.drag = 250;
        this.speed = 200;
        this.body.maxVelocity.set(this.speed, this.speed);
        this.body.collideWorldBounds = true;

        //this.body.setSize(80,46,true);

        this.isMoving = false;
        this.isHurt = false;

        this.body.setSize(80, 46, true);  //Adrian: collision box adjustments for fish
        this.body.offset.x = 0;
        this.body.offset.y = 0;     // WARNING: Keep the offsets even if they're 0.
                                    // Just the way phaser works I guess
    }
    update(){
        this.movement();
        this.clampFun();
    }

    /* Adrian:
        *   Set up sweet motion controls. With this logic, the player can
        *   easily switch between butttons for a smooth experience. Speed
        *   controls the velocity of the player (set by max velocity in the constructor)
        *   and accel controls how fast the player accelerates.
        *  
        *   log:(4/23/2021)
        */
    movement(){
        if(keyUP.isDown && this.y >= borderUISize + borderPadding){
            this.body.setAccelerationY(-this.accel);
            this.body.setAccelerationX(0);
        }
        if(keyDOWN.isDown){
            this.body.setAccelerationY(this.accel);
            this.body.setAccelerationX(0);
        }
        if(keyLEFT.isDown){
            this.body.setAccelerationX(-this.accel);
            this.body.setAccelerationY(0);
            this.flipX = true;
        }
        if(keyRIGHT.isDown){
            this.body.setAccelerationX(this.accel);
            this.body.setAccelerationY(0);
            this.flipX = false;
        }
        
        //Diagonal movent
        if(keyUP.isDown && keyLEFT.isDown){
            this.body.setAccelerationY(-this.accel/2);
            this.body.setAccelerationX(-this.accel/2);
        }
        if(keyUP.isDown && keyRIGHT.isDown){
            this.body.setAccelerationY(-this.accel/2);
            this.body.setAccelerationX(this.accel/2);
        }
        if(keyDOWN.isDown && keyLEFT.isDown){
            this.body.setAccelerationY(this.accel/2);
            this.body.setAccelerationX(-this.accel/2);
        }
        if(keyDOWN.isDown && keyRIGHT.isDown){
            this.body.setAccelerationY(this.accel/2);
            this.body.setAccelerationX(this.accel/2);
        }
        // Idle
        if(!keyUP.isDown && !keyDOWN.isDown && !keyLEFT.isDown && !keyRIGHT.isDown){
            this.stopMoving();
            this.isMoving = false;
        }else{
            this.isMoving = true;
        }
    }

    /* Adrian:
    *   Important note HERE:
    *   I purposly implemented this function incase we want to halt the player manually.
    *   
    *   log:(4/23/2021)
    */
    stopMoving(){
        this.body.setAccelerationX(0);
        this.body.setAccelerationY(0);
        this.body.setDragX(this.drag);
        this.body.setDragY(this.drag);
    }
    clampFun(){
        if(this.y >= game.config.height - this.body.height){
            this.body.setAccelerationY(-this.accel);
            this.body.setAccelerationX(0);
        }
        if(this.y <= 0 + this.body.height){
            this.body.setAccelerationY(this.accel);
            this.body.setAccelerationX(0);
        }
        if(this.x >= game.config.width - this.body.width){
            this.body.setAccelerationY(0);
            this.body.setAccelerationX(-this.accel);
        }
        if(this.x <= 0 + this.body.width){
            this.body.setAccelerationY(0);
            this.body.setAccelerationX(this.accel);
        }
    }
}