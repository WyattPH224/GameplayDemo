
class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }
    preload(){

    }
    create(){
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Menu\n (Click on where you want to go)', {font: '64px Arial', fill: '#ffffff'});
        
        const startGame = this.add.text(100, 100, 'Start Game', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('level1') );

        const settingButton = this.add.text(100, 200, 'Settings', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Settings') );

        const creditsButton = this.add.text(100, 300, 'Credits', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Credits') );

    }
    update(){}
}

let upScoreButton = Phaser.GameObjects.Text;
let keyA;
let keyD;
let keyW;
let keyS;
let keySpace;
let spaceDown;
let power;
class Level extends Phaser.Scene {
    constructor(key, name, num) {
        super(key);
        this.name = name;
        this.currentLevel = num;
    }
    
    create(){

        /*
        upScoreButton = this.add.text(100, 500, `Increase score`, {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => score++ );
        */
        spaceDown = false;
        power = 0;
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.onStart();
    }
    update(){
        //upScoreButton.setText(`Increase score: ${score}`);
        //movement left right
        if(keyA.isDown && this.player.body.onFloor()){
            this.player.setVelocityX(-100);
        }
        else if (keyA.isDown) {
            this.player.setVelocityX(-300);
            console.log("A down in air");
        }
        else if (keyD.isDown && this.player.body.onFloor()) {  
            this.player.setVelocityX(100);
        } 
        else if (keyA.isDown) {
            this.player.setVelocityX(300);
        }
        else if(keyA.isUp && keyD.isUp){
            this.player.setVelocityX(0);
        }

        
        if (keySpace.isDown) {
            this.player.setVelocityX(0);
            spaceDown = true;
            if(power < 100) {
                power+=2;
            }

            console.log("space down " + power);
        } 
        if (spaceDown && this.player.body.onFloor() && keySpace.isUp) {
            this.player.setVelocityY(-250 - (power * 4));
            power = 0;
            spaceDown = false;
            console.log("space up");
        }
    }

    onStart(){
        console.log("Level not implemented yet");
    }

    goalHit() {
      }
}

//global variable
let score = 0; 


class Level1 extends Level {
    constructor(){
        super('level1', "Level 1", 0);
    }

    preload(){
        // At last image must be loaded with its JSON
        this.load.image('player', 'assets/Player.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
         // Load the export Tiled JSON
         this.load.tilemapTiledJSON('map', 'assets/levels/level1.json');
    }

    onStart(){
        //const jumpButton = this.add.text(100, 100, 'Jump up to next level', {font: '64px Arial', fill: '#ffffff'})
        //.setInteractive()
       // .on('pointerdown', () => this.scene.start('level2') );

        const map = this.make.tilemap({key: 'map'});                                //load map
        const tileset = map.addTilesetImage('core_gameplay_platformer', 'tiles');   //load tileset for map
        const platforms = map.createLayer('Platforms', tileset, 0, 0);        //create platforms layer
        platforms.setCollisionByExclusion(-1, true);                                //set collision for platforms layer


        //create player
        this.player = this.physics.add.sprite(100, 1000, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);


       

    }

}

class Level2 extends Level {
    constructor(){
        super('level2', "Level 2", 1);
    }

    preload(){

    }

    onStart(){
        const jumpButton = this.add.text(100, 100, 'Jump up to next level', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('level3') );

        const fallButton = this.add.text(100, 200, 'Fall down to last level', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('level1') );


    }

}


class Level3 extends Level {
    constructor() {
        super('level3', "Level 3", 2)
    }
    preload(){

    }
    onStart(){
        const jumpButton = this.add.text(100, 100, 'Jump up to end of game', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('EndCutscene') );

        const fallButton = this.add.text(100, 200, 'Fall down to first level', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('level1') );

    }
}

class EndCutscene extends Phaser.Scene {
    constructor() {
        super('EndCutscene');
    }
    preload(){

    }
    create(){
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You win!', {font: '64px Arial', fill: '#ffffff'});

        
        const backButton = this.add.text(100, 100, 'Back to menu', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Menu') );

        this.add.text(100, 200, `Score: ${score}`, {font: '64px Arial', fill: '#ffffff'});
        score= 0;


    }
    update(){}
}


class Settings extends Phaser.Scene {
    constructor() {
        super('Settings');
    }
    preload(){

    }
    create(){
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Settings page!', {font: '64px Arial', fill: '#ffffff'});

        const backButton = this.add.text(100, 100, 'Back to menu', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Menu') );
    }
    update(){}
}


class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }
    preload(){

    }
    create(){
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Credits page!', {font: '64px Arial', fill: '#ffffff'});

        const backButton = this.add.text(100, 100, 'Back to menu', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('Menu') );
    }
    update(){}
}

//Create empty game scene


//move on to next level


//set up config and game object
let config = {
    type: Phaser.AUTO,
    parent: 'game',

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1280
    },
    backgroundColor: 0x000000,
    scene: [Menu, Level1, Level2, Level3, EndCutscene, Settings, Credits],
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1000 },
          
            debug: true,
        },
    }
}

let game = new Phaser.Game(config);




