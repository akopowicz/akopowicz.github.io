const canvas = document.getElementById('canvas');

window.onload = () => {
    if (screen.width < 400) {
        canvas.width = screen.width;
        canvas.height = screen.width / .8;
    }

    game.init();
};

class Game {
    posX = 30;
    posY = 240;
    gravity = 1.5;
    score = 0;
    pipes = [];
    pipesGap = 120;
    pipeHeight = 381;
    pipeWidth = 46;

    init = () => {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.bird = new Image();
        this.bird.src = 'images/bird.png';

        this.bg = new Image();
        this.bg.src = 'images/bg/1.png';

        this.pipeTop = new Image();
        this.pipeTop.src = 'images/pipeTop.png';

        this.pipeBottom = new Image();
        this.pipeBottom.src = 'images/pipeBottom.png';

        this.flyAudio = new Audio();
        this.flyAudio.src = 'sounds/kwak.mp3';

        document.addEventListener("click", this.moveUp);
        document.addEventListener("keydown", (e) => {
            if (e.key == " ") {
                this.moveUp();
            }
        })

        this.startGame();

    }

    startGame = () => {
        const fps = 60;
        setInterval(this.updateGame, 1000 / 60);

        this.addPipe();
    }

    addPipe = () => {
        let x = this.canvas.width;
        let y = Math.floor(Math.random() * this.pipeHeight) - this.pipeHeight;

        if (y+this.pipeHeight+ this.pipesGap>= canvas.height) {
            y = -120;
        }

        if (y+this.pipeHeight < 0) {
            y= 0 + Math.floor(Math.random());
        }
        this.pipes.push({
            top: {
                img: this.pipeTop,
                x: x,
                y: y,
                width: this.pipeWidth,
                height: this.pipeHeight,

            },

            bottom: {
                img: this.pipeBottom,
                x: x,
                y: y + this.pipeHeight + this.pipesGap,
                width: this.pipeWidth,
                height: this.pipeHeight,
            }

        });

    }

    updateGame = () => {
        this.addGravity();
        this.checkCollision();
        this.render();
    }

    checkCollision = () => {
        if (this.posY > this.canvas.height - this.bird.height) {
            this.moveUp();
        }

        if (this.posY < 0) {
            this.posY = 0;
        }

        const pipesToCheck = [...this.pipes];
        const bX = this.posX;
        const bY = this.posY;
        const bW = this.bird.width;
        const bH = this.bird.height;

        pipesToCheck.forEach(pipe => {
            if (bX + bW > pipe.top.x && bX <= pipe.top.x + pipe.top.width) {
                if (bY < pipe.top.y + pipe.top.height || bY + bH > pipe.bottom.y) {
                    this.restart();
                }
            }

            if (pipe.top.x == -1) {
                this.score++;


                if (this.score % 2 == 0) {
                    this.pipesGap--;

                    if (this.pipesGap < 110) {
                        this.pipesGap = 110;
                    }
                }
            }
        })
    }

    restart = () => {
        this.posX = 30;
        this.posY = 240;
        this.score = 0;
        this.pipes = [];
        this.pipesGap = 120;
        this.addPipe();
        this.flyAudio.play();
    }

    render = () => {
        this.context.drawImage(this.bg, 0, 0);
        this.drawPipes();
        this.context.drawImage(this.bird, this.posX, this.posY);
        this.context.fillStyle = "#fff";
        this.context.font = "20px Verdana";
        this.context.fillText(`Score: ${this.score}`, 20, 20);
    }

    drawPipes = () => {
        const pipesToDraw = [...this.pipes];


        pipesToDraw.forEach(pipe => {
            this.context.drawImage(pipe.top.img, pipe.top.x, pipe.top.y);
            pipe.top.x--;
            this.context.drawImage(pipe.bottom.img, pipe.bottom.x, pipe.bottom.y);
            pipe.bottom.x--;

          

            if (pipe.top.x == 150) {
                this.addPipe();
            }

            if (pipe.top.x + pipe.top.width < -100) {
                this.pipes.shift();
            }
        })
    }

    moveUp = () => {
        this.posY -= 30;
    }

    addGravity = () => {
        this.posY += this.gravity;
    }
}

const game = new Game();