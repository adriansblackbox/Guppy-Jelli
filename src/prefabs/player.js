class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.accel = 300;
        this.drag = 200;
        this.speed = 100;
        this.body.maxVelocity.set(this.speed, this.speed);
    }
    create(){
    }
    update(){
        
        /* Adrian:
        *   Set up sweet motion controls. With this logic, the player can
        *   easily switch between butttons for a smooth experience. Speed
        *   controls the velocity of the player (set by max velocity in the constructor)
        *   and accel controls how fast the player accelerates.
        *  
        *   log:(4/23/2021)
        */
       //                           83                                              880
        //&& this.y >= borderUISize + borderPadding && this.y <= game.config.height - borderUISize - this.height
        // Horizontal/Vertical movement
        if(keyUP.isDown && this.y >= borderUISize + borderPadding){
            this.body.setAccelerationY(-this.accel);
            this.body.setAccelerationX(0);
            //console.log(this.y);
        }
        if(keyDOWN.isDown){
            this.body.setAccelerationY(this.accel);
            this.body.setAccelerationX(0);
        }
        if(keyLEFT.isDown){
            this.body.setAccelerationX(-this.accel);
            this.body.setAccelerationY(0);
        }
        if(keyRIGHT.isDown){
            this.body.setAccelerationX(this.accel);
            this.body.setAccelerationY(0);
        }

        //clamping (still need to make it work for diagonal)
        
        
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

        //clamping (still need to make it work for diagonal)
        if(this.y >= game.config.height - borderUISize - this.height){
            this.body.setAccelerationY(-this.accel);
            this.body.setAccelerationX(0);
        }
        if(this.y <= borderUISize + borderPadding){
            this.body.setAccelerationY(this.accel);
            this.body.setAccelerationX(0);
        }
        if(this.x >= game.config.height - borderUISize - this.width){
            this.body.setAccelerationY(0);
            this.body.setAccelerationX(-this.accel);
        }
        if(this.x <= borderUISize + borderPadding){
            this.body.setAccelerationY(0);
            this.body.setAccelerationX(this.accel);
        }

        // Idle
        if(!keyUP.isDown && !keyDOWN.isDown && !keyLEFT.isDown && !keyRIGHT.isDown){
            this.stopMoving();
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
}