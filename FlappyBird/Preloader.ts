module FlappyBird {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {
            //  Load our actual games assets
            this.load.image('background', 'assets/background.png');
            this.load.image('ground', 'assets/ground.png');
            this.load.image('title', 'assets/title.png');
            this.load.image('startButton', 'assets/start-button.png');
            this.load.image('gameOver', 'assets/gameover.png');

            this.load.audio('scoreSound', 'assets/score.wav');
            this.load.audio('flapSound', 'assets/flap.wav', true);
            this.load.audio('groundHitSound', 'assets/ground-hit.wav', true);
            this.load.audio('pipeHitSound', 'assets/pipe-hit.wav', true);

            this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
            this.load.spritesheet('pipe', 'assets/pipes.png', 54, 320, 2);

            this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');
        }

        create() {
            this.startMainMenu();
        }

        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}