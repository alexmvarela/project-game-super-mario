class Game {
    
    constructor (canvasId) {
        
        this.canvas = document.getElementById(canvasId);
        
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_W / ASPECT_RATIO;
    
        this.ctx = this.canvas.getContext('2d');

        this.fps = FPS;

        this.drawIntervalId = undefined;

        this.score = new Score(this.ctx, 15 * RF, 15 * RF);

    
        this.background = new Background(this.ctx);

        this.mario = new Mario(this.ctx, MARIO_X_PADDING, this.canvas.height - MARIO_GROUND_PADDING);

        this.goombas = [
            //new Goomba(this.ctx, 300 * RF, 286 * RF),
            //new Goomba(this.ctx, 300 * RF, 249 * RF),
            //new Goomba(this.ctx, 300 * RF, 212 * RF),
        ];

        this.spinys = [
            //new Spiny(this.ctx, 300 * RF, 297 * RF),
        ];

        this.lakitus = [
            //new Lakitu(this.ctx, 300 * RF, 250 * RF),
        ];

        this.piranhas = [
            //new Piranha(this.ctx, 300 * RF, 210 * RF),
        ];

        this.platforms = [
            //new Platform(this.ctx, 300 * RF, 243 * RF, 150 * RF, 81 * RF),
            //new Platform(this.ctx, 500 * RF, 200 * RF, 150 * RF, 125 * RF),
        ];

        this.blocksItem = [
            new BlockItem(this.ctx, 550 * RF, 150 * RF),
            //new BlockItem(this.ctx, 500 * RF, 250 * RF),
        ];

        this.blocks = [
            //new Block(this.ctx, 500, 150),
            //new Block(this.ctx, 600 * RF, 150 * RF),
            //new Block(this.ctx, 632 * RF, 150 * RF),
            //new Block(this.ctx, 410 * RF, 250 * RF),
        ];

        this.coins = [
            //new Coin(this.ctx, 300 * RF, 250 * RF),
            //new Coin(this.ctx, 330 * RF, 250 * RF),
        ];

        this.pipelines = [
            new Pipeline(this.ctx, 1000 * RF, 255 * RF, 65 * RF, 69 * RF), //Go down
            new Pipeline(this.ctx, 580 * RF, -750 * RF, 65 * RF, 750 * RF), //Left border
            new Pipeline(this.ctx, 1800 * RF, -750 * RF, 65 * RF, 750 * RF), //Right border
            new Pipeline(this.ctx, 1425 * RF, -750 * RF, 80 * RF, 550 * RF), //Go up
            new Pipeline(this.ctx, 1440 * RF, 255 * RF, 65 * RF, 69 * RF), //Up

            new Pipeline(this.ctx, 2500 * RF, 255 * RF, 65 * RF, 69 * RF), //Go down
            new Pipeline(this.ctx, 2200 * RF, -750 * RF, 65 * RF, 750 * RF), //Left border
            new Pipeline(this.ctx, 3800 * RF, -750 * RF, 65 * RF, 750 * RF), //Right border
            new Pipeline(this.ctx, 3425 * RF, -750 * RF, 80 * RF, 550 * RF), //Go up
            new Pipeline(this.ctx, 3440 * RF, 255 * RF, 65 * RF, 69 * RF), //Up

            //new Pipeline(this.ctx, 285 * RF, 255 * RF, 65 * RF, 69 * RF),
        ];
    }
   

    onKeyEvent(event) {
        
        this.mario.onKeyEvent(event);
    }

    start() {
        
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.checkCollisions();
                this.draw();
            }, this.fps);
        }
    }

    stop() {
        
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined; 
    }

    clear() {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.mario.clearBullets();
    }

    draw() {
        
        this.background.draw();
        this.score.draw();
        this.platforms.forEach((platform) => platform.draw());
        this.blocksItem.forEach((block) => block.draw());
        this.blocks.forEach((block) => block.draw());
        this.piranhas.forEach((piranha) => piranha.draw());
        this.pipelines.forEach((pipeline) => pipeline.draw());
        this.goombas.forEach((goomba) => goomba.draw());
        this.spinys.forEach((spiny) => spiny.draw());
        this.lakitus.forEach((lakitu) => lakitu.draw());
        this.coins.forEach((coin) => coin.draw());
        this.mario.draw();
    }

    move() {

        this.mario.move();
        this.background.move(this.mario);
        this.platforms.forEach((platform) => platform.move(this.background));
        this.blocksItem.forEach((block) => block.move(this.background));
        this.blocks.forEach((block) => block.move(this.background));
        this.piranhas.forEach((piranha) => piranha.move(this.background));
        this.pipelines.forEach((pipeline) => pipeline.move(this.background));
        this.coins.forEach((coin) => coin.move(this.background));
        this.goombas.forEach((goomba) => goomba.move(this.background));
        this.spinys.forEach((spiny) => spiny.move(this.background));
        this.lakitus.forEach((lakitu) => lakitu.move(this.background));
    }



    checkCollisions() {
        
        if ((this.pipelines[0].collidesWithUp(this.mario) || this.pipelines[5].collidesWithUp(this.mario)) && this.mario.movements.crouch) {
            this.background.y = -this.canvas.height;
            this.pipelines.forEach((pipeline) => pipeline.y += this.canvas.height);
            this.piranhas.forEach((piranha) => piranha.y += this.canvas.height);
            this.platforms.forEach((platform) => platform.y += this.canvas.height);
            this.blocksItem.forEach((block) => block.y += this.canvas.height);
            this.blocks.forEach((block) => block.y += this.canvas.height);
            this.coins.forEach((coin) => coin.y += this.canvas.height);
            this.goombas.forEach((goomba) => goomba.y += this.canvas.height);
            this.spinys.forEach((spiny) => spiny.y += this.canvas.height);
            this.lakitus.forEach((lakitu) => lakitu.y += this.canvas.height);
            this.mario.y = 0;
        }

        if (this.pipelines[3].collidesWithDown(this.mario) || this.pipelines[8].collidesWithDown(this.mario)) {
            this.background.y = 0;
            this.pipelines.forEach((pipeline) => pipeline.y -= this.canvas.height);
            this.piranhas.forEach((piranha) => piranha.y -= this.canvas.height);
            this.platforms.forEach((platform) => platform.y -= this.canvas.height);
            this.blocksItem.forEach((block) => block.y -= this.canvas.height);
            this.blocks.forEach((block) => block.y -= this.canvas.height);
            this.coins.forEach((coin) => coin.y -= this.canvas.height);
            this.goombas.forEach((goomba) => goomba.y -= this.canvas.height);
            this.spinys.forEach((spiny) => spiny.y -= this.canvas.height);
            this.lakitus.forEach((lakitu) => lakitu.y -= this.canvas.height);
        }
        
        this.pipelines.forEach((pipeline) => {
            
            if (pipeline.collidesWithDown(this.mario)) {
                this.mario.y = pipeline.y + pipeline.h;
                this.mario.vy = 0;
            }
            
            if (pipeline.collidesWithLeft(this.mario)) {
                this.mario.x = pipeline.x - this.mario.w;
            }
           
            if (pipeline.collidesWithRight(this.mario)) {
                this.mario.x = pipeline.x + pipeline.w;
            }
           
            if (pipeline.collidesWithUp(this.mario)) {
                this.mario.y = pipeline.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
           }
        });

        this.platforms.forEach((platform) => {
            
            if (platform.collidesWithUp(this.mario)) {
                this.mario.y = platform.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
           }
        });

        this.blocksItem.forEach((block) => {

            if (block.collidesWithDown(this.mario)) {
                this.mario.y = block.y + block.h;
                this.mario.vy = 0;
                block.status.isOn = false;
                block.status.isOff = true;
            }
            
            if (block.collidesWithLeft(this.mario)) {
                this.mario.x = block.x - this.mario.w - (5 * RF);
            }
           
            if (block.collidesWithRight(this.mario)) {
                this.mario.x = block.x + block.w + (5 * RF);
            }
           
            if (block.collidesWithUp(this.mario)) {
                this.mario.y = block.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;   
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
            }
        });

        this.blocks.forEach((block, index) => {

            if (block.collidesWithDown(this.mario)) {
                this.mario.y = block.y + block.h;
                this.mario.vy = 0;
                block.status.isOn = false;
                block.status.isOff = true;
            }
            
            if (block.collidesWithLeft(this.mario)) {
                this.mario.x = block.x - this.mario.w - (5 * RF);
            }
           
            if (block.collidesWithRight(this.mario)) {
                this.mario.x = block.x + block.w + (5 * RF);
            }
           
            if (block.collidesWithUp(this.mario)) {
                this.mario.y = block.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
                if (block.sprite.horizontalFrameIndex === 1 && block.animationTick > BLOCK_DELETE_DELAY) {
                    delete(this.blocks[index]);
                    this.score.points += 10;
                }
            }
        });

        this.coins.forEach((coin, index) => {

            if (coin.collidesWith(this.mario)) {
                this.score.incCoins();
                delete(this.coins[index]);
                this.score.points += 10;
            }
        });

        this.goombas.forEach((goomba, index) => {
            
            if (goomba.collidesWithLeft(this.mario)) {
                this.mario.x = goomba.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            }
           
            if (goomba.collidesWithRight(this.mario)) {
                this.mario.x = goomba.x + goomba.w + (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            }
           
            if (goomba.collidesWithUp(this.mario)) {
                this.mario.y0 = goomba.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();
                goomba.status.isAlive = false;
                goomba.status.isDead = true;
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
                if (goomba.sprite.verticalFrameIndex === 1 && goomba.animationTick > GOOMBA_DELETE_DELAY) {
                    delete(this.goombas[index]);
                    this.score.points += 100;
                }
            }
            
            this.mario.bulletsToRight.forEach((bullet) => {
                if (goomba.collidesWithBullet(bullet)) {
                    delete(this.goombas[index]);
                    this.score.points += 100; 
                }
            });

            this.mario.bulletsToLeft.forEach((bullet) => {
                if (goomba.collidesWithBullet(bullet)) {
                    delete(this.goombas[index]);
                    this.score.points += 100;  
                }
            });
        });

        this.spinys.forEach((spiny, index) => {
            
            if (spiny.collidesWithLeft(this.mario)) {
                this.mario.x = spiny.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            }
           
            if (spiny.collidesWithRight(this.mario)) {
                this.mario.x = spiny.x + spiny.w + (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            }
           
            if (spiny.collidesWithUp(this.mario)) {
                this.mario.lives--;
                this.score.decLives();
                this.mario.y0 = spiny.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
            }
            
            this.mario.bulletsToRight.forEach((bullet) => {
                if (spiny.collidesWithBullet(bullet)) {
                    delete(this.spinys[index]);
                    this.score.points += 100; 
                }
            });

            this.mario.bulletsToLeft.forEach((bullet) => {
                if (spiny.collidesWithBullet(bullet)) {
                    delete(this.spinys[index]);
                    this.score.points += 100;  
                }
            });
        });

        this.lakitus.forEach((lakitu, index) => {
            
            if (lakitu.collidesWithLeft(this.mario)) {
                this.mario.x = lakitu.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            }
           
            if (lakitu.collidesWithRight(this.mario)) {
                this.mario.x = lakitu.x + lakitu.w + (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            }
           
            if (lakitu.collidesWithUp(this.mario)) {
                this.mario.y0 = lakitu.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();
                lakitu.status.isAlive = false;
                lakitu.status.isDead = true;
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
                if (lakitu.sprite.horizontalFrameIndex === 1 && lakitu.animationTick > LAKITU_DELETE_DELAY) {
                    delete(this.lakitus[index]);
                    this.score.points += 100;
                }
            }
            
            this.mario.bulletsToRight.forEach((bullet) => {
                if (lakitu.collidesWithBullet(bullet)) {
                    delete(this.lakitus[index]);
                    this.score.points += 100; 
                }
            });

            this.mario.bulletsToLeft.forEach((bullet) => {
                if (goomba.collidesWithBullet(bullet)) {
                    delete(this.lakitus[index]);
                    this.score.points += 100;  
                }
            });
        });

        this.piranhas.forEach((piranha, index) => {
            
            if (piranha.collidesWithLeft(this.mario)) {
                this.mario.x = piranha.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            }
           
            if (piranha.collidesWithRight(this.mario)) {
                this.mario.x = piranha.x + piranha.w + (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            }
           
            if (piranha.collidesWithUp(this.mario)) {
                this.mario.lives--;
                this.score.decLives();
                this.mario.y0 = piranha.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
            }
            
            this.mario.bulletsToRight.forEach((bullet) => {
                if (piranha.collidesWithBullet(bullet)) {
                    delete(this.piranhas[index]);
                    this.score.points += 100; 
                }
            });

            this.mario.bulletsToLeft.forEach((bullet) => {
                if (piranha.collidesWithBullet(bullet)) {
                    delete(this.piranhas[index]);
                    this.score.points += 100;  
                }
            });
        });
    }      
}