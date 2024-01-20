class Mario {

    constructor(ctx, x, y) {
        
        this.ctx = ctx;
        
        this.x = x;
        this.y = y;
        this.w = MARIO_WIDTH;
        this.h = MARIO_HEIGHT;
        this.y0 = this.y;
        
        this.vx = MARIO_SPEED_MOVE;
        this.vy = 0;
        
        this.sprite = new Image();
        this.sprite.src = 'assets/img/mario-sprite.png';
        
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 14;
        this.sprite.horizontalFrameIndex = 1;
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
        }
        
        this.movements = {
            right: false,
            left: false,
            crouch: false,
            isJumping: false,
            isShooting: false
        }

        this.animationTick = 0;
        
        //this.bullets = [];
    }
    
    onKeyEvent(event) {
        
        const enabled = event.type === 'keydown';

        switch (event.keyCode) {
            
            case KEY_RIGHT:
                this.movements.right = enabled;
                break;
            case KEY_LEFT:
                this.movements.left = enabled;
                break;
            case KEY_DOWN:
                this.movements.crouch = enabled;
                break;
            case KEY_UP:
                if (enabled) {
                    this.jump();
                }
                break;
            case KEY_FIRE:
                if (enabled) {
                    this.fire();
                }
                break;
        }
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
            )
            
            this.animate();
        }
        
        //this.bullets.forEach((bullet) => bullet.draw());
    }
    
    animate() {
        
        this.animationTick++;
        
        if (this.movements.isJumping && this.sprite.horizontalFrameIndex < 7 ) {
            this.sprite.horizontalFrameIndex = 6;
        } else if (this.movements.isJumping && this.sprite.horizontalFrameIndex >= 7) {
            this.sprite.horizontalFrameIndex = 7;
        
        } else if (this.movements.crouch && this.sprite.horizontalFrameIndex < 7) {
            this.sprite.horizontalFrameIndex = 0;
        } else if (this.movements.crouch && this.sprite.horizontalFrameIndex >= 7) {
            this.sprite.horizontalFrameIndex = 13;
        
        } else if (this.animationTick >= MARIO_RUN_ANIMATION_TICK && this.movements.right) {
            this.animationTick = 3;
            if (this.sprite.horizontalFrameIndex === 1) {
                this.sprite.horizontalFrameIndex += 2; 
            } else {
                this.sprite.horizontalFrameIndex++;
            }

            if (this.sprite.horizontalFrameIndex > 5) {
                this.sprite.horizontalFrameIndex = 3;
            }

        } else if (this.animationTick >= MARIO_RUN_ANIMATION_TICK && this.movements.left) {
            this.animationTick = 3;
            if (this.sprite.horizontalFrameIndex < 8) {
                this.sprite.horizontalFrameIndex += 8 - this.sprite.horizontalFrameIndex;
                this.sprite.horizontalFrameIndex++;
            }else {
                this.sprite.horizontalFrameIndex++;
            }
            
            if (this.sprite.horizontalFrameIndex > 10) {
                this.sprite.horizontalFrameIndex = 8;
            }
        
        } else if (!this.movements.right && !this.movements.left) {
            if(this.sprite.horizontalFrameIndex < 7) {
                this.sprite.horizontalFrameIndex = 1;
            } else {
                this.sprite.horizontalFrameIndex = 12;
            }
        }
    }
    
    move() {

        if (this.movements.right && !this.movements.crouch) {
            this.x += this.vx;
        } else if (this.movements.left && !this.movements.crouch) {
            this.x -= this.vx;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y < this.y0) {
            this.vy += MARIO_ACCELERATION;
            this.y += this.vy;
        } else {
          this.y = this.y0;
          this.movements.isJumping = false;
        }

        if (this.movements.crouch && this.y === this.y0) {
            this.h = MARIO_HEIGHT - MARIO_CROUCH_H_REDUCE;
            this.y += this.h - MARIO_CROUCH_H_PADDING;   
        } else if (!this.movements.crouch && this.h === MARIO_HEIGHT - MARIO_CROUCH_H_REDUCE) {
            this.h = MARIO_HEIGHT;
        }

        //this.bullets.forEach((bullet) => bullet.move());
    }
    
    jump() {
        
        if (!this.movements.isJumping) {
            this.movements.isJumping = true;
            this.y -= Math.ceil(this.h / 2);
            this.vy = -MARIO_SPEED_JUMP;
        }
    }

    /*fire() {

        if (!this.movements.isShutting) {
          this.movements.isShutting = true;
          this.bullets.push(new Bullet(this.ctx, this.x + this.w, this.y + Math.ceil(this.h / 2)));
          setTimeout(() => this.movements.isShutting = false, MARIO_BULLET_BACK_OFF);
        }
      }*/
}