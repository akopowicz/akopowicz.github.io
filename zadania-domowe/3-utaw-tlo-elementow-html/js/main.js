function setBackground() {
    let firstParagraph = document.querySelector('.first');
    let secondParagraph = document.querySelector('.second');

    firstParagraph.classList.add('bg-red');
    secondParagraph.classList.add('bg-yellow');
}

let button = document.querySelector('button');

button.addEventListener('click', setBackground);