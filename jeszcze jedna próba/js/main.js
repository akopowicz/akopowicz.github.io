// let mainContainer = document.querySelector('.content-container');
// const appHeight = () => {
//     const doc = document.documentElement
   
//     mainContainer.style.height = window.innerHeight + 'px'
    
// }
// console.log(mainContainer)
// window.addEventListener('resize', appHeight)
// appHeight()


let chair = document.querySelectorAll('.chair');
let mainImage = document.querySelector('.main-image')


let i = 0;

chair[0].classList.toggle('big');

const resizeChairs = () => {
    chair[i % chair.length].classList.toggle("big");
    chair[(i + 1) % chair.length].classList.toggle("big");

    i++;
}

let startInterval = setInterval(resizeChairs, 1000);

const moveChair = (e) => {
    let touchLocation = e.targetTouches[0];
    e.target.style = 'position: absolute';
    e.target.style.left = touchLocation.pageX + 'px'
    e.target.style.top = touchLocation.pageY + 'px'
    

    if (e.target.dataset.index == 0) {
        e.target.src = 'img/krzeslo_blue_shine.png'
    } else if (e.target.dataset.index == 1) {
        e.target.src = 'img/krzeslo_green_shine.png'
    } else if (e.target.dataset.index == 2) {
        e.target.src = 'img/krzeslo_red_shine.png'
    } else if (e.target.dataset.index == 3) {
        e.target.src = 'img/krzeslo_blue2_shine.png'
    }

    clearInterval(startInterval)
    e.target.style.transform = 'scale(1.5)'

    e.target.classList.add('visible-one')
    let invisibleChairs = document.querySelectorAll('.chair:not(.visible-one)')
   

    for (let i = 0; i<invisibleChairs.length; i++) {
        // invisibleChairs[i].classList.add('hide')
        invisibleChairs[i].classList.remove('big')
       

    }

    console.log(e.target.offsetTop)
}

const endMove = (e) => {
    let x = parseInt(e.target.style.left)
    let y = parseInt(e.target.style.top)
    let mainImageX = parseInt(mainImage.offsetLeft);
    let mainImageY = parseInt(mainImage.offsetTop);

    let mainImageRight = mainImageX + parseInt(mainImage.offsetWidth)
    let mainImageBottom = mainImageY + parseInt(mainImage.offsetHeight)
  
   
    
    




    if (x >= mainImageX && x <= mainImageRight && y >= mainImageY && y <= mainImageBottom) {
        console.log('działa')
        let copy2 = document.querySelector('.copy-2')
        copy2.classList.add('invisible')
        let copy3 = document.querySelector('.copy-3')
        copy3.classList.add('visible')

        let copy4 = document.querySelector('.copy-4')
        copy4.classList.add('visible')
        let slide1 = document.querySelector('.slide-1')
        let slide2 = document.querySelector('.slide-2')
        slide1.classList.add('slide-move')
        slide2.classList.add('slide-move')

        let slide2Text = document.querySelector('.slide-2-text');
        slide2Text.classList.add('animation-begin')

        let button = document.querySelector('.button')
        button.classList.add('animation')

        e.target.classList.add('visible-one')
        let invisibleChairs = document.querySelectorAll('.chair:not(.visible-one)')
        console.log(invisibleChairs)
      

        for (let i = 0; i<invisibleChairs.length; i++) {
            invisibleChairs[i].classList.add('invisible')
           

        }
        

        // let part1 = document.querySelector('.instruction');
        // part1.classList.add('hide')
        // e.target.classList.add('chair-visible')
        // console.log(e.target.style)
        // let greatWork = document.querySelector('.great-work');
        // greatWork.classList.add('visible')
        // console.log(greatWork)
        // let beggining = document.querySelector('.beggining');
        // beggining.classList.add('visible')
        

        // let firstSlide = document.querySelector('.first-slide');
        // firstSlide.classList.add('move')

        // let secondSlide = document.querySelector('.second-slide')
        // secondSlide.classList.add('move')

        // e.target.classList.add('visible-one')
        // let invisibleChairs = document.querySelectorAll('.chair:not(.visible-one)')
        // console.log(invisibleChairs)

        // for (let i = 0; i<invisibleChairs.length; i++) {
        //     invisibleChairs[i].classList.add('hide')
           

        // }
    }

    
    console.log(y)
}

const touchStart = (e) => {
    e.preventDefault()
}

for (let i = 0; i < chair.length; i++) {
   
    chair[i].dataset.index = i;
    chair[i].addEventListener('touchstart', touchStart)
    chair[i].addEventListener('touchmove', moveChair)
    chair[i].addEventListener('touchend', endMove)
}
console.log(chair)

