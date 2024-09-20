let navigation_items = document.querySelector(".navigation_items");
let hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  navigation_items.classList.toggle("show");
});

navigation_items.addEventListener("click", () => {
  navigation_items.classList.remove("show");
});
