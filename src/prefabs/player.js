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
        if(keyUP.isDown){
            this.body.setAccelerationY(-this.accel);
        }
        if(keyDOWN.isDown){
            this.body.setAccelerationY(this.accel);
        }
        if(keyLEFT.isDown){
            this.body.setAccelerationX(-this.accel);
        }
        if(keyRIGHT.isDown){
            this.body.setAccelerationX(this.accel);
        }
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