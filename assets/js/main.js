window.addEventListener('load', () => {
   
        const game = new Game('main-canvas');
    
        document.addEventListener('keydown', (event) => game.onKeyEvent(event));
        document.addEventListener('keyup', (event) => game.onKeyEvent(event));

        const startBtn = document.getElementById("start-btn");

        startBtn.addEventListener('click', () => {
            const startPanel = document.getElementById("start-panel");
            startPanel.classList.add('hidden');
            const canvas = document.getElementById('main-canvas');
            canvas.classList.remove('hidden');
            
            if (!game.introCompleted) {
                game.intro();
            }
            if (game.gameEnd) {
                window.location.reload();
            }
        });
});

const btnControls = document.getElementById("btn-controls");

btnControls.addEventListener('click', () => {
    const controls = document.getElementById("controls");
    const controlsClass = controls.getAttribute('class');
    if (controlsClass === 'hidden-controls') {
        controls.classList.remove("hidden-controls");
        controls.classList.add("show-controls");
    } else {
        controls.classList.remove('show-controls');
        controls.classList.add('hidden-controls');
    }    
});