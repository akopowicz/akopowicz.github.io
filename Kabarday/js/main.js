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


let photosOfPortfolio = document.querySelectorAll('.img-portfolio');
console.log(photosOfPortfolio)

let photoGaleryOverlay = document.querySelector('.photo-gallery-overlay');
let bigGalleryPhoto = document.querySelector('.big-gallery-photo');




let galleryClose = document.querySelector('.gallery-close');
console.log(galleryClose)

const hidePhotoGallery = () => {
    console.log('klik na zdjęcia działa!')
    photoGaleryOverlay.classList.remove('gallery-visible')
}

galleryClose.addEventListener('click', hidePhotoGallery);


for (let i = 0; i< photosOfPortfolio.length; i++) {

    let leftGalleryArrow = document.querySelector('.left-gallery-arrow');

let rightGalleryArrow = document.querySelector('.right-gallery-arrow');

console.log(rightGalleryArrow);

    const showPhotoGallery = () => {
        console.log('klik na zdjęcia działa!')
        photoGaleryOverlay.classList.add('gallery-visible')
        bigGalleryPhoto.src = photosOfPortfolio[i].src;

        
        const previousPhoto = () => {
            bigGalleryPhoto.src = photosOfPortfolio[i--].src;
        }
    
        console.log(leftGalleryArrow)
    
        leftGalleryArrow.addEventListener('click', previousPhoto);

        const nextPhoto = () => {
            bigGalleryPhoto.src = photosOfPortfolio[i++].src;
        }
    
        console.log(leftGalleryArrow)
    
        rightGalleryArrow.addEventListener('click', nextPhoto);
    
       
        
    }

    photosOfPortfolio[i].addEventListener('click', showPhotoGallery);

 
}

