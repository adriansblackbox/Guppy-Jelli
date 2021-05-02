/*  Bailey: using the menu.js from rocket patrol and then modifying it to be far simpler for now
 *  - have hopefully the instructions of our game down 
 *  - put game timer just for testing reseting the state.
 *  - comment: slight concerns on how to make it endless because timer events need to be called in advance and I don't know how to make it endless for now.
 */
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.spritesheet('MainMenu', 'assets/title.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 19});
        this.load.image('button', './assets/dreamButton.png');
        this.load.image('buttonover', './assets/dreamButton_selected.png');
    }
    
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: ' 28px',
            backgroundColor: '#006994',
            color: '#FFFFFF',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Endless Runner prototype #1', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2, 'Use the keys: (W,A,S,D) to move the fish', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'The jelly fish will follow your cursor', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#000080';
        //menuConfig.color = '#FFFFFF';
        //this.add.text(game.config.width/2, game.config.height/2 + (2 *(borderUISize + borderPadding)), 'Press <- for quick session or -> for long session', menuConfig).setOrigin(0.5);

        this.anims.create({
            key: 'Title',
            frames: this.anims.generateFrameNumbers('MainMenu', { start: 0, end: 19, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.start = false;


        this.menuScreen = new title(this, 960/2, 720/2, null, 0);
        this.menuScreen.anims.play('Title', true);

       
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.startBtn = this.add.sprite(150, 250, 'button').setInteractive();

        this.startBtn.on('pointerover', function (event) { this.startBtn.setTexture('buttonover', 0) }, this);
        this.startBtn.on('pointerout', function (event) { this.startBtn.setTexture('button', 0) }, this);
        this.startBtn.on('pointerdown', function (event) {this.scene.start('playScene'); },this); // Start game on click.
    }

    update(){

            //this.scene.start('playScene'); 

    }
    startGame(){
        this.scene.start('playScene'); 
    }

}