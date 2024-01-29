class Game {
    
    constructor (canvasId) {
        
        this.canvas = document.getElementById(canvasId);
        
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_W / ASPECT_RATIO;
    
        this.ctx = this.canvas.getContext('2d');

        this.fps = FPS;

        this.drawIntervalId = undefined;

        this.gameEnd = false;

        this.mainTheme = new Audio ();
        this.mainTheme.src = "assets/audio/ground-theme.mp3";
        this.mainTheme.volume = 0.7;

        this.levelCompletedTheme = new Audio();
        this.levelCompletedTheme.src = "assets/audio/level-completed.mp3"
        this.levelCompletedTheme.volume = 0.7;

        this.sfxEnemyDefeated = new Audio();
        this.sfxEnemyDefeated.src = "assets/audio/enemy-defeated.wav";
        this.sfxEnemyDefeated.volume = 0.7;

        this.sfxShrink = new Audio();
        this.sfxShrink.src = "assets/audio/shrink.wav";
        this.sfxShrink.volume = 0.7;

        this.score = new Score(this.ctx, 15 * RF, 25 * RF);

    
        this.background = new Background(this.ctx);

        this.mario = new Mario(this.ctx, MARIO_X_PADDING, this.canvas.height - MARIO_GROUND_PADDING);

        this.flag = new Flag(this.ctx, 4650 * RF, 256 * RF);

        this.goombas = [
            new Goomba(this.ctx, 570 * RF, 286 * RF),
            new Goomba(this.ctx, 1900 * RF, 286 * RF),
            new Goomba(this.ctx, 1900 * RF, (286 * RF) - GOOMBA_HEIGHT ),
            new Goomba(this.ctx, 3650 * RF, 286 * RF),
            new Goomba(this.ctx, 3700 * RF, 286 * RF),
            new Goomba(this.ctx, 3700 * RF, (286 * RF) - GOOMBA_HEIGHT),
            new Goomba(this.ctx, 3750 * RF, 286 * RF),
            new Goomba(this.ctx, 3750 * RF, (286 * RF) - GOOMBA_HEIGHT),
            new Goomba(this.ctx, 3750 * RF, (286 * RF) - (GOOMBA_HEIGHT * 2)),
            new Goomba(this.ctx, 3800 * RF, 286 * RF),
            new Goomba(this.ctx, 3800 * RF, 286 * RF - GOOMBA_HEIGHT),
            new Goomba(this.ctx, 3850 * RF, 286 * RF),
        ];

        this.spinys = [
            new Spiny(this.ctx, 2950 * RF, 297 * RF),
            new Spiny(this.ctx, 2987 * RF, 297 * RF),
            new Spiny(this.ctx, 3130 * RF, 297 * RF),
            new Spiny(this.ctx, 3130 * RF, (297 * RF) - SPINY_HEIGHT),
            new Spiny(this.ctx, 3250 * RF, 297 * RF),
            new Spiny(this.ctx, 3287 * RF, 297 * RF),
            new Spiny(this.ctx, 4350 * RF, 297 * RF),
            new Spiny(this.ctx, 4387 * RF, 297 * RF),
            new Spiny(this.ctx, 4424 * RF, 297 * RF),
        ];

        this.lakitus = [
            new Lakitu(this.ctx, 1250 * RF, 150 * RF),
            new Lakitu(this.ctx, 2000 * RF, 150 * RF),
            new Lakitu(this.ctx, 4450 * RF, 150 * RF),
        ];

        this.piranhas = [
            new Piranha(this.ctx, 1710 * RF, 210 * RF),
            new Piranha(this.ctx, 4140 * RF, 210 * RF),
        ];

        this.platforms = [
            new Platform(this.ctx, 680 * RF, 200 * RF, 150 * RF, 125 * RF),
            new Platform(this.ctx, 2150 * RF, 100 * RF, 150 * RF, 125 * RF),
            new Platform(this.ctx, 2400 * RF, 100 * RF, 150 * RF, 125 * RF),
            new Platform(this.ctx, 2200 * RF, 200 * RF, 300 * RF, 125 * RF),
        ];

        this.blocksItem = [
            new BlockItem(this.ctx, 350 * RF, 175 * RF),
            new BlockItem(this.ctx, 1200 * RF, 175 * RF),
            new BlockItem(this.ctx, 1600 * RF, 175 * RF),
            new BlockItem(this.ctx, 2764 * RF, 55 * RF),
            new BlockItem(this.ctx, 4300 * RF, 175 * RF),
        ];

        this.blocks = [
            new Block(this.ctx, 300 * RF, 175 * RF),
            new Block(this.ctx, 400 * RF, 175 * RF),
            new Block(this.ctx, 1300 * RF, 250 * RF),
            new Block(this.ctx, 1400 * RF, -200 * RF),
            new Block(this.ctx, 2700 * RF, 190 * RF),
            new Block(this.ctx, 2732 * RF, 190 * RF),
            new Block(this.ctx, 2764 * RF, 190 * RF),
            new Block(this.ctx, 2796 * RF, 190 * RF),
            new Block(this.ctx, 2828 * RF, 190 * RF),
            new Block(this.ctx, 2630 * RF, 90 * RF),
            new Block(this.ctx, 3400 * RF, -200 * RF),
        ];

        this.switchs = [
            new Switch(this.ctx, 900 * RF, - 90 * RF),
            new Switch(this.ctx, 2400 * RF, - 90 * RF),
            new Switch(this.ctx, 2900 * RF, - 90 * RF),
            new Switch(this.ctx, 3700 * RF, - 90 * RF),
        ];

        this.coins = [
            new Coin(this.ctx, 694 * RF, 120 * RF),
            new Coin(this.ctx, 716 * RF, 120 * RF),
            new Coin(this.ctx, 738 * RF, 120 * RF),
            new Coin(this.ctx, 760 * RF, 120 * RF),
            new Coin(this.ctx, 782 * RF, 120 * RF),
            new Coin(this.ctx, 804 * RF, 120 * RF),

            new Coin (this.ctx, 1450 * RF, -90 * RF),
            new Coin (this.ctx, 1450 * RF, -120 * RF),
            new Coin (this.ctx, 1450 * RF, -150 * RF),
            new Coin (this.ctx, 1450 * RF, -180 * RF),

            new Coin(this.ctx, 1550 * RF, 300 * RF),
            new Coin(this.ctx, 1572 * RF, 300 * RF),
            new Coin(this.ctx, 1594 * RF, 300 * RF),
            new Coin(this.ctx, 1616 * RF, 300 * RF),
            new Coin(this.ctx, 1638 * RF, 300 * RF),

            new Coin(this.ctx, 2150 * RF, 75 * RF),
            new Coin(this.ctx, 2172 * RF, 75 * RF),
            new Coin(this.ctx, 2194 * RF, 75 * RF),
            new Coin(this.ctx, 2216 * RF, 75 * RF),
            new Coin(this.ctx, 2238 * RF, 75 * RF),
            new Coin(this.ctx, 2260 * RF, 75 * RF),

            new Coin(this.ctx, 2400 * RF, 75 * RF),
            new Coin(this.ctx, 2422 * RF, 75 * RF),
            new Coin(this.ctx, 2444 * RF, 75 * RF),
            new Coin(this.ctx, 2466 * RF, 75 * RF),
            new Coin(this.ctx, 2488 * RF, 75 * RF),
            new Coin(this.ctx, 2510 * RF, 75 * RF),

            new Coin(this.ctx, 2250 * RF, 175 * RF),
            new Coin(this.ctx, 2272 * RF, 175 * RF),
            new Coin(this.ctx, 2294 * RF, 175 * RF),
            new Coin(this.ctx, 2316 * RF, 175 * RF),
            new Coin(this.ctx, 2338 * RF, 175 * RF),
            new Coin(this.ctx, 2360 * RF, 175 * RF),
            new Coin(this.ctx, 2382 * RF, 175 * RF),
            new Coin(this.ctx, 2404 * RF, 175 * RF),
            new Coin(this.ctx, 2426 * RF, 175 * RF), 
            
            new Coin(this.ctx, 4085 * RF, 50 * RF),
            new Coin(this.ctx, 4085 * RF, 72 * RF),
            new Coin(this.ctx, 4085 * RF, 94 * RF),
            new Coin(this.ctx, 4085 * RF, 116 * RF),
        ];

        this.mushrooms = [];

        this.flowers = [];

        this.pipelines = [
            new Pipeline(this.ctx, 1000 * RF, 255 * RF, 65 * RF, 69 * RF), //Go down
            new Pipeline(this.ctx, 580 * RF, -750 * RF, 65 * RF, 700 * RF), //Left border
            new Pipeline(this.ctx, 1810 * RF, -750 * RF, 65 * RF, 700 * RF), //Right border
            new Pipeline(this.ctx, 1425 * RF, -750 * RF, 80 * RF, 550 * RF), //Go up
            new Pipeline(this.ctx, 1440 * RF, 255 * RF, 65 * RF, 69 * RF), //Up

            new Pipeline(this.ctx, 2500 * RF, 255 * RF, 65 * RF, 69 * RF), //Go down
            new Pipeline(this.ctx, 2160 * RF, -750 * RF, 65 * RF, 700 * RF), //Left border
            new Pipeline(this.ctx, 3850 * RF, -750 * RF, 65 * RF, 700 * RF), //Right border
            new Pipeline(this.ctx, 3425 * RF, -750 * RF, 80 * RF, 550 * RF), //Go up
            new Pipeline(this.ctx, 3440 * RF, 255 * RF, 65 * RF, 69 * RF), //Up

            new Pipeline(this.ctx, 150 * RF, 255 * RF, 65 * RF, 69 * RF),
            new Pipeline(this.ctx, 1700 * RF, 255 * RF, 65 * RF, 69 * RF),
            new Pipeline(this.ctx, 1700 * RF, -120 * RF, 65 * RF, 69 * RF),

            new Pipeline(this.ctx, 4000 * RF, 255 * RF, 65 * RF, 69 * RF),
            new Pipeline(this.ctx, 4065 * RF, 155 * RF, 65 * RF, 169 * RF),
            new Pipeline(this.ctx, 4130 * RF, 255 * RF, 65 * RF, 69 * RF),
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
                this.levelCompleted();
                this.gameOver();
                this.draw();

                if (this.mainTheme.currentTime > 180) {
                    this.mainTheme.currentTime = 0;
                }
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
        this.switchs.forEach((item) => item.draw());
        this.piranhas.forEach((piranha) => piranha.draw());
        this.pipelines.forEach((pipeline) => pipeline.draw());
        this.goombas.forEach((goomba) => goomba.draw());
        this.spinys.forEach((spiny) => spiny.draw());
        this.lakitus.forEach((lakitu) => lakitu.draw());
        this.coins.forEach((coin) => coin.draw());
        this.mushrooms.forEach((mushroom) => mushroom.draw());
        this.flowers.forEach((flower) => flower.draw());
        this.flag.draw();
        this.mario.draw();
        this.score.draw();
    }

    move() {

        this.mario.move();
        this.background.move(this.mario);
        this.flag.move(this.background);
        this.platforms.forEach((platform) => platform.move(this.background));
        this.blocksItem.forEach((block) => block.move(this.background));
        this.blocks.forEach((block) => block.move(this.background));
        this.switchs.forEach((item) => item.move(this.background));
        this.piranhas.forEach((piranha) => piranha.move(this.background));
        this.pipelines.forEach((pipeline) => pipeline.move(this.background));
        this.coins.forEach((coin) => coin.move(this.background));
        this.mushrooms.forEach((mushroom) => mushroom.move(this.background));
        this.flowers.forEach((flower) => flower.move(this.background));
        this.goombas.forEach((goomba) => goomba.move(this.background));
        this.spinys.forEach((spiny) => spiny.move(this.background));
        this.lakitus.forEach((lakitu) => lakitu.move(this.background));
    }

    levelCompleted() {
        
        if (this.background.x < -(BACKGROUND_WIDTH - CANVAS_W)) {
            this.mainTheme.pause();
            this.mainTheme.currentTime = 0;
            this.levelCompletedTheme.play();
            this.mario.vx = 0;
            this.flag.y -= this.flag.vy;
        }
        
        if (this.flag.y <= this.flag.y0) {
            this.stop();
            setTimeout(() => {
               this.ctx.save(); 
               this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
               this.ctx.fillStyle = 'white'
               this.ctx.font = '40px VT323';
               this.ctx.fillText('> STAGE CLEAR;', 30 * RF, 100 * RF);
               this.ctx.fillText('> click START to play again;', 30 * RF, 140 * RF);
               this.ctx.restore();
               this.gameEnd = true;
            }, 4000);
        }
    }

    gameOver() {
        
        if (this.score.lives <= 0) {
            this.mainTheme.pause();
            this.mainTheme.currentTime = 0;
            this.mario.sfxGameOver.play();
            this.stop();
            setTimeout(() => {
                this.ctx.save(); 
                this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
                this.ctx.fillStyle = 'white'
                this.ctx.font = '40px VT323';
                this.ctx.fillText('> GAME OVER;', 30 * RF, 100 * RF);
                this.ctx.fillText('> click START to play again;', 30 * RF, 140 * RF);
                this.ctx.restore();
                this.gameEnd = true;
            }, 4000);
        }
    }

    mainThemePlay() {
        
        this.mainTheme.play();
    }

    checkCollisions() {
        
        if ((this.pipelines[0].collidesWithUp(this.mario) || this.pipelines[5].collidesWithUp(this.mario)) && this.mario.movements.crouch) {
            this.sfxShrink.play();
            this.background.y = -this.canvas.height;
            this.flag.y += this.canvas.height;
            this.pipelines.forEach((pipeline) => pipeline.y += this.canvas.height);
            this.piranhas.forEach((piranha) => piranha.y += this.canvas.height);
            this.platforms.forEach((platform) => platform.y += this.canvas.height);
            this.blocksItem.forEach((block) => block.y += this.canvas.height);
            this.blocks.forEach((block) => block.y += this.canvas.height);
            this.switchs.forEach((item) => item.y += this.canvas.height);
            this.coins.forEach((coin) => coin.y += this.canvas.height);
            this.mushrooms.forEach((mushroom) => mushroom.y += this.canvas.height);
            this.flowers.forEach((flower) => flower.y += this.canvas.height);
            this.goombas.forEach((goomba) => goomba.y += this.canvas.height);
            this.spinys.forEach((spiny) => spiny.y += this.canvas.height);
            this.lakitus.forEach((lakitu) => lakitu.y += this.canvas.height);
            this.mario.y = 0;
        }

        if (this.pipelines[3].collidesWithDown(this.mario) || this.pipelines[8].collidesWithDown(this.mario)) {
            this.sfxShrink.play();
            this.background.y = 0;
            this.flag.y -= this.canvas.height;
            this.pipelines.forEach((pipeline) => pipeline.y -= this.canvas.height);
            this.piranhas.forEach((piranha) => piranha.y -= this.canvas.height);
            this.platforms.forEach((platform) => platform.y -= this.canvas.height);
            this.blocksItem.forEach((block) => block.y -= this.canvas.height);
            this.blocks.forEach((block) => block.y -= this.canvas.height);
            this.coins.forEach((coin) => coin.y -= this.canvas.height);
            this.switchs.forEach((item) => item.y -= this.canvas.height);
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
                block.sfxPlay();
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
                block.sfxPlay();
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
                coin.sfxPlay();
                this.score.points += 5;
            }
        });

        this.mushrooms.forEach((mushroom, index) => {

            if (mushroom.collidesWith(this.mario)) {
                mushroom.sfx.play();
                this.score.incLives();
                delete(this.mushrooms[index]);
                this.score.points += 5;
            }
        });

        this.flowers.forEach((flower, index) => {

            if (flower.collidesWith(this.mario)) {
                flower.sfxPowerupPlay();
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
                this.sfxEnemyDefeated.play();
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
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
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
                    this.sfxEnemyDefeated.play();
                    delete(this.goombas[index]);
                    this.score.points += 100; 
                }
            });

            this.mario.bulletsToLeft.forEach((bullet) => {
                if (goomba.collidesWithBullet(bullet)) {
                    this.sfxEnemyDefeated.play();
                    delete(this.goombas[index]);
                    this.score.points += 100;  
                }
            });
        });

        this.spinys.forEach((spiny, index) => {
            
            if (spiny.collidesWithUp(this.mario)) {
                this.mario.lives--;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
                this.score.decLives();
                this.mario.y0 = spiny.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();

            } else if (spiny.collidesWithLeft(this.mario)) {
                this.mario.x = spiny.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
                this.score.decLives();
            
            } else if (spiny.collidesWithRight(this.mario)) {
                this.mario.x = spiny.x + spiny.w + (5 * RF);
                this.mario.lives --;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
                this.score.decLives();
            
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
            }
            
            this.mario.bulletsToRight.forEach((bullet) => {
                if (spiny.collidesWithBullet(bullet)) {
                    this.sfxEnemyDefeated.play();
                    delete(this.spinys[index]);
                    this.score.points += 100; 
                }
            });

            this.mario.bulletsToLeft.forEach((bullet) => {
                if (spiny.collidesWithBullet(bullet)) {
                    this.sfxEnemyDefeated.play();
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
                this.sfxEnemyDefeated.play();
                this.mario.jump();
                lakitu.status.isAlive = false;
                lakitu.status.isDead = true;
            
            } else if (lakitu.collidesWithLeft(this.mario)) {
                this.mario.x = lakitu.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
                this.score.decLives();
            
            } else if (lakitu.collidesWithRight(this.mario)) {
                this.mario.x = lakitu.x + lakitu.w + (5 * RF);
                this.mario.lives --;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
                this.score.decLives();
            
            } else if (lakitu.collidesWithDown(this.mario)) {
                this.mario.lives --;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
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
                    this.sfxEnemyDefeated.play();
                    delete(this.lakitus[index]);
                    this.score.points += 100; 
                }
            });

            this.mario.bulletsToLeft.forEach((bullet) => {
                if (lakitu.collidesWithBullet(bullet)) {
                    this.sfxEnemyDefeated.play();
                    delete(this.lakitus[index]);
                    this.score.points += 100;  
                }
            });
        });

        this.piranhas.forEach((piranha, index) => {
            
            if (piranha.collidesWithUp(this.mario)) {
                this.mario.lives--;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
                this.score.decLives();
                this.mario.y0 = piranha.y - this.mario.h;
                this.mario.vy = 0;
                this.mario.movements.isJumping = false;
                this.mario.jump();
            
            } else if (piranha.collidesWithLeft(this.mario)) {
                this.mario.x = piranha.x - this.mario.w - (5 * RF);
                this.mario.lives --;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
                this.score.decLives();
            
            } else if (piranha.collidesWithRight(this.mario)) {
                this.mario.x = piranha.x + piranha.w + (5 * RF);
                this.mario.lives --;
                this.mario.status.isFire = false;
                this.mario.status.isNotFire = true;
                this.score.decLives();
            
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
            }
            
            this.mario.bulletsToRight.forEach((bullet) => {
                if (piranha.collidesWithBullet(bullet)) {
                    this.sfxEnemyDefeated.play();
                    delete(this.piranhas[index]);
                    this.score.points += 100; 
                }
            });

            this.mario.bulletsToLeft.forEach((bullet) => {
                if (piranha.collidesWithBullet(bullet)) {
                    this.sfxEnemyDefeated.play();
                    delete(this.piranhas[index]);
                    this.score.points += 100;  
                }
            });
        });

        this.switchs.forEach((item, index) => {
            
            if (item.collidesWithUp(this.mario)) {
                item.sfx.play();
                item.status.isOn = false;
                item.status.isOff = true;
                if (index === 0 || index === 2) {
                    for (let i = 1; i < 12; i ++) {
                        for (let j = 0; j < 7; j + j++) {
                        this.coins.push(new Coin(this.ctx, item.x + (100 * RF) + (30 * RF) * i, item.y - (30 * RF)* j));
                        }
                    }
                }
                if (index === 1) {
                    for (let i = 1; i < 6; i ++) {
                        this.coins.push(new Coin(this.ctx, item.x + (100 * RF) + (50 * RF) * i, item.y + (10 * RF)));
                        this.goombas.push(new Goomba(this.ctx, item.x + (100 * RF) + (50 * RF) * i, item.y - GOOMBA_HEIGHT));
                        
                    }
                }
                if (index === 3) {
                    this.flowers.push(new Flower(this.ctx, item.x + (60 * RF), item.y));  
                }
            
            } else if (item.collidesWithDown(this.mario)) {
                this.mario.y = item.y + item.h;
                this.mario.vy = 0;
                
            } else if (item.collidesWithLeft(this.mario)) {
                this.mario.x = item.x - this.mario.w - (5 * RF);
            
            } else if (item.collidesWithRight(this.mario)) {
                this.mario.x = item.x + item.w + (5 * RF);
            
            } else {
                this.mario.y0 = this.canvas.height - MARIO_GROUND_PADDING;
                if (item.sprite.horizontalFrameIndex === 1 && item.animationTick > SWITCH_DELETE_DELAY) {
                    delete(this.switchs[index]);
                    this.score.points += 10;
                }
            } 
        });
    }
}