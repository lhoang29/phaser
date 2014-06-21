module FlappyBird {

    export class Pipe extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, frame: number) {

            super(game, x, y, 'pipe', frame);

            // set the sprite's anchor to the center
            this.anchor.setTo(0.5, 0.5);

            game.add.existing(this);
            game.physics.arcade.enableBody(this);

            this.body.allowGravity = false;
            this.body.immovable = true;
        }

        update() {
        }
    }

}