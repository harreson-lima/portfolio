const contactBtn = document.querySelector(".contact__btn");

contactBtn.addEventListener("click", () => {
  if(navigator.clipboard) {
    navigator.clipboard.writeText("contatoharresonlima@gmail.com");
    Toastify({
      text: "Contato copiado!",
      duration: 3000,
      close: true,
      gravity: "bottom", 
      position: "center", 
      stopOnFocus: true, 
      style: {
        background: "#86c06c",
        color: "#0c1336",
        fontWeight: "bold",
      },
    }).showToast();
  }
});