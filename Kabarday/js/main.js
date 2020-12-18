let navItem = document.getElementsByClassName('navigation-item');

let navActive = document.querySelector('.visible');

let hamburger = document.querySelector('.hamburger');
console.log(hamburger)

let navbarMenu = document.querySelector('.navbar-menu');
console.log(navbarMenu)

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




