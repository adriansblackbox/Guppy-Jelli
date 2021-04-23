class Player extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.speed = 3;
    }
    create(){

    }
    update(){
        if(keyUP.isDown){
            this.y -=  this.speed;
        }
        if(keyDOWN.isDown){
            this.y +=  this.speed;
        }
        if(keyLEFT.isDown){
            this.x -= this.speed;
        }
        if(keyRIGHT.isDown){
            this.x += this.speed;
        }
    }
}