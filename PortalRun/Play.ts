module PortalRun {

    export class Play extends Phaser.State {

        background: Phaser.Sprite;
        player: PortalRun.Player;
        cursors: Phaser.CursorKeys;
        spikes: Phaser.Group;
        portals: Phaser.Group;
        spikeGenerator: Phaser.TimerEvent;

        create() {
            this.background = this.add.sprite(0, 0, 'background');

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.player = new PortalRun.Player(this.game, 32, this.game.world.height - 150);

            this.spikes = this.game.add.group();
            this.portals = this.game.add.group();

            this.spikeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generateSpikes, this);
            this.spikeGenerator.timer.start();

            // add mouse/touch controls
            this.input.onDown.add(this.createPortal, this);
        }

        update() {

        }

        shutdown() {
            this.player.destroy();
            this.spikes.destroy();
            this.background.destroy();
        }

        createPortal() {
            var px = this.game.input.x;
            var py = this.game.input.y;

            // If haven't made 2 portals then just create new one
            if (this.portals.length < 2) {
                portal = new Portal(this.game, px, py);
                this.portals.add(portal);
            }
            else {
                // Recycle
                var portal: PortalRun.Portal = this.portals.getFirstExists(false);
                if (!portal) { // If both are still visible then reset the first one
                    portal = this.portals.getAt(0);
                }
                this.portals.remove(portal, false);
                this.portals.add(portal);
                portal.resetPosition(this.game.input.x, this.game.input.y);
            }
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