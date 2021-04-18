let navList = document.querySelector(".nav-list");
let nav = document.querySelector('nav');
var hamburger = document.querySelector('.hamburger');
let show = false;
let footer = document.querySelector('footer');
let mainImage = document.querySelector('.main-img');
let homeInformation = document.querySelector('.home-information');
let contactInformations = document.querySelector('.contact-informations')
let form = document.querySelector('form');

if (document.body.id == "home") {

    window.onload = () => {
        if (window.innerWidth > 1000) {
            mainImage.src = "img/pexels-harsch-shivam-20076474.png";
            homeInformation.style.left = navList.offsetLeft + 20 + "px";
            footer.style.opacity = 1
        }
    }

    let header = document.querySelector('header');
    setTimeout(() => {
        header.classList.add('header-animation');
    }, 500);
}

if (document.body.id == "about") {
    let inscriptionAbout = document.querySelector('.about-information')
    let aboutHeader = document.querySelector('.about-header')
    window.onload = () => {
        if (window.innerWidth > 700) {
            mainImage.src = "img/pexels-wangming_photo-3549414.png";
            footer.style.opacity = 1
        }

        if (inscriptionAbout.clientHeight > mainImage.clientHeight) {
            inscriptionAbout.style.overflow = "auto"
        }
    }
}

if (document.body.id == "help") {
    let button = document.querySelector('.button');
    let agreement = document.getElementById('agreement');
    let pleaseInscription = document.querySelector('.please-accept')
    window.onload = () => {
        footer.style.opacity = 1
    }
    if (window.innerWidth > 1000) {
        form.style.left = navList.offsetLeft + 20 + "px";
    }
    button.addEventListener('click', (e) => {
        if (!agreement.checked) {
            e.preventDefault();
            pleaseInscription.style.opacity = 1
        } else {
            pleaseInscription.innerText = "Successfully sent"
        }
    })
}

if (window.innerWidth > 1000) {

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