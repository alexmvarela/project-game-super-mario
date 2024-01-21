class Bullet {
    
    constructor(ctx, x, y) {
        
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = BULLET_WIDTH;
        this.h = BULLET_HEIGHT;

        this.vx = BULLET_SPEED;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/fire-ball.png';
        
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 4;
        this.sprite.horizontalFrameIndex = 1;
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
        }

        this.animationTick = 0;

        this.movements = {
            isFalling: true,
            isBouncing: false
        }
    }
  
    draw() {
        
        if (this.sprite.isReady) {
            
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h
            )

            this.animate();
        }  
    }
    
    animate() {

        this.animationTick++;
        
        if (this.animationTick > BULLET_MOVE_ANIMATION_TICK) {
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
        }

        if (this.sprite.horizontalFrameIndex > 3) {
            this.sprite.horizontalFrameIndex = 0;
        }
    }
    
    moveRight() {
        
        this.x += this.vx;
        
        if (this.movements.isBouncing && this.y + this.h > BULLET_BOUNCE_HEIGHT) {
            this.y -= BULLET_GRAVITY;
        } else {
            this.movements.isBouncing = false;
            this.movements.isFalling = true;
        }

        if (this.movements.isFalling && this.y + this.h  < this.ctx.canvas.height - MARIO_GROUND_PADDING + MARIO_HEIGHT) {
            this.y += BULLET_GRAVITY;
        } else {
            this.movements.isFalling = false;
            this.movements.isBouncing = true;      
        }    
    }

    moveLeft() {
        
        this.x -= this.vx;

        if (this.movements.isBouncing && this.y + this.h > BULLET_BOUNCE_HEIGHT) {
            this.y -= BULLET_GRAVITY;
        } else {
            this.movements.isBouncing = false;
            this.movements.isFalling = true;
        }

        if (this.movements.isFalling && this.y + this.h  < this.ctx.canvas.height - MARIO_GROUND_PADDING + MARIO_HEIGHT) {
            this.y += BULLET_GRAVITY;
        } else {
            this.movements.isFalling = false;
            this.movements.isBouncing = true;      
        }          
    }
}