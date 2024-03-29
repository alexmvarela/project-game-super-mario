class Mushroom {
    
    constructor (ctx, x, y) {
        
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = SCORE_MUSHROOM_WIDTH;
        this.h = SCORE_MUSHROOM_HEIGHT;

        this.vx = BACKGROUND_SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/mushroom.png';
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }

        this.sfxLife = new Audio();
        this.sfxLife.src = 'assets/audio/1up.wav';
        this.sfxLife.volume = 0.5;

        this.sfx = new Audio();
        this.sfx.src = 'assets/audio/powerup.wav';
        this.sfx.volume = 0.5;
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
}