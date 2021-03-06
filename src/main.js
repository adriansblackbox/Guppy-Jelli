//will probably want to change size
// Bailey: doubling size of the canvas from Rocket Patrol Assignment
let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
    pixelArt: true,
    scene: [Menu, Play], // Bailey: reusing the work from Rocket Patrol menu to start the game

    physics: {               // Adrian: set built in physics to arcade physics. gravity is 0 currently
        default: 'arcade',   // log: (4/23/21)
        arcade: {
            debug: false,    // Set to true for testing purposes only
            gravity: {
                x: 0,
                y: 0
            },
            fps: 60
        }
    },
    // scale game logic
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
 
};


let game = new Phaser.Game(config);
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;


let keyLEFT, keyRIGHT, keyF, keyR, keyUP, keyDOWN, keySPACE; //Bailey: we might need to add keyUP and keyDOWN for the player.
