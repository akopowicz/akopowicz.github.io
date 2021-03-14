window.addEventListener('load', function () {
    let mainContent = document.getElementById('main-content');
    let preloader = document.getElementById('preloader');
    let load = document.getElementById('loading');

    preloader.classList.add('hidden');
    mainContent.classList.remove('hidden-content');
    load.classList.remove('start-spinning');
});

const aboutSection = document.getElementById('about');

const home = document.getElementById('home');

let animationWord1 = document.querySelector('.word-1');
let animationWord2 = document.querySelector('.word-2');
let seeMore = document.querySelector('.fa-angle-double-down');

let mainInput = document.querySelector('.your-name');

let btnReady = document.querySelector('.ready');

let guest = document.querySelector('.guest-name');
let niceToSeeYou = document.querySelector('.nice-to-see-you ');
console.log(animationWord1)

let menu = document.getElementById('menu-button');

let aboutMeHeader = document.querySelector('.about-me-header')
let photoAuthor = document.querySelector('.photo-and-author');
let me = document.querySelector('.me');
let aboutMeText = document.querySelector('.about-me-text')
let skillsButton = document.querySelector('.skills');
let skillsContainer = document.querySelector('.skills-container')

let skillsItems = document.querySelectorAll('.skills-item')

let aboutMeAnimation = document.querySelector('.about-me-animation')
console.log(skillsItems)

let projects = document.querySelector('.projects')


/* Skills show function */

const hideItem = (e) => {
    e.stopPropagation();
    console.log('stop')
    e.target.classList.add('hide-skill')
}

for (let i = 0; i < skillsItems.length; i++) {
    skillsItems[i].addEventListener('click', hideItem)
   
    // console.log(skillsItem[i])
}

const showSkills = (e) => {
    e.stopPropagation()
    skillsContainer.classList.add('show-container')
    console.log('skills')

    for (let i = 0; i< skillsItems.length; i++) {
        console.log(skillsItems)
        skillsItems[i].classList.add('skills-animation')
        skillsItems[i].classList.remove('hide-skill')
        
    }
}


skillsButton.addEventListener('click', showSkills)

const hideSkills = () => {
    skillsContainer.classList.remove('show-container')
    for (let i = 0; i < skillsItems.length; i++) {
        skillsItems[i].classList.remove('skills-animation')
        // skillsItems[i].classList.remove('hide-skill')
    }
}

about.addEventListener('click', hideSkills)


const showMenu = () => {
    let menuItems = document.getElementById('nav-menu')
    menuItems.classList.toggle('show-menu')
    console.log(menuItems)
}


menu.addEventListener('click', showMenu)

// console.log(backgroundAnimation)
function handleIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            console.log('działam')
            animationWord1.classList.add('start-animation')
            animationWord2.classList.add('start-animation')
            seeMore.classList.add('icon-animation');
        } else {
            animationWord1.classList.remove('start-animation')
            animationWord2.classList.remove('start-animation')
            console.log('ja też dziłam')
            seeMore.classList.remove('icon-animation');
        }
    });
}

const observer = new IntersectionObserver(handleIntersection);



function animateIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            console.log('działamja animate')
            aboutMeHeader.classList.add('show-animation')
            photoAuthor.classList.add('photo-and-author-animation')
            aboutMeText.classList.add('show-text')
            aboutMeAnimation.classList.add('about-me-animation-animation')

        } else {

            console.log('ja też dziłam animate')
            aboutMeHeader.classList.remove('show-animation')
            photoAuthor.classList.remove('photo-and-author-animation')
            aboutMeAnimation.classList.remove('about-me-animation-animation')
        }
    });
}

const sectionAnimation = new IntersectionObserver(animateIntersection, { rootMargin: "0px 0px -200px 0px" });


observer.observe(home);
console.log(home)

sectionAnimation.observe(aboutSection);

const putValue = () => {
    guest.innerText = mainInput.value;
    niceToSeeYou.classList.add('visible')
    let byeBye = document.querySelector('.guest-bye-bye');
    // byeBye.innerText = mainInput.value + ', d'
    // let name = document.getElementById('name');
    // name.value = mainInput.value
}

btnReady.addEventListener('click', putValue)








let projectItem = document.querySelectorAll('.project-item')

function projectsIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            for (let i = 0; i<projectItem.length; i++) {
                projectItem[i].classList.add('move')
            }
            

        } else {

            for (let i = 0; i<projectItem.length; i++) {
                projectItem[i].classList.remove('move')
            }
        }
    });
}

const projectsObserver = new IntersectionObserver(projectsIntersection);


projectsObserver.observe(projects);