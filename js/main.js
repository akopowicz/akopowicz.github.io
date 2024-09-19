let navigation_items = document.querySelector(".navigation_items");
let hamburger = document.querySelector(".hamburger");
const header = document.getElementById("header");
// const plane = document.querySelector(".plane");
const bird_fly_wrapper = document.querySelector(".bird_fly_wrapper");
const wing = document.querySelector(".wing");
const leaf = document.querySelector(".leaf");
let portfolio_line = document.querySelector(".portfolio_line");
let portfolio = document.getElementById("portfolio");
let about = document.getElementById("about");
let skill = document.getElementById("skill");
let year = document.querySelector(".year");
let me_skills = document.querySelector(".me_skills");
let skill_balls_animation = document.querySelectorAll(".skill_ball_animation");
let skill_balls_animation_reverse = document.querySelectorAll(
  ".skill_ball_animation_reverse"
);
let scroll_circle = document.querySelector(".scroll_circle");
let contact = document.getElementById("contact");

year.innerText = new Date().getFullYear();

hamburger.addEventListener("click", () => {
  navigation_items.classList.toggle("show");
});

navigation_items.addEventListener("click", () => {
  navigation_items.classList.remove("show");
});

const lineAnimation = (line) => {
  document.querySelector(`.${line}_line`).classList.add("line_animation");
};

const addActiveState = (section) => {
  if (window.innerWidth > 992) {
    if (document.querySelector(".active") !== null) {
      document.querySelectorAll(".active").forEach((active) => {
        active.classList.remove("active");
      });
    }

    if (section !== "skill" && section !== "about") {
      document.querySelector(`.navigation_${section}`).classList.add("active");
    } else {
      document.querySelector(`.navigation_skill`).classList.add("active");
      document.querySelector(`.navigation_about`).classList.add("active");
    }
  }
};

const animateIntersectionProject = (entries) => {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      lineAnimation(entry.target.id);
      addActiveState(entry.target.id);
    }
  });
};

const sectionAnimationProjects = new IntersectionObserver(
  animateIntersectionProject,
  { threshold: 0.22 }
);
sectionAnimationProjects.observe(portfolio);
sectionAnimationProjects.observe(about);
sectionAnimationProjects.observe(skill);

const skillsBallAnimationsObserver = (entries) => {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      skill_balls_animation.forEach((skillBall) => {
        skillBall.classList.add("animation");
      });

      skill_balls_animation_reverse.forEach((skillBall) => {
        skillBall.classList.add("animation_reverse");
      });
    }
  });
};

const sectionSkills = new IntersectionObserver(skillsBallAnimationsObserver, {
  threshold: 0.3,
});
sectionSkills.observe(me_skills);

const headerAnimations = (entries) => {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      addActiveState(entry.target.id);

      // plane.classList.add("animation");
      leaf.classList.add("animation");
      bird_fly_wrapper.classList.add("animation");
      wing.classList.add("animation");

      if (window.innerWidth > 992) {
        scroll_circle.classList.add("animation");
      }
    } else {
      //   plane.classList.remove("animation");
      leaf.classList.remove("animation");
      bird_fly_wrapper.classList.remove("animation");
      wing.classList.remove("animation");

      if (window.innerWidth > 992) {
        scroll_circle.classList.remove("animation");
      }
    }
  });
};

const headerObserver = new IntersectionObserver(headerAnimations, {
  threshold: 0.3,
});
headerObserver.observe(header);

const contactShow = (entries) => {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      addActiveState(entry.target.id);
    }
  });
};

const contactObserver = new IntersectionObserver(contactShow, {
  threshold: 0.3,
});
contactObserver.observe(contact);
