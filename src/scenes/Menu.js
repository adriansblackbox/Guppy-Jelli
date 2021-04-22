/*  Bailey: using the menu.js from rocket patrol and then modifying it to be far simpler for now
 *  - have hopefully the instructions of our game down 
 *  - put game timer just for testing reseting the state.
 *  - comment: slight concerns on how to make it endless because timer events need to be called in advance and I don't know how to make it endless for now.
 */
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: ' 28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Endless Runner prototype #1', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use the ^ and v arrows to move the fish', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'The jelly fish will follow your cursor', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + 2(borderUISize + borderPadding), 'Press <- for quick session or -> for long session', menuConfig).setOrigin(0.5);


        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
        
            game.settings = {
                gameTimer: 15000
            }
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                gameTimer: 60000
            }
            this.scene.start('playScene'); 
        }
    }
}