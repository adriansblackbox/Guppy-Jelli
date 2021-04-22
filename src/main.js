//will probably want to change size
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height/15;
let boarderPadding = borderUISize/3;

let keyLEFT, keyRIGHT, keyF, keyR;