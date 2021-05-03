class Mama extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);

        this.hiddenY = 1700;
    }
    update(ascend){
        if(ascend){
            this.ascend();
        }else{
            this.descend();
        }
    }

    ascend(){
        if(this.y > game.config.height/2){
            this.y -= 8;
        }
    }
    descend(){
        if(this.y < this.hiddenY){
            this.y += 8;
        }
    }
}