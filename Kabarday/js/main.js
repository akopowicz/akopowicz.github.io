let navItem = document.getElementsByClassName('navigation-item');
let navActive = document.querySelector('.visible');
let hamburger = document.querySelector('.hamburger');
let navbarMenu = document.querySelector('.navigation-menu');
let photo = document.querySelectorAll('.img-portfolio');
let photoGallery = document.querySelector('.photo-gallery-overlay');
let photoGallery1 = document.querySelector('.big-gallery-photo-1 ');
let photoGallery2 = document.querySelector('.big-gallery-photo-2 ');
let previousPhoto = document.querySelector('.left-gallery-arrow');
let nextPhoto = document.querySelector('.right-gallery-arrow');
let closeGallery = document.querySelector('.gallery-close');
let currentPhotoIndex;
let logo = document.querySelector('.logo');
let aboutPhotos = document.querySelectorAll('.about-photo');
let sessionPhoto = document.querySelectorAll('.photo');
const menuItem = () => {
    navbarMenu.classList.toggle('show-menu');
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

const logoAnimation = () => {
    logo.classList.add('logo-animation');
    logo.classList.remove('logo-back');
}

const logoBack = () => {
    logo.classList.replace('logo-animation', 'logo-back');
}

logo.addEventListener('mouseover', logoAnimation);
logo.addEventListener('mouseleave', logoBack);


for (let i = 0; i < aboutPhotos.length; i++) {
    let photographer = document.querySelectorAll('.photographer');

    const showName = () => {
        photographer[i].classList.add('photographer-visible');
    }

    const hideName = () => {
        photographer[i].classList.remove('photographer-visible');
    }

    aboutPhotos[i].addEventListener('mouseover', showName);
    aboutPhotos[i].addEventListener('mouseleave', hideName);
}

for (let i = 0; i < sessionPhoto.length; i++) {
    const photoBigger = () => {
        sessionPhoto[i].classList.add('photo-bigger');
    }

    const photoSmaller = () => {
        sessionPhoto[i].classList.remove('photo-bigger');
    }

    sessionPhoto[i].addEventListener('mouseover', photoBigger);
    sessionPhoto[i].addEventListener('mouseout', photoSmaller);
}

const showGallery = (e) => {
    let photoGalleryVisible = document.querySelector('.big-gallery-photo-visible');

    photoGallery.classList.add('gallery-visible');
    photoGalleryVisible.src = e.target.src;
    currentPhotoIndex = parseInt(e.target.dataset.index);

    if (photo[currentPhotoIndex].src === photo[0].src) {
        previousPhoto.classList.add('invisible');
    }

    if (photo[currentPhotoIndex].src === photo[photo.length - 1].src) {
        nextPhoto.classList.add('invisible');
    }
}

const galleryClose = () => {
    photoGallery.classList.remove('gallery-visible');
}
const showNextPhoto = (e) => {
   
    let invisiblePhoto = document.querySelector('.big-gallery-photo:not(.big-gallery-photo-visible)');

    invisiblePhoto.src = photo[currentPhotoIndex + 1].src;
    currentPhotoIndex = currentPhotoIndex + 1;
    
    photoGallery1.classList.toggle('big-gallery-photo-visible');
    photoGallery2.classList.toggle('big-gallery-photo-visible');

    if (currentPhotoIndex === photo.length - 1) {
        nextPhoto.classList.add('invisible')
    } else {
        previousPhoto.classList.remove('invisible');
    }

    if (currentPhotoIndex === 0) {
        previousPhoto.classList.add('invisible');
    } else {
        previousPhoto.classList.remove('invisible');
    }
}
const showPreviousPhoto = () => {
    let invisiblePhoto = document.querySelector('.big-gallery-photo:not(.big-gallery-photo-visible)');

    invisiblePhoto.src = photo[currentPhotoIndex - 1].src;
    currentPhotoIndex = currentPhotoIndex - 1;

    photoGallery1.classList.toggle('big-gallery-photo-visible');

    photoGallery2.classList.toggle('big-gallery-photo-visible');

    if (currentPhotoIndex === 0) {
        previousPhoto.classList.add('invisible');
    } else {
        previousPhoto.classList.remove('invisible');
    }

    if (currentPhotoIndex === photo.length - 1) {
        nextPhoto.classList.add('invisible');
    } else {
        nextPhoto.classList.remove('invisible');
    }
}

for (let i = 0; i < photo.length; i++) {
    photo[i].dataset.index = i;
    photo[i].addEventListener('click', showGallery);
}

if (document.body.classList.contains("collection")) {
    closeGallery.addEventListener('click', galleryClose);
    previousPhoto.addEventListener('click', showPreviousPhoto);
    nextPhoto.addEventListener('click', showNextPhoto);
}