module FlappyBird {

    export class PipeGroup extends Phaser.Group {

        topPipe: FlappyBird.Pipe;
        bottomPipe: FlappyBird.Pipe;
        hasScored: boolean;

        constructor(game: Phaser.Game, parent?: any) {
            super(game, parent);

            this.topPipe = new Pipe(game, 0, 0, 0);
            this.add(this.topPipe);

            this.width = this.topPipe.width;

            this.bottomPipe = new Pipe(game, 0, 440, 1);
            this.add(this.bottomPipe);

            this.hasScored = false;

            this.setAll('body.velocity.x', -200);
        }

        update() {
            this.checkWorldBounds(); 
        }

        reset(x: number, y: number) {
            // Step 1    
            this.topPipe.reset(0, 0);

            // Step 2
            this.bottomPipe.reset(0, 440); // Step 2

            // Step 3
            this.x = x;
            this.y = y;

            // Step 4
            this.setAll('body.velocity.x', -200);

            // Step 5
            this.hasScored = false;

            // Step 6
            this.exists = true;
        }

        checkWorldBounds() {
            if (!this.topPipe.inWorld) {
                this.exists = false;
            }
        }
    }

}