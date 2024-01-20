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
    
    move(marioPosition) {
        
        if (marioPosition.x > BACKGROUND_X_MOVE_RIGHT) {
            marioPosition.x = BACKGROUND_X_MOVE_RIGHT;
            this.x -= this.vx;
  
        } else if (marioPosition.x < BACKGROUND_X_MOVE_LEFT && this.x < 0) {
            marioPosition.x = BACKGROUND_X_MOVE_LEFT;
            this.x += this.vx;
        } 
    }
}