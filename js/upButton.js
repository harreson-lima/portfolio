let upBtn = document.querySelector(".go_up");
upBtn.addEventListener("click", goTop);

window.addEventListener("scroll", scrollCheck);

function scrollCheck() {
  if (
    document.body.scrollTop > 27 ||
    document.documentElement.scrollTop > 700
  ) {
    upBtn.style.display = "flex";
  } else {
    upBtn.style.display = "none";
  }
}

function goTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
