module PortalRun {

    export class Spike extends Phaser.Sprite {

        hasScored: boolean;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, 0, 0, 'spike');

            this.hasScored = false;
            this.anchor.setTo(0.5, 0.5);

            game.add.existing(this);
            game.physics.arcade.enableBody(this);

            this.body.allowGravity = false;
            this.body.immovable = true;

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;

            this.resetPosition(x, y);
        }

        update() {
        }

        resetPosition(x: number, y: number) {
            this.reset(x, y);
            this.body.velocity.x = -200;
        }
    }

}