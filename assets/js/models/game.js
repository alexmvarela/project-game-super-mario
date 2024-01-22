class Game {
    
    constructor (canvasId) {
        
        this.canvas = document.getElementById(canvasId);
        
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_W / ASPECT_RATIO;
    
        this.ctx = this.canvas.getContext('2d');

        this.fps = FPS;

        this.drawIntervalId = undefined;

    
        this.background = new Background(this.ctx);

        this.mario = new Mario(this.ctx, MARIO_X_PADDING, this.canvas.height - MARIO_GROUND_PADDING);

        this.pipelines = [
            new Pipeline(this.ctx, 200*RF, 255*RF, (65/1) * RF, (138/2) * RF),
            new Pipeline(this.ctx, 365*RF, 255*RF, (65/1) * RF, (138/2) * RF)
        ];
    }
   

    onKeyEvent(event) {
        
        this.mario.onKeyEvent(event);
    }

    start() {
        
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.checkCollisions();
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
        this.mario.clearBullets();
    }

    draw() {
        
        this.background.draw();
        this.pipelines.forEach((pipeline) => pipeline.draw());
        //this.coins.forEach((coin)=> coin.draw());
        //this.enemies.forEach((enemy) => enemy.draw())
        this.mario.draw();
    }

    move() {

        this.mario.move();
        this.background.move(this.mario);
        this.pipelines.forEach((pipeline) => pipeline.move(this.background));
        //this.coins.forEach((coin) => coin.move(this.background));
        //this.enemies.forEach((enemie) => enemie.move(this.background))
    }



    checkCollisions() {
        
        /*if (this.pipelines[1].collidesWithUp(this.mario) && this.mario.movements.crouch) {
            this.background.y = -this.canvas.height;
            this.pipelines.forEach((pipeline) => pipeline.y = -this.canvas.height);
            this.mario.y = 0;
        }*/
        
        this.pipelines.forEach((pipeline) => {
            
            if (pipeline.collidesWithDown(this.mario)) {
                this.mario.y = pipeline.y + pipeline.h;
                this.mario.vy = 0;
            }
            
            if (pipeline.collidesWithLeft(this.mario)) {
                this.mario.x = pipeline.x - this.mario.w;
           }
           
           if (pipeline.collidesWithRight(this.mario)) {
                this.mario.x = pipeline.x + pipeline.w;
           }
           
           if (pipeline.collidesWithUp(this.mario)) {
                this.mario.y = pipeline.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
            
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
           }
        });
    }
}