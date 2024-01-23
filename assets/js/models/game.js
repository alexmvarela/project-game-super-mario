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

        this.platforms = [
            //new Platform(this.ctx, 300 * RF, 243 * RF, 150 * RF, 81 * RF),
            //new Platform(this.ctx, 500 * RF, 200 * RF, 150 * RF, 125 * RF),
        ];

        this.blocksItem = [
            //new BlockItem(this.ctx, 300 * RF, 250 * RF, 37 * RF, 37 * RF),
            //new BlockItem(this.ctx, 450 * RF, 150 * RF, 37 * RF, 37 * RF),
        ];

        this.blocks = [
            //new Block(this.ctx, 300 * RF, 150 * RF, 40 * RF, 40 * RF),
            //new Block(this.ctx, 450 * RF, 250 * RF, 40 * RF, 40 * RF),
        ];

        this.pipelines = [
            new Pipeline(this.ctx, 1000 * RF, 255 * RF, 65 * RF, 69 * RF), //Go down
            new Pipeline(this.ctx, 450 * RF, -750 * RF, 65 * RF, 750 * RF), //Left border
            new Pipeline(this.ctx, 1700 * RF, -750 * RF, 65 * RF, 750 * RF), //Right border
            new Pipeline(this.ctx, 1440 * RF, -750 * RF, 65 * RF, 550 * RF), //Go up
            new Pipeline(this.ctx, 1440 * RF, 255 * RF, 65 * RF, 69 * RF), //Up

            new Pipeline(this.ctx, 2500 * RF, 255 * RF, 65 * RF, 69 * RF), //Go down
            new Pipeline(this.ctx, 2200 * RF, -750 * RF, 65 * RF, 750 * RF), //Left border
            new Pipeline(this.ctx, 3700 * RF, -750 * RF, 65 * RF, 750 * RF), //Right border
            new Pipeline(this.ctx, 3440 * RF, -750 * RF, 65 * RF, 550 * RF), //Go up
            new Pipeline(this.ctx, 3440 * RF, 255 * RF, 65 * RF, 69 * RF), //Up

            //new Pipeline(this.ctx, 300 * RF, 255 * RF, (65/1) * RF, (138/2) * RF),
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
        this.platforms.forEach((platform) => platform.draw());
        this.blocksItem.forEach((block) => block.draw());
        this.blocks.forEach((block) => block.draw());
        this.pipelines.forEach((pipeline) => pipeline.draw());
        //this.coins.forEach((coin)=> coin.draw());
        //this.enemies.forEach((enemy) => enemy.draw())
        this.mario.draw();
    }

    move() {

        this.mario.move();
        this.background.move(this.mario);
        this.platforms.forEach((platform) => platform.move(this.background));
        this.blocksItem.forEach((block) => block.move(this.background));
        this.blocks.forEach((block) => block.move(this.background));
        this.pipelines.forEach((pipeline) => pipeline.move(this.background));
        //this.coins.forEach((coin) => coin.move(this.background));
        //this.enemies.forEach((enemie) => enemie.move(this.background))
    }



    checkCollisions() {
        
        if ((this.pipelines[0].collidesWithUp(this.mario) || this.pipelines[5].collidesWithUp(this.mario)) && this.mario.movements.crouch) {
            this.background.y = -this.canvas.height;
            this.pipelines.forEach((pipeline) => pipeline.y += this.canvas.height);
            this.platforms.forEach((platform) => platform.y += this.canvas.height);
            this.blocksItem.forEach((block) => block.y += this.canvas.height);
            this.blocks.forEach((block) => block.y += this.canvas.height);
            this.mario.y = 0;
        }

        if (this.pipelines[3].collidesWithDown(this.mario) || this.pipelines[8].collidesWithDown(this.mario)) {
            this.background.y = 0;
            this.pipelines.forEach((pipeline) => pipeline.y -= this.canvas.height);
            this.platforms.forEach((platform) => platform.y -= this.canvas.height);
            this.blocksItem.forEach((block) => block.y -= this.canvas.height);
            this.blocks.forEach((block) => block.y -= this.canvas.height);
        }
        
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

        this.platforms.forEach((platform) => {
            
            if (platform.collidesWithUp(this.mario)) {
                this.mario.y = platform.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
            
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
           }
        });

        this.blocksItem.forEach((block) => {

            if (block.collidesWithDown(this.mario)) {
                this.mario.y = block.y + block.h;
                this.mario.vy = 0;
                block.status.isOn = false;
                block.status.isOff = true;
            }
            
            if (block.collidesWithLeft(this.mario)) {
                this.mario.x = block.x - this.mario.w - (5 * RF);
           }
           
           if (block.collidesWithRight(this.mario)) {
                this.mario.x = block.x + block.w + (5 * RF);
           }
           
           if (block.collidesWithUp(this.mario)) {
                this.mario.y = block.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
           }
        });

        this.blocks.forEach((block, index) => {

            if (block.collidesWithDown(this.mario)) {
                this.mario.y = block.y + block.h;
                this.mario.vy = 0;
                block.status.isOn = false;
                block.status.isOff = true;
                if (block.sprite.horizontalFrameIndex === 1) {
                    delete(this.blocks[index]);
                }
            }
            
            if (block.collidesWithLeft(this.mario)) {
                this.mario.x = block.x - this.mario.w - (5 * RF);
           }
           
           if (block.collidesWithRight(this.mario)) {
                this.mario.x = block.x + block.w + (5 * RF);
           }
           
           if (block.collidesWithUp(this.mario)) {
                this.mario.y = block.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
           }
        });
    }      
}