module FlappyBird {

    export class MainMenu extends Phaser.State {

        background: Phaser.Sprite;
        ground: Phaser.TileSprite;
        titleGroup: Phaser.Group;
        title: Phaser.Sprite;
        bird: Phaser.Sprite;
        startButton: Phaser.Button;

        create() {

            this.background = this.add.sprite(0, 0, 'background');
            this.background.alpha = 1;
            
            this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
            this.ground.autoScroll(200, 0);
            
            /** STEP 1 **/
            // create a group to put the title assets in 
            // so they can be manipulated as a whole
            this.titleGroup = this.game.add.group();

            /** STEP 2 **/
            // create the title sprite
            // and add it to the group
            this.title = this.game.add.sprite(0, 0, 'title');
            this.titleGroup.add(this.title);

            /** STEP 3 **/
            // create the bird sprite 
            // and add it to the title group
            this.bird = this.game.add.sprite(200, 5, 'bird');
            this.titleGroup.add(this.bird);

            /** STEP 4 **/
            // add an animation to the bird
            // and begin the animation
            this.bird.animations.add('flap');
            this.bird.animations.play('flap', 12, true);

            /** STEP 5 **/
            // Set the originating location of the group
            this.titleGroup.x = 30;
            this.titleGroup.y = 100;

            /** STEP 6 **/
            // create an oscillating animation tween for the group
            this.game.add.tween(this.titleGroup).to({ y: 115 }, 350, Phaser.Easing.Linear.None, true, 0, 1000, true);

            // add our start button with a callback
            this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this);
            this.startButton.anchor.setTo(0.5, 0.5);

            //this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            //this.logo.anchor.setTo(0.5, 0.5);

            //this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            //this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            //this.input.onDown.addOnce(this.fadeOut, this);

        }

        //fadeOut() {

        //    this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        //    var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);

        //    tween.onComplete.add(this.startGame, this);

        //}

        startClick() {
            // start button click handler
            // start the 'play' state
            this.game.state.start('Play');
        }

    }

}