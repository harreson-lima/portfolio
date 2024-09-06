const expandBtn = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");
const itemsNav = document.querySelectorAll(".naviagtion__item");
const body = document.querySelector("body");

expandBtn.addEventListener("click", () => {
  if (expandBtn.getAttribute("data-visible") === "false") {
    expandBtn.setAttribute("data-visible", true);
    expandBtn.setAttribute("aria-expanded", true);
    navigation.classList.toggle("expand");
  } else {
    expandBtn.setAttribute("data-visible", false);
    expandBtn.setAttribute("aria-expanded", false);
    navigation.classList.toggle("expand");
  }
});

itemsNav.forEach(item => {
  item.addEventListener("click", () => {
    expandBtn.setAttribute("data-visible", false);
    expandBtn.setAttribute("aria-expanded", false);
    navigation.classList.toggle("expand");
  })
});