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
    this.load.image('sky', 'sky.png');
    this.load.image('player', 'player.png');
}



function create() {

    this.player = this.physics.add.sprite(100, 450, 'player');

    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'platform').setScale(2).refreshBody();

    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');


    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    bananas = this.physics.add.group({
        key: 'banana',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    bananas.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(bananas, platforms);

    this.physics.add.overlap(player, bananas, collectBanana, null, this);

    
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

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown) {
        player.setVelocityX(-160);
    } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }
}








