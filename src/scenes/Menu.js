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
        this.load.audio('title_bgm', './assets/Guppy_Title_BGM_Brahm.wav');

        this.load.audio('buttonOver', './assets/comedy_bubble_pop_003.wav');
    }
    
    create() {
        let titleBGMConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            pan: 0
        }

        let buttonConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
            pan: 0
        }

        this.sound.play('title_bgm', titleBGMConfig);

        this.anims.create({
            key: 'Title',
            frames: this.anims.generateFrameNumbers('MainMenu', { start: 0, end: 19, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.start = false;


        this.menuScreen = new title(this, 960/2, 720/2, null, 0);
        this.menuScreen.anims.play('Title', true);

       

        this.startBtn = this.add.sprite(150, 250, 'button').setInteractive();

        this.startBtn.on('pointerover', function (event) { this.startBtn.setTexture('buttonover', 0); this.sound.play('buttonOver', buttonConfig); }, this);
        this.startBtn.on('pointerout', function (event) { this.startBtn.setTexture('button', 0) }, this);
        this.startBtn.on('pointerdown', function (event) {buttonConfig.rate = 2; this.sound.play('buttonOver', buttonConfig); this.scene.start('playScene'); },this); // Start game on click.
    }

    startGame(){
        this.scene.start('playScene'); 
    }

}