const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const x = e.pageX - btn.offsetLeft;
    const y = e.pageY - btn.offsetTop;

    btn.style.setProperty("--x", x + "px");
    btn.style.setProperty("--y", y + "px");
  })
})