module PortalRun {

    export class MainMenu extends Phaser.State {

        titleText: Phaser.BitmapText;
        backgroundGrass: Phaser.TileSprite;
        player: PortalRun.Player;
        ground: PortalRun.Ground;
        startButton: Phaser.Button;

        create() {
            this.game.stage.backgroundColor = '#111111';
            this.titleText = this.game.add.bitmapText(this.game.width / 2 - 60, 50, 'portalfont', 'Portal Run', 24);

            this.startButton = this.game.add.button(this.game.width / 2, 150, 'startButton', this.startClick, this);
            this.startButton.anchor.setTo(0.5, 0.5);

            this.ground = new PortalRun.Ground(this.game, 0, this.game.height - 32, this.game.width, 32);
            this.ground.autoScroll(-Player.Velocity, 0);

            this.backgroundGrass = this.game.add.tileSprite(0, 0, this.game.width, 21, 'grass');
            this.backgroundGrass.y = this.ground.y - this.backgroundGrass.height;
            this.backgroundGrass.autoScroll(-Player.Velocity, 0);

            this.player = new PortalRun.Player(this.game, 100, this.game.world.height - 150);
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.ground);
        }

        startClick() {
            this.game.state.start('Play');
        }
    }

}