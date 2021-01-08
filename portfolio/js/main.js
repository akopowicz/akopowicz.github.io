window.addEventListener('load', function () {
    let mainContent = document.getElementById('main-content');
    let preloader = document.getElementById('preloader');

    preloader.classList.add('hidden');
    mainContent.classList.remove('hidden-content');
});

let menuButton = document.querySelector('.menu-button');
console.log(menuButton)

let circle = document.querySelectorAll('.circle');
let navMenu = document.querySelector('.nav-menu');

const showMenuItems = () => {
    for (let i=0; i<circle.length; i++) {
        circle[i].classList.toggle('visible-menu-item')
        navMenu.classList.toggle('nav-visible')
    }
}

menuButton.addEventListener('click', showMenuItems)

let h1Tag = document.querySelector('.h1-tag');
h1Tag.innerText = "<h1>"

let h1CloseTag = document.querySelector('.h1-close-tag');
h1CloseTag.innerText = "</h1>"

let h2Tag = document.querySelector('.h2-tag');
h2Tag.innerText = "<h2>"

let h2CloseTag = document.querySelector('.h2-close-tag');
h2CloseTag.innerText = "</h2>"