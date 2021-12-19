let weapons = document.querySelectorAll('.weapon');
let instruction = document.querySelector('p');
let button = document.querySelector('.play-button');
let randomNumber;
let weapon = document.querySelector('.js-weapon');
let weaponImage = document.querySelector('.js-weapon-image');
let scoreHolder = document.querySelector('.score');
let score = 0;

let weaponsComputer = ["paper", "rock", "scissors"];
let clickedElement = [];
weapons.forEach((element) => {
    element.addEventListener('click', () => {
        clickedElement = [];
        weapon.id = ""
        clickedElement.push(element.id);
        functionChecking();
        instruction.innerText = `You say ${clickedElement[0]}? Great chose!`;
        setTimeout(() => {
            weapon.style.opacity = "1";

            if (clickedElement[0] == weapon.id) {
                instruction.innerText = "It's Tie!";
                button.style.backgroundColor = "cadetblue";
                scoreHolder.innerText = `Score: ${score}`;
            } else if (clickedElement[0] == "rock" && weapon.id == "scissors" || clickedElement[0] == "paper" && weapon.id == "rock" || clickedElement[0] == "scissors" && weapon.id == "paper") {
                instruction.innerText = "You win! Congratulations!";
                button.style.backgroundColor = "rgb(72, 141, 98)";
                score++
                scoreHolder.innerText = `Score: ${score}`;
            } else {
                instruction.innerText = "But his was better! You lost";
                button.style.backgroundColor = "rgb(196, 13, 83)";
                score--
                scoreHolder.innerText = `Score: ${score}`;
            }

            if (score >= 0) {
                scoreHolder.style.color = "rgb(16, 78, 102)";
            } else {
                scoreHolder.style.color = "rgb(196, 13, 83)";
            }

            setTimeout(() => {
                instruction.innerText = `Let's play again! Choose weapon`;
                button.style.backgroundColor = "cadetblue";
                weapon.style.opacity = "0";
            }, 3000);
        }, 1000);
    })
})

const functionChecking = () => {
    randomNumber = Math.floor(Math.random() * 3);
    weapon.id = weaponsComputer[randomNumber];
    weaponImage.src = `img/${weaponsComputer[randomNumber]}.svg`;
    console.log(clickedElement[0] == rock);
}