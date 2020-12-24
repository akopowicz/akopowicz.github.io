let navItem = document.getElementsByClassName('navigation-item');

let navActive = document.querySelector('.visible');

let hamburger = document.querySelector('.hamburger');

let navbarMenu = document.querySelector('.navigation-menu');

const menuItem = () => {
    navbarMenu.classList.toggle('show-menu');
    console.log('działa');
}

hamburger.addEventListener('click', menuItem);

for (let i = 0; i < navItem.length; i++) {

    const notActive = () => {
        navActive.classList.remove('visible');
    }

    const active = () => {
        navActive.classList.add('visible');
    }

    navItem[i].addEventListener('mouseover', notActive);

    navItem[i].addEventListener('mouseout', active);
}

// let photo = document.querySelectorAll('.a');
// console.log(photo);

let sessionPhotoOverlay = document.querySelectorAll('.session-photo-overlay');
console.log(sessionPhotoOverlay)


for (let i = 0; i < sessionPhotoOverlay.length; i++) {

    let photo = document.querySelectorAll('.photo');
    
    const bigger = () => {
        photo[i].classList.add('photo-bigger');
    }

    const smaller = () => {
        photo[i].classList.remove('photo-bigger');
    }

    sessionPhotoOverlay[i].addEventListener('mouseover', bigger);
    sessionPhotoOverlay[i].addEventListener('mouseout', smaller);
   
}



let logo = document.querySelector('.logo');

const logoLeft = () => {
    logo.classList.add('logo-back');
    console.log('działam!');
}

const logoLeftRemove = () => {
    logo.classList.remove('logo-back');
}

logo.addEventListener('mouseout', logoLeft);
logo.addEventListener('mouseover', logoLeftRemove);




