
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
class Level extends Phaser.Scene {
    constructor(key, name, num) {
        super(key);
        this.name = name;
        this.currentLevel = num;
    }
    
    create(){

        upScoreButton = this.add.text(100, 500, `Increase score`, {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => score++ );

        this.onStart();
    }
    update(){
        upScoreButton.setText(`Increase score: ${score}`);
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

    }

    onStart(){
        const jumpButton = this.add.text(100, 100, 'Jump up to next level', {font: '64px Arial', fill: '#ffffff'})
        .setInteractive()
        .on('pointerdown', () => this.scene.start('level2') );

       

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
        height: 1080
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




