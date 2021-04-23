class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.speed = 300;
        this.drag = 200;
    }
    create(){

    }
    update(){
        if(keyUP.isDown){
            this.body.setAccelerationY(-this.speed);
        }
        else if(keyDOWN.isDown){
            this.body.setAccelerationY(this.speed);
        }
        else if(keyLEFT.isDown){
            this.body.setAccelerationX(-this.speed);
        }
        else if(keyRIGHT.isDown){
            this.body.setAccelerationX(this.speed);
        }
        else{
            this.body.setAccelerationX(0);
            this.body.setAccelerationY(0);
            this.body.setDragX(this.drag);
            this.body.setDragY(this.drag);
        }
    }
}