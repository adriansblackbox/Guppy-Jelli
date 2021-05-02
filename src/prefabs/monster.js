class monster extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)


        this.body.setSize(100, 120, true);  //Adrian: collision box adjustments for fish
        this.body.offset.x = 0;
        this.body.offset.y = 0;     // WARNING: Keep the offsets even if they're 0.
                                    // Just the way phaser works I guess
    }
    create(){
    }
    update(playerY){
        
        this.movement(playerY);
    }
    movement(playerY){
       this.y = playerY;
    }
}