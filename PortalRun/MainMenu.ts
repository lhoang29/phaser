module PortalRun {

    export class MainMenu extends Phaser.State {

        create() {
            this.game.state.start('Play');
        }
    }

}