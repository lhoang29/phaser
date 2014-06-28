module PortalRun {

    export class Spike extends Phaser.Sprite {

        hasScored: boolean;
        rotateSpeed: number;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, 0, 0, 'asteroid');

            this.rotateSpeed = this.game.rnd.integerInRange(1, 5);

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
            this.angle += this.rotateSpeed;
        }

        resetPosition(x: number, y: number) {
            this.reset(x, y);
            this.body.velocity.x = Play.GlobalVelocity;
            this.hasScored = false;
            this.rotateSpeed = this.game.rnd.integerInRange(1, 5);
        }
    }

}