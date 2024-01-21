class Background {
    
    constructor (ctx) {
        
        this.ctx = ctx;

        this.x = 0;
        this.y = 0;
        this.w = BACKGROUND_WIDTH;
        this.h = BACKGROUND_HEIGHT;

        this.vx = BACKGROUND_SPEED;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/backgrounds/bg-level.png';
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
    }

    draw() {
        
        if (this.sprite.isReady) {
            this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h)
        }
    }
    
    move(mario) {
        
        if (mario.x > BACKGROUND_X_MOVE_RIGHT && mario.movements.right) {
            mario.x = BACKGROUND_X_MOVE_RIGHT;
            this.x -= this.vx;
        }
  
        if (mario.x > BACKGROUND_X_MOVE_LEFT && mario.movements.left && this.x < 0) {
            mario.x = BACKGROUND_X_MOVE_RIGHT;
            this.x += this.vx;
        }
    }
}