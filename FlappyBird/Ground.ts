module FlappyBird {

    export class Ground extends Phaser.TileSprite {

        constructor(game: Phaser.Game, x: number, y: number, width: number, height: number) {

            super(game, x, y, width, height, 'ground');

            this.autoScroll(-200, 0);

            game.add.existing(this);
            game.physics.arcade.enableBody(this);

            // we don't want the ground's body
            // to be affected by gravity
            this.body.allowGravity = false;
            this.body.immovable = true; 
        }

        update() {

        }

    }

}