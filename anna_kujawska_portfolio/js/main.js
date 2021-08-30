let fashionSection = document.getElementById('fashion-section');
let header = document.querySelector('header');
let iconsFooterHolder = document.querySelector('.icons-footer-holder');
let email = document.querySelector('.email');
var octopus1 = document.querySelector('.octopus1');
var octopus2 = document.querySelector('.octopus2');
var drwingsSection = document.querySelector('#drwings');
let arrow = document.querySelector('.arrow');
let macramFashionSection = document.querySelector('.macrame');
let ethnicFashionSection = document.querySelector('.ethnic');
let macrameButton = document.querySelector('.macrame-button');
let ethnicButton = document.querySelector('.ethnic-button');
var drawings = document.querySelectorAll('.drawings');
var idx = 1;
var swipeNumber = 1000;
var swipeDoneInLastSeconds = true;
var mc = new Hammer(document.querySelector('#drwings'));

mc.on('swipeleft', function () {

  swipeNumber--;
  setTimeout(() => {
    swipeDoneInLastSeconds = false;
  }, 4000);
  swipeDoneInLastSeconds = true;

  swipeFunction();
})
mc.on('swiperight', function () {
  swipeNumber++;
  setTimeout(() => {
    swipeDoneInLastSeconds = false;
  }, 4000);
  swipeDoneInLastSeconds = true;

  swipeFunction();
})

var swipeWhole;

function handleHammer(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      swipeWhole = setInterval(() => {
        if (swipeDoneInLastSeconds) {
          swipeNumber++;
          swipeFunction();
        }
      }, 5000);

    } else {
      clearInterval(swipeWhole);
    };
  });
};


const observerHammer = new IntersectionObserver(handleHammer, { rootMargin: "0px 0px 0px 0px" });

observerHammer.observe(drwingsSection);


function swipeFunction() {
  document.querySelectorAll(".drawings").forEach((el, index) => {
    el.className = "";
    el.classList.add("drawings");
  })

  document.querySelectorAll(".drawings")[(swipeNumber) % 5].classList.add("drawing3");

  document.querySelectorAll(".drawings")[(swipeNumber + 1) % 5].classList.add("drawing4");

  document.querySelectorAll(".drawings")[(swipeNumber + 2) % 5].classList.add("drawing5");

  document.querySelectorAll(".drawings")[(swipeNumber + 3) % 5].classList.add("drawing1");
  document.querySelectorAll(".drawings")[(swipeNumber + 4) % 5].classList.add("drawing2");
};

function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      octopus1.classList.add("octopus1-animation");
      octopus2.classList.add("octopus2-animation");
      arrow.classList.add("arrow-animation");
    } else {
      octopus1.classList.remove("octopus1-animation");
      octopus2.classList.remove("octopus2-animation");
      arrow.classList.remove("arrow-animation");
    }
  });
}


const observer = new IntersectionObserver(handleIntersection, { rootMargin: "0px 0px 0px 0px" });

observer.observe(header);

ethnicButton.addEventListener('click', () => {
  ethnicButton.classList.add("chosen");
  macrameButton.classList.remove('chosen');

  ethnicFashionSection.style.display = "flex";
  macramFashionSection.style.display = "none";
});

macrameButton.addEventListener('click', () => {
  ethnicButton.classList.remove("chosen");
  macrameButton.classList.add('chosen');

  ethnicFashionSection.style.display = "none";
  macramFashionSection.style.display = "flex";
});

window.onload = () => {
  iconsFooterHolder.style.width = email.offsetWidth + "px";
}