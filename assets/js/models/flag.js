class Flag {
    
    constructor (ctx, x, y) {
        
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = FLAG_WIDTH;
        this.h = FLAG_HEIGHT;

        this.y0 = FLAG_UP;
        this.vx = BACKGROUND_SPEED;
        this.vy = FLAG_SPEED_Y;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/flag.png';
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
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
}