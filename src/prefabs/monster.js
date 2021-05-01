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
    movement(playerY){
       this.y = playerY;
    }

    /* Adrian:
    *   Important note HERE:
    *   I purposly implemented this function incase we want to halt the player manually.
    *   
    *   log:(4/23/2021)
    */

}