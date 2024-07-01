const cells = document.querySelectorAll(".cell");
const restartGame = document.getElementById("restart-game");
const winner = document.getElementById("winner");
const winnerWrapper = document.querySelector(".winner_wrapper");
const gameGrid = document.querySelector(".game-grid");
const closeWinner = document.querySelector(".close_winner");

const cellsHeight = () => {
    cells.forEach((cell) => {
        cell.style.height = cell.offsetWidth + "px"
    });
}

window.onload = () => {
    cellsHeight()
    winnerWrapper.style.height = gameGrid.clientHeight + 10 + "px"
    app.init();
};

window.onresize = () => {
    cellsHeight()
};

class App {
    winningVariants = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    currentPlayer = "X";
    moveCount = 0;
    moveToWin = "0"
    canClick = true;

    init = () => {
        cells.forEach(cell => {
            cell.addEventListener("click", this.cellClick)
        })

        restartGame.addEventListener("click", this.initGame);
        closeWinner.addEventListener("click", () => {
            winnerWrapper.classList.remove("show_winner")
        })
    }

    cellClick = (e) => {
        e.preventDefault()
        this.playerTurn(e.target);
    }

    playerTurn = (el) => {
        if (el.innerHTML !== "") {
            return;
        }

        el.innerHTML = this.currentPlayer;

        this.currentPlayer = "O";
        this.moveCount++

        this.checkWinner();
        setTimeout(() => {
            if (this.moveCount < 9) {
                if (document.getElementById("winner").innerHTML === "") {
                    this.autoTurn()
                }

            } else {
                document.getElementById("winner").innerHTML = "DRAW";
                winnerWrapper.classList.add("show_winner")

            }

        }, 500);
        this.preventFromClicking();
    }

    autoTurn = () => {
        let randomNumber = Math.floor(Math.random() * 9);

        this.winningVariants.forEach(variant => {
            const a = this.getCellValue(variant[0]);
            const b = this.getCellValue(variant[1]);
            const c = this.getCellValue(variant[2]);

            if (a === "" || b === "" || c === "") {
                if (a !== "X" && a !== "") {
                    if (a == b) {
                        randomNumber = variant[2]
                        return;
                    } else if (a == c) {
                        randomNumber = variant[1]
                        return;
                    }
                } else if (c !== "X" && c !== "") {
                    if (c == b) {
                        randomNumber = variant[0]
                        return;
                    }
                } else if (a == "X") {
                    if (a == b) {
                        randomNumber = variant[2]
                        return;
                    } else if (a == c) {
                        randomNumber = variant[1]
                        return;
                    }
                } else if (b == "X") {
                    if (b == c) {
                        randomNumber = variant[0]
                        return;
                    }
                }
            }

        })

        if (this.getCellValue(randomNumber) === "") {
            document.querySelector(`.cell[data-index="${randomNumber}"]`).innerHTML = "O";
            this.currentPlayer = "X"
            this.checkWinner();
            if (this.canClick) {
                cells.forEach(cell => {
                    cell.style.pointerEvents = "all";
                })
            }

            this.moveCount++
            return;
        } else {
            this.autoTurn();
        }

    }

    initGame = () => {
        this.currentPlayer = "X";
        this.canClick = true;
        cells.forEach(cell => {
            cell.innerHTML = "";
        })
        winner.innerHTML = "";
        winnerWrapper.classList.remove("show_winner")

        this.moveCount = 0;
        cells.forEach(cell => {
            cell.style.pointerEvents = "all";
        })
    }

    preventFromClicking = () => {
        cells.forEach(cell => {
            cell.style.pointerEvents = "none";
        })
    }

    checkWinner = () => {
        this.winningVariants.forEach(variant => {
            const a = this.getCellValue(variant[0]);
            const b = this.getCellValue(variant[1]);
            const c = this.getCellValue(variant[2]);

            if (a == "" || b == "" || c == "") {
                return;
            }

            if (a === b && b === c) {
                if (a === "X") {
                    this.setWinner(`The winner is: You!!!`);
                } else {

                    this.setWinner(`You have lost! Maybe try again?`);
                }
            }
        })
    }

    setWinner = (winnerPlayer) => {
        this.canClick = false;
        document.getElementById("winner").innerHTML = winnerPlayer;

        this.preventFromClicking();
        winnerWrapper.classList.add("show_winner")
    }

    getCellValue = (index) => {
        return document.querySelector(`.cell[data-index="${index}"]`).innerHTML;
    }
}

const app = new App();