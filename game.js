var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var player;
var bananas;
var platforms;
var score = 0;
var scoreText;
var goal = 10;
var gameOver = false;

function preload() {
    this.load.image('banana', 'banana.png');
    this.load.image('platform', 'platform.png');
    this.load.audio('pickup', 'pickup.wav');
}

function create() {


    this.player = this.physics.add.sprite(100, 450, 'player');

    
    // Set up game objects here
    // ... game world and objects creation code ...

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    goalText = this.add.text(16, 50, 'goal: ' + goal, { fontSize: '32px', fill: '#000' });
}

function collectBanana(player, banana) {
    banana.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (bananas.countActive(true) === 0) {
        gameOver = true;
        this.physics.pause();

        this.add.text(300, 300, 'You collected all bananas!\n Click to restart', { fontSize: '32px', fill: '#000' });
        this.input.on('pointerdown', function () {
            gameOver = false;
            score = 0;
            this.scene.restart();
        }, this);
    }
}


function update() {
    // ... game logic and controls code ...

    if (score >= goal && !gameOver) {
        gameOver = true;
        this.physics.pause();

        this.add.text(300, 300, 'You won! Click to restart', { fontSize: '32px', fill: '#000' });
        this.input.on('pointerdown', function () {
            gameOver = false;
            score = 0;
            this.scene.restart();
        }, this);
    }
}










