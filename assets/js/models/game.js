class Game {
    
    constructor (canvasId) {
        
        this.canvas = document.getElementById(canvasId);
        
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;
    
        this.ctx = this.canvas.getContext('2d');

        this.fps = FPS;

        this.drawIntervalId = undefined;

    
        this.background = new Background(this.ctx);

        this.mario = new Mario(this.ctx, MARIO_X_PADDING, this.canvas.height - MARIO_GROUND_PADDING);
    }

    onKeyEvent(event) {
        
        this.mario.onKeyEvent(event);
    }

    start() {
        
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                //this.checkCollisions();
                this.draw();
            }, this.fps);
        }
    }

    stop() {
        
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined; 
    }

    clear() {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        
        this.background.draw();
        //this.tuberias.forEach((tuberia) => tuberia.draw());
        //this.coins.forEach((coin)=> coin.draw());
        //this.enemies.forEach((enemy) => enemy.draw())
        this.mario.draw();
    }

    move() {

        this.mario.move();
        this.background.move(this.mario);
        //this.tuberias.forEach((tuberia) => tuberia.move(this.background));
        //this.coins.forEach((coin) => coin.move(this.background));
        //this.enemies.forEach((enemie) => enemie.move(this.background))
    }
}