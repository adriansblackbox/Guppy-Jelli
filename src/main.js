//will probably want to change size
// Bailey: doubling size of the canvas from Rocket Patrol Assignment
let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 960,
    scene: [Menu, Play,], // Bailey: reusing the work from Rocket Patrol menu to start the game
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play]
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;

let keyLEFT, keyRIGHT, keyF, keyR, keyUP, keyDOWN; //Bailey: we might need to add keyUP and keyDOWN for the player.