let colorsRus = ["красный", "синий", "Зелёный", "Белый", "Жёлтый", "Оранжевый", "Серый", "Розовый", "Коричневый", "Фиолетовый", "Чёрный"]
let colorsEngRus = ["red", "blue", "green", "white", "yellow", "orange", "grey", "pink", "brown", "purple", "black"]
let colors = ["red", "blue", "green", "white", "yellow", "orange", "grey", "pink", "brown", "purple", "black"]
let score = 0
let circles = document.querySelectorAll(".circle");
let colorName = document.querySelector('.color-name');
let information = document.querySelector('.information');
let again = document.querySelector('.again');
let showScore = document.querySelector('.score')
let clicked = 0;
let leftTurns = document.querySelector('.left-turns')
let h1 = document.querySelector("h1")
let end = false
let playAgain = document.querySelector(".play-again")



const colorLottery = () => {
    playAgain.style.display = "none"
    leftTurns.innerText = clicked + 1 + "/10"

    let randomRus = Math.floor(Math.random() * colorsRus.length);
    let randomColor1 = Math.floor(Math.random() * colors.length);

    let randomColor2 = Math.floor(Math.random() * colors.length);
    again.style.display = "none"

    let randomCircle = Math.floor(Math.random() * circles.length)


    colorName.innerText = ''
    colorName.id = ''
    circles[0].id = ""
    circles[1].id = ""
    circles[2].id = ""
    circles[0].className = "circle left-circle"
    circles[1].className = "circle middle-circle"
    circles[2].className = "circle right-circle"



    if (randomRus === randomColor1 || randomRus === randomColor2) {
        if (randomRus < colorsRus.length - 1) {
            if ((randomRus + 1 == randomColor2 && randomRus > 0) || (randomRus + 1 == randomColor1 && randomRus > 0)) {
                randomRus--;
            } else if ((randomRus + 1 == randomColor2 && randomRus == 0) || (randomRus + 1 == randomColor1 && randomRus == 0)) {
                randomRus = colorsRus.length - 1
            } else {
                randomRus++
            }
        } else if (randomRus - 1 == randomColor2 || randomRus - 1 == randomColor1) {
            randomRus -= 2
        } else {
            randomRus--
        }
    }


    if (randomColor2 === randomColor1) {
        if (randomColor2 < colorsRus.length - 1) {
            if (randomColor2 + 1 == randomRus && randomColor2 > 0) {
                randomColor2--;
            } else if (randomColor2 + 1 == randomRus && randomColor2 == 0) {
                randomColor2 = colorsRus.length - 1
            } else {
                randomColor2++
            }
        } else if (randomColor2 - 1 == randomRus) {
            randomColor2 -= 2
        } else {
            randomColor2--
        }
    }

    circles[randomCircle].classList.add(colors[randomRus])
    circles[randomCircle].id = colors[randomRus]
    if (randomCircle == 0) {
        circles[1].classList.add(colors[randomColor1])
        circles[2].classList.add(colors[randomColor2])
    } else if (randomCircle == 1) {
        circles[0].classList.add(colors[randomColor1])
        circles[2].classList.add(colors[randomColor2])
    } else {
        circles[0].classList.add(colors[randomColor1])
        circles[1].classList.add(colors[randomColor2])
    }

    colorName.innerText = colorsRus[randomRus]
    colorName.id = colors[randomRus]

}

circles.forEach((e) => {
    e.addEventListener('click', (el) => {



        if (el.target.id == colorName.id) {


            if (clicked == 9) {
                setTimeout(() => {
                    showScore.innerText = "Twój wynik to: " + score + " na 10";
                    showScore.style.display = "block"
                    setTimeout(() => {
                        showScore.style.opacity = 1
                    }, 10)

                    circles.forEach(e => {
                        e.style.display = "none"
                    })
                    again.style.display = "none"
                    leftTurns.style.display = "none"
                    colorName.style.display = "none"
                    h1.style.display = "none"
                    end = true
                    playAgain.style.display = "block"
                }, 1000)
            }


            ('brawo')
            score++
            information.innerText = "Brawo!"
            information.style.display = "block"
            setTimeout(() => {
                information.style.opacity = 1
            }, 10)

            setTimeout(() => {
                information.style.opacity = 0
            }, 1500)

            setTimeout(() => {
                information.style.display = "none"
                if (!end) {
                    again.style.display = "block"
                }

            }, 1700)
        } else {
            ('spróbuj ponownie')
            score--
            information.innerText = "Nieee! Spróbuj jeszcze raz"
            information.style.display = "block"

            setTimeout(() => {
                information.style.opacity = 1
            }, 10)

            setTimeout(() => {
                information.style.opacity = 0
            }, 1500)

            setTimeout(() => {
                information.style.display = "none"
            }, 1700)
        }
    })

})

again.addEventListener('click', () => {
    clicked++

    colorLottery()

})

playAgain.addEventListener('click', () => {
    showScore.innerText = "";
    clicked = 0;
    score = 0;
    showScore.style.opacity = 0;

    setTimeout(() => {
        showScore.style.display = "none";
    }, 10)

    circles.forEach(e => {
        e.style.display = "block"
    })
    again.style.display = "block"
    leftTurns.style.display = "block"
    colorName.style.display = "block"
    h1.style.display = "block"
    end = false
    playAgain.style.display = "block"

    colorLottery()
})

colorLottery()
