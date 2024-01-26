class Platform {
    
    constructor (ctx, x, y, w, h) {
        
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.vx = BACKGROUND_SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/platform.png';
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
    }

    draw() {
        
        if (this.sprite.isReady) {
            this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        }
    }
    
    move(background) {
        
        if (background.movements.left) {
            this.x -= BACKGROUND_SPEED;
        
        } else if (background.movements.right) {
            this.x += BACKGROUND_SPEED;
        }
    }
    
    collidesWithUp(element) {

        return (
            element.y + element.h > this.y &&
            element.y + element.h < this.y + (15 * RF)  &&
            element.x + element.w >= this.x + (10 * RF) &&
            element.x <= this.x + this.w - (10 * RF)
        )
    }    
}