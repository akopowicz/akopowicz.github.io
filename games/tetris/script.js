import Renderer from "./Renderer.js";
import Board from "./Board.js";
import Block from "./Block.js";

window.onload = () => {
    game.init();
}

class Game {
    init = async () => {
        this.renderer = Renderer.getInstance();

        this.board = new Board({
            width: this.renderer.getWidth(),
            height: this.renderer.getHeight(),
            squareSize: 20
        });

        this.block = new Block(this.board);

        await this.block.init();

        this.block.nextBlock();
        this.initControls();

        this.startGame();

    }

    initControls = () => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                if (!this.block.checkCollision(-1, 0)) {
                    this.block.moveLeft();
                }
            } else if (e.key === "ArrowRight") {
                if (!this.block.checkCollision(1, 0)) {
                    this.block.moveRight();
                }
            } else if (e.key === "ArrowUp") {
                this.block.rotateRight();
                if (this.block.checkCollision(0, 0)) {
                    this.block.rotateLeft();
                }
            } else if (e.key === "ArrowDown") {
                this.moveDown();
            }
        });
    }

    moveDown = () => {
        if (!this.block.checkCollision(0, 1)) {
            this.block.moveDown();
        } else {

            this.block.lockOnBoard();
            this.board.removeFullRows();
            this.block.nextBlock();
        }
    }

    startGame = () => {
        this.lastDropTime = Date.now();
        const fps = 30;
        this.gameInterval = setInterval(this.updateGame, 1000 / fps);
    }

    updateGame = () => {
        if (!this.board.gameOver()) {
            if ((Date.now() - this.lastDropTime) > 1000) {
                this.lastDropTime = Date.now();
                this.moveDown();
            }

            this.render();
        } else {
            clearInterval(this.gameInterval);
        }

    }

    render = () => {
        this.board.draw();
        this.block.drawOnBoard(this.board);
    }
}

const game = new Game();