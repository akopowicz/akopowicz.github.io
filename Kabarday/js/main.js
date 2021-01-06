let navItem = document.getElementsByClassName('navigation-item');
let navActive = document.querySelector('.visible');
let hamburger = document.querySelector('.hamburger');
let navbarMenu = document.querySelector('.navigation-menu');

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

let logo = document.querySelector('.logo');

const logoAnimation = () => {
    logo.classList.add('logo-animation');
    logo.classList.remove('logo-back');
}

const logoBack = () => {
    logo.classList.replace('logo-animation', 'logo-back');
}

logo.addEventListener('mouseover', logoAnimation);
logo.addEventListener('mouseleave', logoBack);

let aboutPhotos = document.querySelectorAll('.about-photo');

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

let sessionPhoto = document.querySelectorAll('.photo');

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


let photo = document.querySelectorAll('.img-portfolio');

let photoGallery = document.querySelector('.photo-gallery-overlay');
let photoGallery1 = document.querySelector('.big-gallery-photo-1 ');

let photoGallery2 = document.querySelector('.big-gallery-photo-2 ');
let photoGalleryBoth = document.querySelector('.big-gallery-photo');

let previousPhoto = document.querySelector('.left-gallery-arrow');
let nextPhoto = document.querySelector('.right-gallery-arrow');

let closeGallery = document.querySelector('.gallery-close');


let curentPhotoIndex;

const showGallery = (e) => {

    let photoGalleryVisible = document.querySelector('.big-gallery-photo-visible');

    photoGallery.classList.add('gallery-visible');
    photoGalleryVisible.src = e.target.src;
    curentPhotoIndex = parseInt(e.target.dataset.index);

    if (photo[curentPhotoIndex].src === photo[0].src) {
        previousPhoto.classList.add('invisible');
    }

    if (photo[curentPhotoIndex].src === photo[photo.length - 1].src) {
        nextPhoto.classList.add('invisible');
    }
}


const galleryClose = () => {
    photoGallery.classList.remove('gallery-visible');
}

closeGallery.addEventListener('click', galleryClose);


const showNextPhoto = (e) => {
   
    let invisiblePhoto = document.querySelector('.big-gallery-photo:not(.big-gallery-photo-visible)');

    invisiblePhoto.src = photo[curentPhotoIndex + 1].src;
    curentPhotoIndex = curentPhotoIndex + 1;
    
    photoGallery1.classList.toggle('big-gallery-photo-visible');
    photoGallery2.classList.toggle('big-gallery-photo-visible');

    if (curentPhotoIndex === photo.length - 1) {
        nextPhoto.classList.add('invisible')
    } else {
        previousPhoto.classList.remove('invisible');
    }

    if (curentPhotoIndex === 0) {
        previousPhoto.classList.add('invisible');
    } else {
        previousPhoto.classList.remove('invisible');
    }
}

nextPhoto.addEventListener('click', showNextPhoto);


const showPreviousPhoto = () => {
    let invisiblePhoto = document.querySelector('.big-gallery-photo:not(.big-gallery-photo-visible)');

    invisiblePhoto.src = photo[curentPhotoIndex - 1].src;
    curentPhotoIndex = curentPhotoIndex - 1;

    console.log(curentPhotoIndex);
    photoGallery1.classList.toggle('big-gallery-photo-visible');

    photoGallery2.classList.toggle('big-gallery-photo-visible');

    if (curentPhotoIndex === 0) {
        previousPhoto.classList.add('invisible');
    } else {
        previousPhoto.classList.remove('invisible');
    }

    if (curentPhotoIndex === photo.length - 1) {
        nextPhoto.classList.add('invisible');
    } else {
        nextPhoto.classList.remove('invisible');
    }
}

previousPhoto.addEventListener('click', showPreviousPhoto);


for (let i = 0; i < photo.length; i++) {
    photo[i].dataset.index = i;
    photo[i].addEventListener('click', showGallery);
}