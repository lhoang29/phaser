window.onload = function () {
    var game = new PortalRun.Game();
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PortalRun;
(function (PortalRun) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
        };

        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = false;

            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
            } else {
                //  Same goes for mobile settings.
                this.game.scale.setScreenSize(true);
                this.game.scale.setShowAll();
                this.game.scale.refresh();
            }

            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    PortalRun.Boot = Boot;
})(PortalRun || (PortalRun = {}));
var PortalRun;
(function (PortalRun) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, null, null);

            this.state.add('Boot', PortalRun.Boot, false);
            this.state.add('Preloader', PortalRun.Preloader, false);
            this.state.add('MainMenu', PortalRun.MainMenu, false);
            this.state.add('Play', PortalRun.Play, false);
            this.state.add('GameOver', PortalRun.GameOver, false);

            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    PortalRun.Game = Game;
})(PortalRun || (PortalRun = {}));
var PortalRun;
(function (PortalRun) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.apply(this, arguments);
        }
        GameOver.prototype.create = function () {
        };

        GameOver.prototype.update = function () {
        };
        return GameOver;
    })(Phaser.State);
    PortalRun.GameOver = GameOver;
})(PortalRun || (PortalRun = {}));
var PortalRun;
(function (PortalRun) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.game.state.start('Play');
        };
        return MainMenu;
    })(Phaser.State);
    PortalRun.MainMenu = MainMenu;
})(PortalRun || (PortalRun = {}));
var PortalRun;
(function (PortalRun) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
        }
        Play.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'background');

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.player = new PortalRun.Player(this.game, 32, this.game.world.height - 150);

            this.spikes = this.game.add.group();

            this.spikeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generateSpikes, this);
            this.spikeGenerator.timer.start();
        };

        Play.prototype.update = function () {
        };

        Play.prototype.shutdown = function () {
            this.player.destroy();
            this.spikes.destroy();
            this.background.destroy();
        };

        Play.prototype.generateSpikes = function () {
            var pipeY = this.game.rnd.integerInRange(100, 600);
            var spike = this.spikes.getFirstExists(false);

            if (!spike) {
                spike = new PortalRun.Spike(this.game, 0, 0);
                this.spikes.add(spike);
            }
            spike.resetPosition(this.game.width + spike.width / 2, pipeY);
        };
        return Play;
    })(Phaser.State);
    PortalRun.Play = Play;
})(PortalRun || (PortalRun = {}));
var PortalRun;
(function (PortalRun) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'player', 0);

            game.add.existing(this);
            game.physics.arcade.enable(this);

            this.animations.add('left', [0, 1, 2, 3], 10, true);
            this.animations.add('right', [5, 6, 7, 8], 10, true);

            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;

            this.animations.play('right');
        }
        Player.prototype.update = function () {
        };
        return Player;
    })(Phaser.Sprite);
    PortalRun.Player = Player;
})(PortalRun || (PortalRun = {}));
var PortalRun;
(function (PortalRun) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.load.image('background', 'assets/background.png');
            this.load.spritesheet('player', 'assets/dude.png', 32, 48);
            this.load.image('spike', 'assets/spikes.png');
        };

        Preloader.prototype.create = function () {
            this.startMainMenu();
        };

        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    PortalRun.Preloader = Preloader;
})(PortalRun || (PortalRun = {}));
var PortalRun;
(function (PortalRun) {
    var Spike = (function (_super) {
        __extends(Spike, _super);
        function Spike(game, x, y) {
            _super.call(this, game, 0, 0, 'spike');

            this.anchor.setTo(0.5, 0.5);

            game.add.existing(this);
            game.physics.arcade.enableBody(this);

            this.body.allowGravity = false;
            this.body.immovable = true;

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;

            this.resetPosition(x, y);
        }
        Spike.prototype.update = function () {
        };

        Spike.prototype.resetPosition = function (x, y) {
            this.reset(x, y);
            this.body.velocity.x = -200;
        };
        return Spike;
    })(Phaser.Sprite);
    PortalRun.Spike = Spike;
})(PortalRun || (PortalRun = {}));
