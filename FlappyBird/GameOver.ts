module FlappyBird {

    export class GameOver extends Phaser.State {

        background: Phaser.Sprite;
        ground: FlappyBird.Ground;
        title: Phaser.Sprite;
        revertTimer: Phaser.TimerEvent;
        score: number;
        scoreText: Phaser.BitmapText;

        init(score: number) {
            this.score = score;
        }

        create() {
            this.background = this.add.sprite(0, 0, 'background');
            this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
            this.title = this.game.add.sprite(this.game.width / 2, 150, 'gameOver');
            this.title.anchor.setTo(0.5, 0.5);

            this.scoreText = this.game.add.bitmapText(this.game.width / 2 - 40, this.game.height / 2, 'flappyfont', '', 18);
            this.scoreText.setText("Score: " + this.score.toString());

            // Set a timer to automatically switch back to main menu state
            this.revertTimer = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.revertToMainMenu, this);
            this.revertTimer.timer.start();
        }

        update() {
        }

        revertToMainMenu() {
            this.game.state.start('MainMenu');
        }
    }
}