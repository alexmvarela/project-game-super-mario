class Intro {
    
    constructor (canvasId) {
        
        this.canvas = document.getElementById(canvasId);
        
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_W / ASPECT_RATIO;
    
        this.ctx = this.canvas.getContext('2d');

        this.isCompleted = false;

        this.background = new Image();
        this.background.src = 'assets/img/backgrounds/bg-intro.jpg';
        this.backgroundX = 0;
        this.backgroundY = 0;
        this.backgroundW = CANVAS_W;
        this.backgroundH = CANVAS_W / ASPECT_RATIO;


        this.background.onload = () => {
            this.background.isReady = true;
        }
    }

    start() {
        this.draw();
    }

    draw() {
        if (this.background.isReady) {
            this.ctx.drawImage(
                    this.background,
                    this.backgroundX,
                    this.backgroundY,
                    this.backgroundW,
                    this.backgroundH
            )
        }
    }
}