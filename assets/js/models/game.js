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
            new Goomba(this.ctx, 650 * RF, 286 * RF),
            //new Goomba(this.ctx, 300 * RF, 249 * RF),
            //new Goomba(this.ctx, 300 * RF, 212 * RF),
        ];

        this.spinys = [
            //new Spiny(this.ctx, 300 * RF, 297 * RF),
        ];

        this.lakitus = [
            new Lakitu(this.ctx, 1250 * RF, 150 * RF),
        ];

        this.piranhas = [
            new Piranha(this.ctx, 1710 * RF, 210 * RF),
        ];

        this.platforms = [
            new Platform(this.ctx, 680 * RF, 200 * RF, 150 * RF, 125 * RF),
            //new Platform(this.ctx, 380 * RF, 200 * RF, 150 * RF, 125 * RF),
        ];

        this.blocksItem = [
            new BlockItem(this.ctx, 350 * RF, 175 * RF),
            new BlockItem(this.ctx, 1200 * RF, 175 * RF),
        ];

        this.blocks = [
            new Block(this.ctx, 300 * RF, 175 * RF),
            new Block(this.ctx, 400 * RF, 175 * RF),
            new Block(this.ctx, 1300 * RF, 250 * RF),
            //new Block(this.ctx, 1550 * RF, 250 * RF),
        ];

        this.coins = [
            new Coin(this.ctx, 694 * RF, 120 * RF),
            new Coin(this.ctx, 716 * RF, 120 * RF),
            new Coin(this.ctx, 738 * RF, 120 * RF),
            new Coin(this.ctx, 760 * RF, 120 * RF),
            new Coin(this.ctx, 782 * RF, 120 * RF),
            new Coin(this.ctx, 804 * RF, 120 * RF),

            //new
        ];

        this.mushrooms = [];

        this.flowers = [];

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

            new Pipeline(this.ctx, 150 * RF, 255 * RF, 65 * RF, 69 * RF),
            new Pipeline(this.ctx, 1700 * RF, 255 * RF, 65 * RF, 69 * RF),
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
        this.platforms.forEach((platform) => platform.draw());
        this.blocksItem.forEach((block) => block.draw());
        this.blocks.forEach((block) => block.draw());
        this.piranhas.forEach((piranha) => piranha.draw());
        this.pipelines.forEach((pipeline) => pipeline.draw());
        this.goombas.forEach((goomba) => goomba.draw());
        this.spinys.forEach((spiny) => spiny.draw());
        this.lakitus.forEach((lakitu) => lakitu.draw());
        this.coins.forEach((coin) => coin.draw());
        this.mushrooms.forEach((mushroom) => mushroom.draw());
        this.flowers.forEach((flower) => flower.draw());
        this.mario.draw();
        this.score.draw();
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
        this.mushrooms.forEach((mushroom) => mushroom.move(this.background));
        this.flowers.forEach((flower) => flower.move(this.background));
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
            this.mushrooms.forEach((mushroom) => mushroom.y += this.canvas.height);
            this.flowers.forEach((flower) => flower.y += this.canvas.height);
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
            this.mushrooms.forEach((mushroom) => mushroom.y -= this.canvas.height);
            this.mushrooms.forEach((flower) => flower.y -= this.canvas.height);
            this.goombas.forEach((goomba) => goomba.y -= this.canvas.height);
            this.spinys.forEach((spiny) => spiny.y -= this.canvas.height);
            this.lakitus.forEach((lakitu) => lakitu.y -= this.canvas.height);
        }
        
        this.pipelines.forEach((pipeline) => {
            
            if (pipeline.collidesWithUp(this.mario)) {
                this.mario.y = pipeline.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
            
            } else if (pipeline.collidesWithDown(this.mario)) {
                this.mario.y = pipeline.y + pipeline.h;
                this.mario.vy = 0;
            
            } else if (pipeline.collidesWithLeft(this.mario)) {
                this.mario.x = pipeline.x - this.mario.w;
            
            } else if (pipeline.collidesWithRight(this.mario)) {
                this.mario.x = pipeline.x + pipeline.w;
            
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
            }
           
            this.mario.bulletsToRight.forEach((bullet, index) => {
                if (pipeline.collidesWithLeft(bullet)) {
                    delete(this.mario.bulletsToRight[index]);
                }
            });

            this.mario.bulletsToLeft.forEach((bullet, index) => {
                if (pipeline.collidesWithRight(bullet)) {
                    delete(this.mario.bulletsToLeft[index]);
                }
            });

            this.mario.bulletsToLeft.forEach((bullet, index) => {
                if (pipeline.collidesWithUp(bullet)) {
                    delete(this.mario.bulletsToLeft[index]);
                }
            });

            this.mario.bulletsToRight.forEach((bullet, index) => {
                if (pipeline.collidesWithUp(bullet)) {
                    delete(this.mario.bulletsToRight[index]);
                }
            });

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

            if (block.collidesWithUp(this.mario)) {
                this.mario.y = block.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
            
            } else if (block.collidesWithDown(this.mario)) {
                this.mario.y = block.y + block.h;
                this.mario.vy = 0;
                if (block.status.isOn && this.score.lives > 40 && this.mario.status.isNotFire) {
                    this.flowers.push(new Flower(this.ctx, block.x, block.y - FLOWER_HEIGHT));
                } else if (block.status.isOn && this.score.lives > 40 && this.mario.status.isFire) {
                    this.coins.push(new Coin(this.ctx, block.x + (4 * RF), block.y - COIN_HEIGHT));
                    this.coins.push(new Coin(this.ctx, block.x + (4 * RF), block.y - (COIN_HEIGHT * 2)));
                    this.coins.push(new Coin(this.ctx, block.x + (4 * RF), block.y - (COIN_HEIGHT * 3)));
                    this.score.points += 10;
                } else if (block.status.isOn) {
                    this.mushrooms.push(new Mushroom(this.ctx, block.x + (2 * RF), block.y - SCORE_MUSHROOM_HEIGHT))
                }
                block.status.isOn = false;
                block.status.isOff = true;  
            
            } else if (block.collidesWithLeft(this.mario)) {
                this.mario.x = block.x - this.mario.w - (5 * RF);
            
            } else if (block.collidesWithRight(this.mario)) {
                this.mario.x = block.x + block.w + (5 * RF);
            
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
            }
        });

        this.blocks.forEach((block, index) => {

            if (block.collidesWithUp(this.mario)) {
                this.mario.y = block.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
            
            } else if (block.collidesWithDown(this.mario)) {
                this.mario.y = block.y + block.h;
                this.mario.vy = 0;
                block.status.isOn = false;
                block.status.isOff = true;
            } else if (block.collidesWithLeft(this.mario)) {
                this.mario.x = block.x - this.mario.w - (5 * RF);
            } else if (block.collidesWithRight(this.mario)) {
                this.mario.x = block.x + block.w + (5 * RF);
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
                this.score.points += 5;
            }
        });

        this.mushrooms.forEach((mushroom, index) => {

            if (mushroom.collidesWith(this.mario)) {
                this.score.incLives();
                delete(this.mushrooms[index]);
                this.score.points += 5;
            }
        });

        this.flowers.forEach((flower, index) => {

            if (flower.collidesWith(this.mario)) {
                this.mario.status.isNotFire = false;
                this.mario.status.isFire = true;
                delete(this.flowers[index]);
                this.score.points += 5;
            }
        });

        this.goombas.forEach((goomba, index) => {
            
            if (goomba.collidesWithUp(this.mario)) {
                this.mario.y0 = goomba.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();
                goomba.status.isAlive = false;
                goomba.status.isDead = true;
            
            } else if (goomba.collidesWithLeft(this.mario)) {
                this.mario.x = goomba.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
                this.score.decLives();
            } else if (goomba.collidesWithRight(this.mario)) {
                this.mario.x = goomba.x + goomba.w + (5 * RF);
                this.mario.lives --;
                this.score.decLives();
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
            
            if (spiny.collidesWithUp(this.mario)) {
                this.mario.lives--;
                this.score.decLives();
                this.mario.y0 = spiny.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();

            } else if (spiny.collidesWithLeft(this.mario)) {
                this.mario.x = spiny.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            
            } else if (spiny.collidesWithRight(this.mario)) {
                this.mario.x = spiny.x + spiny.w + (5 * RF);
                this.mario.lives --;
                this.score.decLives();
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
            
            if (lakitu.collidesWithUp(this.mario)) {
                this.mario.y0 = lakitu.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();
                lakitu.status.isAlive = false;
                lakitu.status.isDead = true;
            
            } else if (lakitu.collidesWithLeft(this.mario)) {
                this.mario.x = lakitu.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            
            } else if (lakitu.collidesWithRight(this.mario)) {
                this.mario.x = lakitu.x + lakitu.w + (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            
            } else if (lakitu.collidesWithDown(this.mario)) {
                this.mario.lives --;
                this.score.decLives();
            
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
                if (lakitu.collidesWithBullet(bullet)) {
                    delete(this.lakitus[index]);
                    this.score.points += 100;  
                }
            });
        });

        this.piranhas.forEach((piranha, index) => {
            
            if (piranha.collidesWithUp(this.mario)) {
                this.mario.lives--;
                this.score.decLives();
                this.mario.y0 = piranha.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();
            
            } else if (piranha.collidesWithLeft(this.mario)) {
                this.mario.x = piranha.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            
            } else if (piranha.collidesWithRight(this.mario)) {
                this.mario.x = piranha.x + piranha.w + (5 * RF);
                this.mario.lives --;
                this.score.decLives();
            
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