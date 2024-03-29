class Goomba {
    
    constructor (ctx, x, y) {
        
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = GOOMBA_WIDTH;
        this.h = GOOMBA_HEIGHT;

        this.xMin = this.x - (75 * RF);
        this.xMax = this.x + (75 * RF);

        this.vx = GOOMBA_SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/goomba.png';
        
        this.sprite.verticalFrames = 2;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 2;
        this.sprite.horizontalFrameIndex = 0;
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
        }

        this.movements = {
            right: false,
            left: true
        }

        this.status = {
            isAlive: true,
            isDead: false
        }

        this.animationTick = 0;
        this.moveTick = 0;
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
            );
        }

        this.animate();
    }

    animate() {

        if (this.status.isAlive) {
            this.animationTick++;
        
            if (this.animationTick > GOOMBA_ANIMATION_TICK) {
                this.animationTick = 0;
                this.sprite.horizontalFrameIndex++;
            }

            if (this.sprite.horizontalFrameIndex > 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }

        if (this.status.isDead) {
            this.animationTick++;
            this.sprite.horizontalFrameIndex = 0;
            this.sprite.verticalFrameIndex = 1;     
        }
    }
    
    move(background) {
        
        this.moveTick++;

        if (this.movements.left && this.status.isAlive && background.movements.left) {
            this.x -= BACKGROUND_SPEED + (1 * RF);
            this.xMin -= BACKGROUND_SPEED;
            this.xMax -= BACKGROUND_SPEED;
            if (this.x < this.xMin) {
                this.x = this.xMin;
            }
            if (this.moveTick > GOOMBA_MOVE_TICK) {
                this.movements.left = false;
                this.movements.right = true;
                this.moveTick = 0;
            }
        }
    

        if (this.movements.right && this.status.isAlive && background.movements.left) {
            this.x -= BACKGROUND_SPEED - (1 * RF);
            this.xMin -= BACKGROUND_SPEED;
            this.xMax -= BACKGROUND_SPEED
            if (this.x > this.xMax) {
                this.x = this.xMax;
            }
            if (this.moveTick > GOOMBA_MOVE_TICK) {
                this.movements.right = false;
                this.movements.left = true;
                this.moveTick = 0;
            }
        }

        if (this.movements.left && this.status.isAlive && background.movements.right) {
            this.x += BACKGROUND_SPEED - (1 * RF);
            this.xMin += BACKGROUND_SPEED;
            this.xMax += BACKGROUND_SPEED;
            if (this.moveTick > GOOMBA_MOVE_TICK) {
                this.movements.left = false;
                this.movements.right = true;
                this.moveTick = 0;
            }
        }

        if (this.movements.right && this.status.isAlive && background.movements.right) {
            this.x += BACKGROUND_SPEED + (1 * RF);
            this.xMin += BACKGROUND_SPEED;
            this.xMax += BACKGROUND_SPEED;
            if (this.moveTick > GOOMBA_MOVE_TICK) {
                this.movements.right = false;
                this.movements.left = true;
                this.moveTick = 0;
            }
        }

        if (this.movements.left && this.status.isAlive && !background.movements.left && !background.movements.right) {
            this.x -= GOOMBA_SPEED ;
            
            if (this.x < this.xMin) {
                this.x = this.xMin;
            }
            if (this.moveTick > GOOMBA_MOVE_TICK) {
                this.movements.left = false;
                this.movements.right = true;
                this.moveTick = 0;
            }
        }
        
        if (this.movements.right && this.status.isAlive && !background.movements.left && !background.movements.right) {
            this.x += GOOMBA_SPEED;
            if (this.x > this.xMax) {
                this.x = this.xMax;
            }
            if (this.moveTick > GOOMBA_MOVE_TICK) {
                this.movements.right = false;
                this.movements.left = true;
                this.moveTick = 0;
            }
        }
        
        if (this.status.isDead && background.movements.left) {
            this.x -= BACKGROUND_SPEED;
        }

        if (this.status.isDead && background.movements.right) {
            this.x += BACKGROUND_SPEED;
        }
    }

    collidesWithLeft(element) {
        
        return (
            element.x + element.w >= this.x &&
            element.x + element.w <= this.x + (10 * RF) &&
            element.y + element.h > this.y + (5 * RF) && 
            element.y < this.y + this.h - (5 * RF)

        )
    }
    
    collidesWithRight(element) {
        
        return (
            element.x <= this.x + this.w &&
            element.x  >= this.x + this.w - (10 * RF) &&
            element.y + element.h > this.y + (5 * RF) &&
            element.y < this.y + this.h - (5 * RF)
        )
    }
    
    collidesWithUp(element) {

        return (
            element.y + element.h > this.y &&
            element.y + element.h < this.y + (15 * RF)  &&
            element.x + element.w >= this.x + (5 * RF) &&
            element.x <= this.x + this.w - (5 * RF)
        )
    }

    collidesWithDown(element) {

        return (
            element.x + element.w >= this.x + (5 * RF) &&
            element.x <= this.x + this.w - (10 * RF) &&
            element.y > this.y + this.h - (20 * RF) &&
            element.y < this.y + this.h 
        )
    }
    
    collidesWithBullet(element) {
        
        return (
            element.y + element.h >= this.y - (2 * RF) && 
            element.y <= this.y + this.h + (2 * RF) &&
            element.x + element.w >= this.x &&
            element.x <= this.x + this.w 
        )
    }
}