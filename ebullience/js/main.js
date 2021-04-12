let navList = document.querySelector(".nav-list");
let nav = document.querySelector('nav');
var hamburger = document.querySelector('.hamburger');
let show = false;
let footer = document.querySelector('footer');
let mainImage = document.querySelector('.main-img');
let inscription = document.querySelector('.inscription');
let contactInformations = document.querySelector('.contact-informations')
let form = document.querySelector('form');

if (document.body.id == "home") {

    setTimeout(() => {
        if (window.innerWidth > 1000) {
            mainImage.src = "img/pexels-harsch-shivam-20076474.png";
            inscription.style.left = navList.offsetLeft + 20 + "px";
        }
    }, 10);


    let header = document.querySelector('header');
    setTimeout(() => {
        header.classList.add('header-animation');
    }, 500);
}
if (window.innerWidth > 1000) {
    if (document.body.id == "help") {
        form.style.left = navList.offsetLeft + 20 + "px";
    }

    if (document.body.id == "contact") {
        contactInformations.style.left = navList.offsetLeft + 20 + "px";
    }
}



hamburger.addEventListener('click', () => {
    if (!show) {
        navList.style.display = "block";
        document.body.style.overflow = "hidden";
        footer.style.position = "absolute";
        footer.style.bottom = 0;
        footer.style.zIndex = 20;
        show = true;
        navList.style.height = window.innerHeight - nav.clientHeight + "px";

    } else {
        show = false;
        navList.style.display = "none";
        document.body.style.overflow = "auto";
        footer.style.position = "relative";
        footer.style.bottom = 0;
        footer.style.zIndex = 20;
    }
})