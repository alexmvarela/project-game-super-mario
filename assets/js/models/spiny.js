class Spiny {
    
    constructor (ctx, x, y) {
        
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = SPINY_WIDTH;
        this.h = SPINY_HEIGHT;

        this.vx = BACKGROUND_SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/spiny.png';
        
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 2;
        this.sprite.horizontalFrameIndex = 0;
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
        }

        this.status = {
            isAlive: true,
            isDead: false
        }

        this.animationTick = 0;
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
        
        this.animationTick++;
        
        if (this.animationTick > SPINY_ANIMATION_TICK) {
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
        }

        if (this.sprite.horizontalFrameIndex > 1) {
            this.sprite.horizontalFrameIndex = 0;
        }
    }

    move(background) {
        
        if (background.movements.left) {
            this.x -= BACKGROUND_SPEED;
        
        } else if (background.movements.right) {
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
            element.y + element.h < this.y + (10 * RF)  &&
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