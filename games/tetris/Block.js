export default class Block {
    constructor(board) {
        this.board = board;
    }

    blockTypes = null;
    activeBlock = null;
    activePatternIndex = 0;

    x = 4;
    y = 2;

    init = async () => {
        await this.loadBlocks("blocks.json");
    }

    loadBlocks = async (fileName) => {
        const data = await fetch(fileName);
        const jsonData = await data.json();

        if (!jsonData.blocks) {
            console.log("blocks not found in json file");
            return;
        }

        this.blockTypes = jsonData.blocks;
    }

    nextBlock = () => {
        this.x = 4;
        this.y = -2;
        this.activePatternIndex = 0
        this.activeBlock = this.getRandomBlock();

        return this.activeBlock;
    }

    getRandomBlock = () => {
        const randIndex = Math.floor(Math.random() * this.blockTypes.length);

        return this.blockTypes[randIndex];
    }

    nextPattern = () => {
        this.activePatternIndex++;

        if (this.activePatternIndex >= this.activeBlock.variants.length) {
            this.activePatternIndex = 0;

            return this.getActivePattern();
        }
    }

    previousPattern = () => {
        this.activePatternIndex--;

        if (this.activePatternIndex < 0) {
            this.activePatternIndex = this.activeBlock.variants.length - 1;
        }
        return this.getActivePattern();
    }

    getActivePattern = () => {
        return this.activeBlock.variants[this.activePatternIndex];
    }

    drawOnBoard = (board) => {
        const blockPattern = this.getActivePattern();

        blockPattern.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col) {
                    board.drawBoardSquare(rowIndex + this.y, colIndex + this.x, this.activeBlock.color);
                }
            })
        })
    }

    moveLeft = () => {
        this.x--;
    }

    moveRight = () => {
        this.x++;
    }

    rotateRight = () => {
        this.nextPattern();
    }

    rotateLeft = () => {
        this.previousPattern();
    }

    moveDown = () => {
        this.y++;
    }

    checkCollision = (moveX, moveY) => {

        const blockPattern = this.getActivePattern();

        for (let r = 0; r < blockPattern.length; r++) {
            const column = blockPattern[r];

            for (let c = 0; c < column.length; c++) {
                if (!blockPattern[r][c]) {
                    continue;
                }

                let newX = this.x + moveX + c;
                let newY = this.y + moveY + r;

                if (this.board.checkSquareCollision(newX, newY)) {
                    return true;
                }
            }
        }

        return false;
    }

    lockOnBoard = () => {
        const blockPattern = this.getActivePattern();

        blockPattern.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col) {
                    this.board.lockBoardSquare(rowIndex + this.y, colIndex + this.x, this.activeBlock.color);
                }
            })
        })
    }
}




