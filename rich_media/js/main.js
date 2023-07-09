let swipe = false;
let pageNumber = 1;
let main = false;
let pages = document.querySelectorAll(".page");
let offset = 0;
let animationInProgress = false;
let currentDir;
let nextDir;
let start_buttons = document.querySelectorAll(".start_button");
let circles = document.querySelectorAll(".circle")
let pageWrapper = document.querySelector(".page-wrapper");

start_buttons.forEach(start => {
    start.addEventListener("click", e => {
        e.target.style.display = "none";
        document.querySelector(`.overlay_${e.target.id}`).style.opacity = 0;
        document.querySelector(`.overlay_${e.target.id}`).style.pointerEvents = "none";
        document.querySelector(`.${e.target.id}`).src = document.querySelector(`.${e.target.id}`).src
    })
})

circles.forEach(circle => {
    circle.addEventListener("click", (e, index) => {
        let numberId = e.target.id - 1
        if (numberId === 0) {
            pageWrapper.style.left = `${numberId}00%`
        } else {
            pageWrapper.style.left = `-${numberId}00%`
        }
        document.querySelector(".active").classList.remove("active")
        circle.classList.add("active")
        if (index === 0) {
            pageNumber = 1
            pages[index].style.left = 0;
            pages[1].style.left = "100%";
            pages[2].style.left = "200%";
            pages[3].style.left = "300%";
        } else if (index === 1) {
            pageNumber = 2
            pages[0].style.left = "400%";
            pages[index].style.left = "100%";
            pages[2].style.left = "200%";
            pages[3].style.left = "300%";
        } else if (index === 2) {
            pageNumber = 3
            pages[0].style.left = "400%";
            pages[1].style.left = "500%";
            pages[index].style.left = "200%";

        } else if (index === 3) {
            pageNumber = 4
            pages[2].style.left = "600%";
            pages[index].style.left = "300%";
        }
    })
})

const pageSwipe = (direction) => {
    if (direction === "next") {
        queueSwipe(+1);

        if (pageNumber < pages.length) {
            pageNumber++;
        } else {
            pageNumber = 1;
        }
    } else if (direction === "previous") {
        queueSwipe(-1);
        if (pageNumber > 1) {
            pageNumber--;
        } else {
            pageNumber = pages.length;
        }
    }
}

pageWrapper.addEventListener("transitionend", finalizeSwipe, false);
pageWrapper.addEventListener("webkitTransitionEnd", finalizeSwipe, false);

function queueSwipe(direction) {
    nextDir = direction;
    if (!animationInProgress) {
        executeSwipe();
    }
}

function executeSwipe() {
    animationInProgress = true;
    currentDir = nextDir;
    nextDir = null;
    offset += currentDir;
    pageWrapper.style.left = -offset + "00%";
    if (currentDir === -1) {
        applyPageOffset(offset);
    }
}

function finalizeSwipe() {
    animationInProgress = false;
    if (currentDir === +1) {
        applyPageOffset(offset);
    }
    if (nextDir) {
        executeSwipe();
    }
}

applyPageOffset(offset);

function applyPageOffset(offset) {
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.left = pagePosition(offset, i, pages.length) + "00%";
    }
}

function pagePosition(offset, pageIndex, pageCount) {
    return (
        Math.floor((offset - pageIndex - 1) / pageCount + 1) * pageCount +
        pageIndex
    );
}