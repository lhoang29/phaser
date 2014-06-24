module PortalRun {

    export class Play extends Phaser.State {

        background: Phaser.Sprite;
        player: PortalRun.Player;
        cursors: Phaser.CursorKeys;
        spikes: Phaser.Group;
        portals: Phaser.Group;
        spikeGenerator: Phaser.TimerEvent;
        score: number;
        scoreText: Phaser.BitmapText;

        public static GlobalVelocity: number = -200;

        create() {
            this.background = this.add.sprite(0, 0, 'background');

            this.score = 0;
            this.scoreText = this.game.add.bitmapText(this.game.width / 2, 10, 'portalfont', this.score.toString(), 24);

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.player = new PortalRun.Player(this.game, 32, this.game.world.height - 150);

            this.spikes = this.game.add.group();
            this.portals = this.game.add.group();

            this.spikeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.generateSpikes, this);
            this.spikeGenerator.timer.start();

            // add mouse/touch controls
            this.input.onDown.add(this.createPortal, this);
        }

        update() {
            var numPortalExists = 0;
            this.portals.forEachExists(() => { numPortalExists++; }, null);

            if (numPortalExists == 2) {
                for (var i = 0; i < 2; i++) {
                    var portal: PortalRun.Portal = this.portals.getAt(i);
                    if (portal.overlap(this.player) && Math.abs(this.player.world.x - portal.world.x) <= 2) {
                        var otherPortal = this.portals.getAt(1 - i);
                        this.player.x = otherPortal.world.x + 3;
                        this.player.y = otherPortal.world.y;
                        break;
                    }
                }
            }

            this.spikes.forEach((spike: PortalRun.Spike) => {
                this.checkScore(spike);
                this.game.physics.arcade.collide(this.player, spike, () => {
                    this.game.state.restart(true);
                }, null, this);
            }, null);
        }

        shutdown() {
            this.player.destroy();
            this.spikes.destroy();
            this.background.destroy();
        }

        checkScore(spike: PortalRun.Spike) {
            if (spike.exists && !spike.hasScored && spike.world.x <= this.player.world.x) {
                spike.hasScored = true;
                this.score++;
                this.scoreText.setText(this.score.toString());
            }
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
                
                // Reposition recycled item to the end of the group
                this.portals.remove(portal, false);
                this.portals.add(portal);

                portal.resetPosition(this.game.input.x, this.game.input.y);
            }
        }

        generateSpikes() {
            var pipeY = this.game.rnd.integerInRange(100, this.game.height);
            var spike: PortalRun.Spike = this.spikes.getFirstExists(false);

            if (!spike) {
                spike = new Spike(this.game, 0, 0);
                this.spikes.add(spike);
            }
            spike.resetPosition(this.game.width + spike.width / 2, pipeY);
        }
    }
}