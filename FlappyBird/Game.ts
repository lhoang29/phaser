﻿module FlappyBird {

    export class Game extends Phaser.Game {

        constructor() {

            super(288, 505, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Play', Play, false);
            this.state.add('GameOver', GameOver, false);

            this.state.start('Boot');

        }

    }

} 