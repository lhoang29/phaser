module FlappyBird {

    export class Bird extends Phaser.Sprite {

        flapSound: Phaser.Sound;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'bird', 0);

            // set the sprite's anchor to the center
            this.anchor.setTo(0.5, 0.5);

            // add and play animations
            this.animations.add('flap');
            this.animations.play('flap', 12, true);

            this.flapSound = this.game.add.audio('flapSound', 1, false);

            game.add.existing(this);
            game.physics.arcade.enableBody(this);
        }

        update() {
            // check to see if our angle is less than 90
            // if it is rotate the bird towards the ground by 2.5 degrees
            if (this.angle < 90) {
                this.angle += 2.5;
            }
        }

        flap() {
            this.flapSound.play();

            this.body.velocity.y = -400;

            // rotate the bird to -40 degrees
            this.game.add.tween(this).to({ angle: -40 }, 100).start();
        }
    }

}