class Flower {
    
    constructor (ctx, x, y) {
        
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = FLOWER_WIDTH;
        this.h = FLOWER_HEIGHT;

        this.vx = BACKGROUND_SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/fire-flower.png';
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }

        this.sfxPowerup = new Audio();
        this.sfxPowerup.src = 'assets/audio/powerup.wav';
        this.sfxPowerup.volume = 0.7;
    }

    draw() {
        
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }

    move(background) {
        
        if (background.movements.left) {
            this.x -= BACKGROUND_SPEED;
        
        } else if (background.movements.right) {
            this.x += BACKGROUND_SPEED;
        }
    }

    collidesWith(element) {
        
        return (
            element.y + element.h >= this.y - (2 * RF) && 
            element.y <= this.y + this.h + (2 * RF) &&
            element.x + element.w >= this.x &&
            element.x <= this.x + this.w 
        )
    }

    sfxPowerupPlay() {
        
        this.sfxPowerup.play();
    }
}   