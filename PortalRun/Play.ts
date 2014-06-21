module PortalRun {

    export class Play extends Phaser.State {

        background: Phaser.Sprite;
        player: PortalRun.Player;
        cursors: Phaser.CursorKeys;
        spikes: Phaser.Group;
        spikeGenerator: Phaser.TimerEvent;

        create() {
            this.background = this.add.sprite(0, 0, 'background');

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.player = new PortalRun.Player(this.game, 32, this.game.world.height - 150);

            this.spikes = this.game.add.group();

            this.spikeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generateSpikes, this);
            this.spikeGenerator.timer.start();
        }

        update() {
        }

        shutdown() {
            this.player.destroy();
            this.spikes.destroy();
            this.background.destroy();
        }

        generateSpikes() {
            var pipeY = this.game.rnd.integerInRange(100, 600);
            var spike: PortalRun.Spike = this.spikes.getFirstExists(false);

            if (!spike) {
                spike = new Spike(this.game, 0, 0);
                this.spikes.add(spike);
            }
            spike.resetPosition(this.game.width + spike.width / 2, pipeY);
        }
    }
}