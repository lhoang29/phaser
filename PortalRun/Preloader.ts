﻿module PortalRun {

    export class Preloader extends Phaser.State {

        preload() {
            this.load.image('background', 'assets/background.png');
            this.load.spritesheet('player', 'assets/dude.png', 32, 48);
            this.load.image('spike', 'assets/spikes.png');
        }

        create() {
            this.startMainMenu();
        }

        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}