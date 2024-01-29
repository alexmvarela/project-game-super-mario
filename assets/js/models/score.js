class Score {
    
    constructor(ctx, x, y) {
        
        this.ctx = ctx;
      
        this.x = x;
        this.y = y;
  
        this.sprite = new Image();
        this.sprite.src = 'assets/img/coin-score.png';
      
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
      
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.ceil(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.ceil(this.sprite.height / this.sprite.verticalFrames);
        }

        this.spriteMushroom = new Image();
        this.spriteMushroom.src = 'assets/img/mushroom.png';
        
        this.spriteMushroom.onload = () => {
            this.spriteMushroom.isReady = true;  
        }

        this.animationTick = 0;
  
        this.coins = 0;

        this.points = 0;

        this.lives = 3;

        this.sfx = new Audio();
        this.sfx.src = "assets/audio/enemy-hit.wav";
        this.sfx.volume = 0.5;
    }
  
    incCoins(amount = 1) {
      
        this.coins += amount;
    }

    incLives(amount = 1) {
        
        this.lives += amount;
    }

    decLives(amount = 1) {
        
        this.lives -= amount;
        this.sfx.play();
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
                SCORE_COIN_WIDTH,
                SCORE_COIN_HEIGHT
            );
        }
  
        this.ctx.save();
        this.ctx.font = '20px VT323';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.coins, SCORE_COIN_X_PADDING - (45 * RF), SCORE_COIN_Y_PADDING + (30 * RF));
        this.ctx.restore();

        this.animate();

        if (this.spriteMushroom.isReady) {
            
            this.ctx.drawImage(
                this.spriteMushroom,
                this.x + SCORE_MUSHROOM_X_PADDING,
                this.y,
                SCORE_MUSHROOM_WIDTH,
                SCORE_MUSHROOM_HEIGHT
            );
        }

        this.ctx.save();
        this.ctx.font = '20px VT323';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(this.lives, SCORE_MUSHROOM_X_PADDING + (60 * RF), SCORE_MUSHROOM_Y_PADDING + (30 * RF));
        this.ctx.restore();

        this.ctx.save();
        this.ctx.font = '20px VT323';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`SCORE x${this.points}`, SCORE_COIN_X_PADDING + (110 * RF), SCORE_COIN_Y_PADDING + (30 * RF));
        this.ctx.restore();
    }

    animate() {
        
        this.animationTick++;
    
        if (this.animationTick >= SCORE_COIN_ANIMATION_TICK) {
            
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
            
            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }
    }
}
  