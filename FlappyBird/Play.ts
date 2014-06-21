module FlappyBird {

    export class Play extends Phaser.State {

        background: Phaser.Sprite;
        bird: FlappyBird.Bird;
        ground: FlappyBird.Ground;
        pipeGenerator: Phaser.TimerEvent;
        pipes: Phaser.Group;
        groundHitSound: Phaser.Sound;
        pipeHitSound: Phaser.Sound;
        scoreSound: Phaser.Sound;
        score: number;
        scoreText: Phaser.BitmapText;

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 1200;

            this.score = 0;

            // add the background sprite
            this.background = this.game.add.sprite(0, 0, 'background');

            this.bird = new Bird(this.game, 100, this.game.height / 2);
            
            // create and add a group to hold our pipeGroup prefabs
            this.pipes = this.game.add.group();

            this.ground = new Ground(this.game, 0, 400, 335, 112);

            this.groundHitSound = this.game.add.audio('groundHitSound', 1);
            this.pipeHitSound = this.game.add.audio('pipeHitSound', 1);
            this.scoreSound = this.game.add.audio('scoreSound', 1);

            // keep the spacebar from propogating up to the browser
            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

            // add keyboard controls
            var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            flapKey.onDown.add(this.bird.flap, this.bird);

            // add mouse/touch controls
            this.input.onDown.add(this.bird.flap, this.bird);

            // add a timer
            this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
            this.pipeGenerator.timer.start();

            this.scoreText = this.game.add.bitmapText(this.game.width / 2, 10, 'flappyfont', this.score.toString(), 24);
        }

        update() {
            this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);
            this.pipes.forEach((pipeGroup) => {
                this.checkScore(pipeGroup);
                this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
            }, null);
        }

        shutdown() {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
            this.bird.destroy();
            this.pipes.destroy();
        }

        checkScore(pipeGroup: FlappyBird.PipeGroup) {
            if (pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x) {

                pipeGroup.hasScored = true;
                this.score++;
                this.scoreSound.play();
                this.scoreText.setText(this.score.toString());
            }
        }

        generatePipes() {
            var pipeY = this.game.rnd.integerInRange(-100, 100);
            var pipeGroup = this.pipes.getFirstExists(false);
            if (!pipeGroup) {
                pipeGroup = new PipeGroup(this.game, this.pipes);
            }
            pipeGroup.reset(this.game.width + pipeGroup.width / 2, pipeY);
        }

        deathHandler(bird: FlappyBird.Bird, obstacle: any) {
            if (obstacle instanceof FlappyBird.Ground) {
                this.groundHitSound.play();
            }
            else {
                this.pipeHitSound.play();
            }
            this.game.state.start('GameOver', true, false, this.score);
        }
    }
}