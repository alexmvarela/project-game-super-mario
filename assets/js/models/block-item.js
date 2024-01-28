class BlockItem {
    
    constructor (ctx, x, y) {
        
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = BLOCK_ITEM_WIDTH;
        this.h = BLOCK_ITEM_HEIGHT;

        this.vx = BACKGROUND_SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/block-item.png';
        
        this.sprite.verticalFrames = 2;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 3;
        this.sprite.horizontalFrameIndex = 0;
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
        }

        this.status = {
            isOn: true,
            isOff: false
        }

        this.animationTick = 0;

        this.sfx = new Audio();
        this.sfx.src = 'assets/audio/bump.wav';
        this.sfx.volume = 0.5;
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

        if (this.status.isOn) {
            this.animationTick++;
        
            if (this.animationTick > BLOCK_ITEM_ANIMATION_TICK) {
                this.animationTick = 0;
                this.sprite.horizontalFrameIndex++;
            }

            if (this.sprite.horizontalFrameIndex > 2) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }

        if (this.status.isOff) {
            this.sprite.horizontalFrameIndex = 0;
            this.sprite.verticalFrameIndex = 1;
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

    sfxPlay() {
        
        this.sfx.play();
    }
}