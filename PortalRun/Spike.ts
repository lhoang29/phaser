module PortalRun {

    export class Spike extends Phaser.Sprite {

        hasScored: boolean;
        rotateSpeed: number;

        constructor(game: Phaser.Game, x: number, y: number) {

            var randomFrame = game.rnd.integerInRange(0, 2);
            var frameKey: string;
            switch (randomFrame) {
                case 0:
                    frameKey = 'asteroid3.png';
                    break;
                case 1:
                    frameKey = 'asteroid.png';
                    break;
                case 2:
                    frameKey = 'asteroid2.png';
                    break;
            }
            super(game, 0, 0, 'asteroids', frameKey);

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
            var randomNumber = this.game.rnd.integerInRange(0, 4);
            this.rotateSpeed = randomNumber + 1;
            this.scale.setTo((randomNumber + 4) / 8, (randomNumber + 4) / 8);
        }
    }

}