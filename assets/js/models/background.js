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

        this.movements = {
            right: false,
            left: false,
        }
    }

    draw() {
        
        if (this.sprite.isReady) {
            this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        }
    }
    
    move(mario) {
        
        if (mario.x > MARIO_X_MOVE_BG_LEFT) {
            this.movements.left = true;
            mario.x = MARIO_X_MOVE_BG_LEFT;
            this.x -= BACKGROUND_SPEED;
  
        } else if (mario.x < MARIO_X_MOVE_BG_RIGHT && this.x < 0) {
            this.movements.right = true;
            mario.x = MARIO_X_MOVE_BG_RIGHT;
            this.x += BACKGROUND_SPEED;

        } else {
            this.movements.left = false;
            this.movements.right = false;
        }         
    }
}