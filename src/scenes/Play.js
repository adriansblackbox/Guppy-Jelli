class Play extends Phaser.Scene{

    constructor() {
        super("playScene");
        //this.light = null;
        //this.renderTexture = null;
        
    }

    preload(){
        this.load.audio('play_scene_bgm','./assets/zapsplat_vehicles_submarine_small_personal_onboard_ambience_underwater_25576 (play scene bgm).wav');
        this.load.audio('gameover', './assets/sound_design_big_underwater_reversed_reverb_bubbles_sound_design_element (gameover).wav');
        this.load.audio('monster_hurt', './assets/lukas_tvrdon_impact_underwater_or_space_crash_distant_d_032(Monster hurt).wav');
        this.load.audio('monster_warning', './assets/lukas_tvrdon_impact_underwater_or_space_massive_b_034(monster Warning sound).wav');
        this.load.audio('chomp', './assets/chomp.wav');
        this.load.audio('pop1', './assets/comedy_bubble_pop_001.wav');
        this.load.audio('pop2', './assets/comedy_bubble_pop_002.wav');
        this.load.audio('pop3', './assets/comedy_bubble_pop_003.wav');
        this.load.audio('shark_pass1', './assets/zapsplat_nature_water_underwater_whoosh_movement_pass_med_designed_001_59240(shark movement3).wav');
        this.load.audio('shark_pass2', './assets/zapsplat_nature_water_underwater_whoosh_movement_pass_med_designed_002_59241(shark movement2).wav');
        this.load.audio('shark_pass3', './assets/zapsplat_nature_water_underwater_whoosh_movement_pass_med_designed_003_59242(shark movement1).wav');
        this.load.audio('swim', './assets/swim.wav');
        this.load.audio('dream_start', './assets/476612__avaruusnuija__bubbles-14.wav');


        this.load.image('cover', './assets/BlackCover.png');
        this.load.image('covercover', './assets/cover_cover.png');
        this.load.image('BG', './assets/first_background.png');
        this.load.image('base0', './assets/base_0.png');
        this.load.image('base1', './assets/base_1.png');
        this.load.image('base2', './assets/base_2.png');
        this.load.image('base3', './assets/base_3.png');
        this.load.image('wall1', './assets/wall1.png');
        this.load.image('chomp', './assets/deathWallClosed.png');
        this.load.image('dreamOver', './assets/dreamOver.png');

        this.load.spritesheet('fishswim', 'assets/feesh_spreadsheet.png', {frameWidth: 80, frameHeight: 46, startFrame: 0, endFrame: 14});
        this.load.spritesheet('sharkswim', 'assets/shark.png', {frameWidth: 420, frameHeight: 168, startFrame: 0, endFrame: 30});
        this.load.spritesheet('jelly', 'assets/jelly.png', {frameWidth: 32, frameHeight: 40, startFrame: 0, endFrame: 21});
        this.load.spritesheet('jellyHurt', 'assets/jelliOuch.png', {frameWidth: 32, frameHeight: 40, startFrame: 0, endFrame: 1});
        this.load.spritesheet('tentacle', 'assets/tentacle_bigger.png', {frameWidth: 120, frameHeight: 450, startFrame: 0, endFrame: 31});
        this.load.spritesheet('monster', 'assets/deathWall.png', {frameWidth: 1200, frameHeight: 820, startFrame: 0, endFrame: 24});
        this.load.spritesheet('fishHurt', 'assets/guppyOuch.png', {frameWidth: 80, frameHeight: 46, startFrame: 0, endFrame: 1});
        this.load.spritesheet('collectable', 'assets/jellyBubble.png', {frameWidth: 21, frameHeight: 20, startFrame: 0, endFrame: 9});
        this.load.spritesheet('mamajelly', 'assets/mamaJelly.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 22});
        //need a sprite for the jelly
        this.canvas = this.sys.canvas;
        this.canvas.style.cursor = 'none';
        
        
    }
    create(){
        //Bailey: really rough sound stopping
        this.sound.stopByKey('title_bgm');
        this.sound.stopByKey('gameover');
        //Adrian: Boolean var for checking if the player has died
        this.fishDead = false;
        this.gameOver = false;
        this.jellyDown = false;
        this.wall2Delayed = false;
        this.wall3Delayed = false;
        this.wall4Delayed = false;
        this.mamaLightOn = false;
        this.mamaAcsend = false;
        this.gameOvernoise = false;
        this.sharkNoise = false;
        this.dream_started = false;

        this.advanceMonster = false;
        this.retreatMonster = false;
        this.isChomped = false;

        this.startGame = false;

        this.initializeKeys();
        this.creatAnims();

        const cX = game.config.width/2;
        const cY = game.config.height/2;
        // Bailey: setting up the bgm sound config
        let playSceneBGMConfig = {
            mute: false,
            volume: 0.3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            pan: 0
        }
        this.sound.play('play_scene_bgm', playSceneBGMConfig);
        // 
        this.background = this.add.tileSprite(cX, cY , 1920, 720, 'BG');

        this.base0 = this.add.tileSprite(cX, cY - 30, 1920, 720, 'base0');
        this.Mama = new Mama(this, game.config.width/2, 1700, null, 0);
        this.Mama.alpha = 0.7;
        this.base1 = this.add.tileSprite(cX, cY - 30, 1920, 720, 'base1');
        this.base2 = this.add.tileSprite(cX, cY, 1920, 720, 'base2');
        this.base3 = this.add.tileSprite(cX, cY, 1920, 720, 'base3');

        this.wall1 = new tentacle(
            this, game.config.width, game.config.height - 450,  //gorund
            null, null, 40, 450, 30, 0, true).setOrigin(0,0);

        this.wall3 = new tentacle(
            this, game.config.width, game.config.height - 450,  //gorund
            null, null, 40, 450, 30, 0, true).setOrigin(0,0);

        this.wall2 = new tentacle(
            this, game.config.width, 0, 
            null, null, 40, 450, 30, 0, false).setOrigin(0,0);  // cieling

        this.wall4 = new tentacle(
            this, game.config.width, 0, 
            null, null, 40, 450, 30, 0, false).setOrigin(0,0);  // cieling

        this.wall1.anims.play('tentacle', true);
        this.wall2.anims.play('tentacle', true);
        this.wall1.flipY = true;
        this.wall3.anims.play('tentacle', true);
        this.wall4.anims.play('tentacle', true);
        this.wall3.flipY = true;
    
        this.shark = new shark(this, game.config.width + 210,game.config.height/2, null, 0, 150, 70, 15, 50).setOrigin(0,0);
        this.monster = new monster(this, -600, game.config.height/2, 'monster',0);
        

        //====================== Place hidden things ^ =============================
        //==========================================================================

        this.lightEffect(cX, cY);
        this.particles = this.add.tileSprite(cX, cY, 960, 720, 'covercover');
        
        this.player = new Player(this, borderUISize + borderPadding + 100,game.config.height/2);
        this.jellyFishCont = new JellyFish(this,game.config.width + borderUISize * 6, borderUISize*4, 'fish'); 


        this.powerUp = new powerUp(this, game.config.width + 12 ,game.config.height/2, null, 0, 20, 21, 0, 0);
        this.gameOverTitle = this.add.sprite(game.config.width/2 + 40 ,game.config.height/2, 'dreamOver');
        this.gameOverTitle.alpha = 0;

        this.jellyFishCont.alpha = 0.75; 


        //dawdddwathis.timeVariable = game.settings.gameTimer;

        //this.clock = this.time.delayedCall(this.timeVariable, () => {
            //this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            //this.gameOver = true; 
        //}, null, this);

        //setting up time text
        let timeConfig = {fontFamily: 'NanumPenScript', fontSize: '40px', backgroundColor: null/*'#30D5C8'*/, color: '#FFFFFF', align: 'left', padding:{left: 5, top: 5, bottom: 5,}, fixedWidth: 500}
        let warning = {fontFamily: 'NanumPenScript', fontSize: '30px', backgroundColor: null/*'#30D5C8'*/, color: '#000000', align: 'left', padding:{left: 5, top: 5, bottom: 5,}, fixedWidth: 500}
        this.timeLeft = this.add.text(0, 0, '', timeConfig);
        // Instructions
        
        this.startInstruction = this.add.text(game.config.height/2 - 20, game.config.width/2, 'Press SPACE to Start', timeConfig);
        this.hiddenMessage = this.add.text(game.config.height/2 - 80, game.config.width/2 + 100, 'beware the monsters lurking in the dark', warning);
        timeConfig.fontSize = '25px';
        this.fishInstructions = this.add.text(0, 0, 'W-A-S-D to Move the Fish', timeConfig);
        this.jellyInstructions = this.add.text(game.config.width - 320, 0, 'Move The Mouse to Guide the Light', timeConfig);
        timeConfig.fontSize = '30px';
        this.restartInstruction = this.add.text(game.config.height/2 + 30, game.config.width/2 + 60, '', timeConfig);
        timeConfig.fontSize = '50px';
        this.highScore = this.add.text(game.config.height/2 - 80, 150, '', timeConfig);

        timeConfig.fontSize = '40px';

        this.timeVar = 0;
        this.timePassed = 0;
        this.difficultyTime = 0;

        let swimConfig = {
            mute: false,
            volume: 0.4,
            rate: 0.5,
            seek: 0,
            loop: true,
            delay: 0
        };

        let sharkSpawnConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            seek: 0,
            loop: false,
            delay: 0
        };

        this.sharkSpawn = this.sound.add('shark_pass1', sharkSpawnConfig);

        this.swimNoise = this.sound.add('swim', swimConfig);

        this.swimNoise.play();
    }
    creatAnims(){
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('fishswim', { start: 0, end: 14, first: 0}),
            frameRate: 15
        });
        this.anims.create({
            key: 'shark',
            frames: this.anims.generateFrameNumbers('sharkswim', { start: 0, end: 30, first: 0}),
            frameRate: 10
        });
        this.anims.create({
            key: 'jelly',
            frames: this.anims.generateFrameNumbers('jelly', { start: 0, end: 21, first: 0}),
            frameRate: 13
        });
        this.anims.create({
            key: 'tentacle',
            frames: this.anims.generateFrameNumbers('tentacle', { start: 0, end: 31, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'monster',
            frames: this.anims.generateFrameNumbers('monster', { start: 0, end: 24, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fishHurt',
            frames: this.anims.generateFrameNumbers('fishHurt', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'jellyHurt',
            frames: this.anims.generateFrameNumbers('jellyHurt', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'collectable',
            frames: this.anims.generateFrameNumbers('collectable', { start: 0, end: 9, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'mamajelly',
            frames: this.anims.generateFrameNumbers('mamajelly', { start: 0, end: 22, first: 0}),
            frameRate: 12,
            repeat: -1
        });
    }
    lightEffect(cX, cY){
        this.lightRad = 250;
        this.mamaLightRad = 960;
        const reveal = this.add.image(cX, cY, 'cover');
        reveal.alpha = 0

        this.cover = this.add.image(cX, cY, 'cover');
        this.cover.alpha = 1

        const covWidth = this.cover.width;
        const covHeight = this.cover.height;

        const rt = this.make.renderTexture({
            width: covWidth,
            height: covHeight,
            add: false
        }) 
        const maskImage = this.make.image({
            x: game.config.width/2,
            y: game.config.height/2,
            key: rt.texture.key,
            add: false
        })
        this.cover.mask = new Phaser.Display.Masks.BitmapMask(this,maskImage);
        this.cover.mask.invertAlpha = true;

        reveal.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage);

        this.light = this.add.circle(0,0,this.lightRad - 25,0x000000,1);    //circle with radius of 30 and alpha of 1
        this.light.visible = false;
        this.lightMid = this.add.circle(0,0,this.lightRad - 10,0x000000,0.5);    //circle with radius of 30 and alpha of 1
        this.lightMid.visible = false;
        this.lightFar = this.add.circle(0,0,this.lightRad,0x000000,0.25);    //circle with radius of 30 and alpha of 1
        this.lightFar.visible = false;

        this.mamalight = this.add.circle(0,0,this.mamaLightRad - 25,0x000000,1);    //circle with radius of 30 and alpha of 1
        this.mamalight.visible = false;
        this.mamalightMid = this.add.circle(0,0,this.mamaLightRad - 10,0x000000,0.5);    //circle with radius of 30 and alpha of 1
        this.mamalightMid.visible = false;
        this.mamalightFar = this.add.circle(0,0,this.mamaLightRad,0x000000,0.25); 
        this.mamalightFar.visible = false;

        this.renderTexture = rt;


        this.renderTexture = rt;
        this.renderTexture.setOrigin(game.config.width/2, game.config.height/2);
    }

    initializeKeys(){
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    update(time,delta){

        if(keySPACE.isDown){
            this.startGame = true;
            if(!this.dream_started){
                this.sound.play('dream_start', {mute: false, volume: 1, rate: 1, detune: 0, seek: 0, loop: false, delay: 0});
                this.dream_started = true;
            }
        }
        //the jellyfish is clamped now (can edit how much it is clamped by easily now too)

        if(!this.advanceMonster || this.mamaLightOn){
            this.background.tilePositionX += 0.7;
            this.base0.tilePositionX += 0.8;
            this.base1.tilePositionX += 0.9;
            this.base2.tilePositionX += 1;
            this.base3.tilePositionX += 1.1;
            this.particles.tilePositionX += 0.7;
        }


        // Adrian: Collision detection between shark and fish calls onSharkCollision
        // log(4,23,21)
        this.collisions();
        this.jellyMovement();
        

        //for the gameover text, if we want the top to not have as large as box we may need to change the fixedwidth in between the two texts
        

        //this.timeLeft.setText("Time: " + Math.round(this.timeVar*.001));
        //this.shark.speed += (this.timeVar*.000001);   //one way of speeding up sharks
        //if(Math.round(this.timeVar*.001) >= this.timePassed+10){    //10 is the amount of time passed before it speeds up
            //this.shark.speed += 1;
            //this.timePassed+=10;
        //}
        if(!this.gameOver){
            if(this.startGame){
                this.startInstruction.setText('');
                this.fishInstructions.setText('');
                this.jellyInstructions.setText('');
                this.hiddenMessage.setText('');
                this.timeLeft.setText("Dream Seconds: " + Math.round(this.timeVar*.001));
                this.timeVar = this.timeVar + delta;
                this.difficultyTime = this.difficultyTime + delta;
                this.updateTenticles();

                if( Math.round(this.timeVar*.001) > 10){
                    //this.sharkSpawn.play();
                    this.shark.update(delta, this.sharkSpawn);
                }
                if( Math.round(this.timeVar*.001) > 15)
                    this.powerUp.update(delta);
            }
            if(this.difficultyTime >= 30000 && this.wall1.speed <= 5){
                this.difficultyTime = 0;
                this.wall1.speed += 1;
                this.wall2.speed += 1;
                this.wall3.speed += 1;
                this.wall4.speed += 1;
                this.wall1.tenteacleYVar += 1.25;
                this.wall2.tenteacleYVar += 1.25;
                this.wall3.tenteacleYVar += 1.25;
                this.wall4.tenteacleYVar += 1.25;
                this.shark.speed += 1;
                this.shark.respawnDelay -= 2000;
                this.powerUp.powerUpRandom += 5000;
            }
            this.player.update();
            this.Mama.update(this.mamaAcsend);
            if(!this.advanceMonster)
                this.playerSwim();
            else
                this.playerHurt();
            
            this.monster.update(this.player);
            this.shark.anims.play('shark', true);
            this.Mama.anims.play('mamajelly', true);
            if(!this.jellyDown)
                this.jellyFishCont.play('jelly', true);
            else
                this.jellyFishCont.play('jellyHurt', true);

            this.monster.anims.play('monster', true);
            
            this.powerUp.anims.play('collectable', true);

            // light x/y values handled here
            this.renderTexture.clear();

            if(this.jellyDown){
                if(this.lightRad > 100){
                    this.lightRad -= 4;
                }
                this.light.radius = this.lightRad - 15;
                this.lightMid.radius = this.lightRad - 5;
                this.lightFar.radius = this.lightRad;
            }else{
                if(this.lightRad < 250){
                    this.lightRad += 4;
                }
                this.light.radius = this.lightRad - 15;
                this.lightMid.radius = this.lightRad - 5;
                this.lightFar.radius = this.lightRad;
            }
                
            this.drawJellyLight();
            this.drawMamaLight();
            
           
            

            if(this.advanceMonster && this.monster.x <= this.monster.currentX + 200 && !this.mamaLightOn){
                this.monster.advance();
                this.background.tilePositionX -= 0.7/2;
                this.base0.tilePositionX -= 0.8/2;
                this.base1.tilePositionX -= 0.9/2;
                this.base2.tilePositionX -= 1/2;
                this.base3.tilePositionX -= 1.1/2;
                this.particles.tilePositionX -= 0.7/2;
            }else if(this.monster.x >= this.monster.currentX + 200){
                this.advanceMonster = false;
            }

            if(this.retreatMonster && this.monster.x >= this.monster.currentX - 200 && this.monster.x > -600){
                this.monster.retreat();
            }else if(this.monster.x <= this.monster.currentX - 200 || this.monster.x <= -600){
                this.retreatMonster = false
            }

        }else{
            this.sound.stopByKey('play_scene_bgm');
            if(!this.gameOvernoise){
                this.sound.play('chomp', {mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0});
                this.gameOvernoise = true;
            }
            this.swimNoise.stop();
            this.player.stopMoving();
            this.player.anims.play('swim', false );
            this.player.alpha = 0;
            this.shark.anims.play('shark', false);
            this.jellyFishCont.play('jelly', false);
            this.monster.anims.play('monster', false);
            if(this.isChomped){
                this.monster.setTexture('chomp',0);
            }
            this.jellyFishCont.alpha = 0;

            //this.renderTexture.clear();
            this.drawJellyLight();
            this.gameOverTitle.alpha = 1;
            this.timeLeft.setText("");
            this.restartInstruction.setText('Press R to Dream Again');
            this.highScore.setText('Dream Seconds Lasted: ' + Math.round(this.timeVar*.001));

        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
    }

    playerSwim(){
        this.player.anims.play('swim', true);
        if(this.player.isMoving){
            this.player.anims.msPerFrame = 35;
            if(this.swimNoise.rate < 0.90)
                this.swimNoise.rate += 0.01;
        }else{
            this.player.anims.msPerFrame = 75;
            if(this.swimNoise.rate > 0.1){
                this.swimNoise.rate -= 0.01
            }
        }
    }
    playerHurt(){
        this.player.anims.play('fishHurt', true);

    }

    updateTenticles(){
        this.wall1.update();
        if(this.wall2Delayed){
            this.wall2.update();
        }else if(this.wall1.x <= game.config.width - 252){
            this.wall2Delayed = true;
        }
        if(this.wall3Delayed){
            this.wall3.update();
        }else if(this.wall2.x <= game.config.width - 252){
            this.wall3Delayed = true;
        }
        if(this.wall4Delayed){
            this.wall4.update();
        }else if(this.wall3.x <= game.config.width - 252){
            this.wall4Delayed = true;
        }
    }

    collisions(){
        if(!this.fishDead){
            this.physics.world.collide(this.player, this.shark, this.onSharkCollision, null, this);

            //powerup
            if(!this.mamaLightOn) {
                this.physics.world.collide(this.player, this.powerUp, this.onPowerUpCollision, null, this);

                this.physics.world.collide(this.jellyFishCont, this.wall1, this.onJellyWallCollision, null, this);
                this.physics.world.collide(this.jellyFishCont, this.wall2, this.onJellyWallCollision, null, this);
                this.physics.world.collide(this.jellyFishCont, this.wall3, this.onJellyWallCollision, null, this);
                this.physics.world.collide(this.jellyFishCont, this.wall4, this.onJellyWallCollision, null, this);
                this.physics.world.collide(this.jellyFishCont, this.shark, this.onJellyWallCollision, null, this);
            }

            if(!this.advanceMonster && !this.mamaLightOn){
                this.physics.world.collide(this.player, this.wall1, this.advance, null, this);
                this.physics.world.collide(this.player, this.wall2, this.advance, null, this);
                this.physics.world.collide(this.player, this.wall3, this.advance, null, this);
                this.physics.world.collide(this.player, this.wall4, this.advance, null, this);
            }

            this.physics.world.collide(this.player, this.monster, this.monsterChomp, null, this);
        }
    }
    jellyMovement(){
        if(
            this.input.activePointer.x >= 0 + this.jellyFishCont.body.width &&
            this.input.activePointer.x <= game.config.width - this.jellyFishCont.body.width){
            this.jellyFishCont.x = this.input.activePointer.x;
        }
        if(
            this.input.activePointer.y >= 0 + this.jellyFishCont.body.height && 
            this.input.activePointer.y <= game.config.height - this.jellyFishCont.body.height){
            this.jellyFishCont.y = this.input.activePointer.y;
        }
    }
    drawMamaLight(){
        this.renderTexture.draw(this.mamalight, this.Mama.x, this.Mama.y);
        this.renderTexture.draw(this.mamalightMed, this.Mama.x, this.Mama.y);
        this.renderTexture.draw(this.mamalightFar, this.Mama.x, this.Mama.y);
    }
    drawJellyLight(){
        this.renderTexture.draw(this.light, this.jellyFishCont.x, this.jellyFishCont.y);
        this.renderTexture.draw(this.lightMid, this.jellyFishCont.x, this.jellyFishCont.y);
        this.renderTexture.draw(this.lightFar, this.jellyFishCont.x, this.jellyFishCont.y);
    }

    
    //functions
    onSharkCollision(){
        this.gameOver = true;
    }
    onJellyWallCollision(){
        this.jellyDown = true;
        var timer = this.time.addEvent({
            delay: 6000,                // ms
            callback: this.resetJelly,
            
            callbackScope: this,
            loop: false
        });
    }
    onPowerUpCollision(){
        switch(Math.floor(Math.random()* 3)){
            case 0:
                this.sound.play('pop1', {mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0});
            case 1:
                this.sound.play('pop2', {mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0});
            case 2:
                this.sound.play('pop3', {mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0});
        }
        
        this.powerUp.alpha = 0;
        
        this.mamaLightOn = true;
        this.mamaAcsend = true;

        var timer = this.time.addEvent({
            delay: 6000,                // ms
            callback: this.mamaLightOff,
            
            callbackScope: this,
            loop: false
        });

        if(this.monster.x > -600){
            this.retreatMonster = true;
            this.sound.play('monster_hurt', {mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0});
        }
        this.monster.currentX = this.monster.x;
        this.advanceMonster = false;
        
    }

    resetJelly(){
        this.jellyDown = false;
    }
    mamaLightOff(){
        this.mamaLightOn = false;
        this.mamaAcsend = false;
    }

    advance(){
        this.advanceMonster = true;
        this.monster.currentX = this.monster.x;
        this.player.isHurt = true;
        this.sound.play('monster_warning', {mute: false, volume: 0.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0});
    }
    monsterChomp(){
        this.isChomped = true;
        this.gameOver = true;
    }
}
