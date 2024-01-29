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

        this.status = {
            isNotFire: true,
            isFire: false,
        }

        this.animationTick = 0;
        
        this.bulletsToRight = [];
        this.bulletsToLeft = [];

        this.spriteFire = new Image();
        this.spriteFire.src = 'assets/img/mario-fire.png';

        this.spriteFire.onload = () => {
            this.spriteFire.isReady = true;
        }

        this.sfxJump = new Audio();
        this.sfxJump.src = 'assets/audio/jump.wav';
        this.sfxJump.volume = 0.5;

        this.sfxFireball = new Audio();
        this.sfxFireball.src = 'assets/audio/fireball.wav';
        this.sfxFireball.volume = 0.5;

        this.sfxGameOver = new Audio();
        this.sfxGameOver.src = 'assets/audio/game-over.mp3';
        this.sfxGameOver.volume = 0.7;
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
            case KEY_CROUCH:
                this.movements.crouch = enabled;
                break;
            case KEY_JUMP_1:
                if (enabled) {
                    this.jump();
                    this.sfxJumpPlay();
                }
                break;
            case KEY_JUMP_2:
                if (enabled) {
                    this.jump();
                    this.sfxJumpPlay();
                }
                break;
            case KEY_SHOOT_1:
                if (enabled & this.status.isFire) {
                    this.shoot();
                    this.sfxFireballPlay();
                }
                break;
            case KEY_SHOOT_2:
                if (enabled && this.status.isFire) {
                    this.shoot();
                    this.sfxFireballPlay();
                }
                break;
        }
    }
    
    draw() {

        if (this.sprite.isReady && this.status.isNotFire) {
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

        if (this.spriteFire.isReady && this.status.isFire) {
            this.ctx.drawImage(
                this.spriteFire,
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
        
        this.bulletsToRight.forEach((bullet) => bullet.draw());
        this.bulletsToLeft.forEach((bullet) => bullet.draw());
    }
    
    animate() {
        
        this.animationTick++;
        
        if (this.movements.isJumping && this.sprite.horizontalFrameIndex < 7) {
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
            } else {
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
            this.y += this.h - (MARIO_HEIGHT - (MARIO_CROUCH_H_REDUCE * RF));   
        } else if (!this.movements.crouch && this.h === MARIO_HEIGHT - MARIO_CROUCH_H_REDUCE) {
            this.h = MARIO_HEIGHT;
        }

        this.bulletsToRight.forEach((bullet) => bullet.moveRight());
        this.bulletsToLeft.forEach((bullet) => bullet.moveLeft());
    }
    
    jump() {
        
        if (!this.movements.isJumping) {
            this.movements.isJumping = true;
            this.y -= Math.ceil(this.h / 2);
            this.vy = -MARIO_SPEED_JUMP;
        }
    }
    
    shoot() {
        
        if (!this.movements.isShooting && !this.movements.crouch) {
            this.movements.isShooting = true;
            if (this.sprite.horizontalFrameIndex < 7) {
                this.bulletsToRight.push(new Bullet(this.ctx, this.x + this.w, this.y + Math.ceil(this.h / 2.5)));
            } else {
                this.bulletsToLeft.push(new Bullet(this.ctx, this.x, this.y + Math.ceil(this.h / 2.5)));
            }
            setTimeout(() => this.movements.isShooting = false, MARIO_BULLET_BACK_OFF);
        }
    }

    clearBullets() {

        this.bulletsToRight = this.bulletsToRight.filter((bullet) => bullet.x < this.ctx.canvas.width);
        this.bulletsToLeft = this.bulletsToLeft.filter((bullet) => bullet.x < this.ctx.canvas.width);
    }

    sfxJumpPlay() {

        this.sfxJump.play(); 
    }

    sfxFireballPlay() {
        
        this.sfxFireball.play();
    }
}