let fashionSection = document.getElementById('fashion-section');
let header = document.querySelector('header');
let iconsFooterHolder = document.querySelector('.icons-footer-holder');
let email = document.querySelector('.email');
let octopus1 = document.querySelector('.octopus1');
let octopus2 = document.querySelector('.octopus2');
let drwingsSection = document.querySelector('#drwings');
let arrow = document.querySelector('.arrow');
let macramFashionSection = document.querySelector('.macrame');
let ethnicFashionSection = document.querySelector('.ethnic');
let macrameButton = document.querySelector('.macrame-button');
let ethnicButton = document.querySelector('.ethnic-button');
let drawings = document.querySelectorAll('.drawings');
let idx = 1;
let swipeNumber = 1000;
let swipeDoneInLastSeconds = true;

let hamburger = document.getElementById('hamburger');
let rightSide = document.querySelector('.right-side')
let showNav = true;
let showMacrame = true;
let ethnicMacrameButton = document.querySelector('.ethnic-macrame-button')
let showPhoto = document.querySelectorAll('.show-photo')
let inspirationHolderMacrame = document.getElementById('inspiration-holder-macrame');
let sketchesHolderMacrame = document.getElementById('sketches-holder-macrame')
let finalHolderMacrame = document.getElementById('final-holder-macrame');
let inspirationHolderEthnic = document.getElementById('inspiration-holder-ethic');
let sketchesHolderEthnic = document.getElementById('sketches-holder-ethic')
let finalHolderEthnic = document.getElementById('final-holder-ethic');


showPhoto.forEach(photo => {
  photo.addEventListener('click', (e) => {
    document.querySelector('.shown2').classList.remove('shown2');
    if (showMacrame) {
      inspirationHolderEthnic.style.display = "none";
      sketchesHolderEthnic.style.display = "none";
      finalHolderEthnic.style.display = "none";

      if (e.target.id == "macrame-inscription") {
        e.target.classList.add('shown2')
        inspirationHolderMacrame.style.display = "block";
        sketchesHolderMacrame.style.display = "none"
        finalHolderMacrame.style.display = "none"
      } else if (e.target.id == "macrame-sketches") {
        e.target.classList.add('shown2')
        inspirationHolderMacrame.style.display = "none"
        sketchesHolderMacrame.style.display = "block"
        finalHolderMacrame.style.display = "none"
      } else if (e.target.id = "macrame-final") {
        e.target.classList.add('shown2')
        inspirationHolderMacrame.style.display = "none"
        sketchesHolderMacrame.style.display = "none"
        finalHolderMacrame.style.display = "block"
      }
    } else {
      inspirationHolderMacrame.style.display = "none"
      sketchesHolderMacrame.style.display = "none"
      finalHolderMacrame.style.display = "none"

      if (e.target.id == "macrame-inscription") {
        e.target.classList.add('shown2')
        inspirationHolderEthnic.style.display = "block";
        sketchesHolderEthnic.style.display = "none"
        finalHolderEthnic.style.display = "none"
      } else if (e.target.id == "macrame-sketches") {
        e.target.classList.add('shown2')
        inspirationHolderEthnic.style.display = "none"
        sketchesHolderEthnic.style.display = "block"
        finalHolderEthnic.style.display = "none"
      } else if (e.target.id = "macrame-final") {
        e.target.classList.add('shown2')
        inspirationHolderEthnic.style.display = "none"
        sketchesHolderEthnic.style.display = "none"
        finalHolderEthnic.style.display = "block"
      }
    }
  })
})

hamburger.addEventListener('click', (e) => {
  e.stopPropagation()
  hamburger.style.display = "none";
  rightSide.classList.add('show')
  showNav = false;
})

document.body.addEventListener('click', () => {
  if (!showNav) {
    showNav = true;
    rightSide.classList.remove('show')
    hamburger.style.display = "block";
  }
})
if (document.body.id == "main-page") {
  let mc = new Hammer(document.querySelector('#drwings'));
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
  let macrameInscription = document.getElementById('macrame-inscription')
  ethnicButton.addEventListener('click', () => {
    ethnicMacrameButton.setAttribute('href', "ethnic.html");
    showMacrame = false;
    ethnicButton.classList.add("chosen");
    macrameButton.classList.remove('chosen');

    ethnicFashionSection.style.display = "flex";
    macramFashionSection.style.display = "none";
    inspirationHolderEthnic.style.display = "block";
    document.querySelector('.shown2').classList.remove('shown2');
    macrameInscription.classList.add('shown2');
  });

  macrameButton.addEventListener('click', () => {
    ethnicMacrameButton.setAttribute('href', "macrame.html");

    inspirationHolderMacrame.style.display = "block";

    document.querySelector('.shown2').classList.remove('shown2');
    macrameInscription.classList.add('shown2');
    showMacrame = true;
    ethnicButton.classList.remove("chosen");
    macrameButton.classList.add('chosen');

    ethnicFashionSection.style.display = "none";
    macramFashionSection.style.display = "flex";
  });
} else if (document.body.id == "ethnic-page" || document.body.id == "macrame-page") {
  let ethnicBig = document.querySelector('.ethnic-big');



  let ethnicInspirationsPhotosHolder = document.querySelector('.ethnic-inspirations-photos-holder')
  let ethnicPhoto = document.querySelectorAll('.ethnic-photo')
  ethnicInspirationsPhotosHolder.style.height = ethnicBig.clientHeight + 10 + "px"
  ethnicPhoto.forEach(photoE => {
    photoE.addEventListener('click', (e) => {
      e.stopPropagation();

      e.target.classList.add('hover-like')
    })

  })
  document.getElementById('inspirations').addEventListener('click', () => {
    document.querySelector('.hover-like').classList.remove('hover-like')
  })




  let textileBig = document.querySelector('.textile-big')

  let ethnicTextilesPhotosHolder = document.querySelector('.ethnic-textiles-photos-holder')
  let textilePhoto = document.querySelectorAll('.textile-photo')
  ethnicTextilesPhotosHolder.style.height = textileBig.clientHeight + 10 + "px"
  textilePhoto.forEach(photoT => {
    photoT.addEventListener('click', (e) => {
      e.stopPropagation();
      e.target.classList.add('hover-like')
    })

  })
  document.getElementById('textiles').addEventListener('click', () => {
    document.querySelector('.hover-like').classList.remove('hover-like')
  })
} 

if (document.body.id == "macrame-page") {
  let macrameBig = document.querySelector('.macrame-sketches-big');


  let macrameInspirationsPhotosHolder = document.querySelector('.macrame-inspirations-photos-holder')
  let macramePhoto = document.querySelectorAll('.macrame-photo')
  macrameInspirationsPhotosHolder.style.height = macrameBig.clientHeight + 10 + "px"
  macramePhoto.forEach(photoE => {
    photoE.addEventListener('click', (e) => {
      e.stopPropagation();

      e.target.classList.add('hover-like')
    })

  })

  document.getElementById('macrame-sketches-holder').addEventListener('click', () => {
    document.querySelector('.hover-like').classList.remove('hover-like')
  })





}


window.onload = () => {
  iconsFooterHolder.style.width = email.offsetWidth + "px";

  if (document.body.id == "ethnic-page" || document.body.id == "macrame-page") {
    let ethnicBig = document.querySelector('.ethnic-big');
  
    let ethnicInspirationsPhotosHolder = document.querySelector('.ethnic-inspirations-photos-holder')

    ethnicInspirationsPhotosHolder.style.height = ethnicBig.clientHeight + 10 + "px"
    
  
    let textileBig = document.querySelector('.textile-big')
  
    let ethnicTextilesPhotosHolder = document.querySelector('.ethnic-textiles-photos-holder')
    ethnicTextilesPhotosHolder.style.height = textileBig.clientHeight + 10 + "px"
   
   
  } 

  if (document.body.id == "macrame-page") {
    let macrameBig = document.querySelector('.macrame-sketches-big');
  
  
    let macrameInspirationsPhotosHolder = document.querySelector('.macrame-inspirations-photos-holder')

    macrameInspirationsPhotosHolder.style.height = macrameBig.clientHeight + 10 + "px"
  }
}