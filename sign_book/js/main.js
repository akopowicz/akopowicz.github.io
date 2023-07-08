let navigation_items = document.querySelector(".navigation_items");
let hamburger = document.querySelector(".hamburger");
let images = document.querySelectorAll('.image');
let imagesCount = 1;
let showBigImage = document.querySelector('.show_big_image');
let showBig = document.querySelector('.show_big');
let arrowLeft = document.querySelector('.arrow_left');
let arrowRight = document.querySelector('.arrow_right');
let closeButton = document.querySelector('.close');
let showGallery = false;

hamburger.addEventListener("click", () => {
    navigation_items.classList.toggle("show");
});

navigation_items.addEventListener("click", () => {
    navigation_items.classList.remove("show");
});

images.forEach(image => {
    image.addEventListener("click", (e) => {
        showBig.classList.add('show_big_show');
        imagesCount = parseInt(e.target.dataset.number);
        showImage(imagesCount);
        showGallery = true;
    });
});

const showImage = (imagesCount) => {
    checkImageNumber(imagesCount);
    showBigImage.src = `img/${imagesCount}.webp`;
};

const checkImageNumber = (number) => {
    arrowLeft.classList.remove('hide_arrow');
    arrowRight.classList.remove('hide_arrow');

    if (number === 1) {
        arrowLeft.classList.add('hide_arrow');
    } else if (number === images.length) {
        arrowRight.classList.add('hide_arrow');
    };
};

closeButton.addEventListener('click', () => {
    showBig.classList.remove('show_big_show');
    showGallery = false;
});

arrowLeft.addEventListener('click', () => {
    imagesCount -= 1;
    showImage(imagesCount);
});

arrowRight.addEventListener('click', () => {
    imagesCount += 1;
    showImage(imagesCount);
});

document.addEventListener("keydown", (e)=>{
    if (showGallery === true) {
        if(e.key === "ArrowRight" && imagesCount < images.length) {
            imagesCount += 1;
            showImage(imagesCount);
        } else if (e.key === "ArrowLeft" && imagesCount > 1) {
            imagesCount -= 1;
            showImage(imagesCount);
        };
    };
});








































