let divs = document.querySelectorAll("div");
let mybuttons = document.querySelectorAll("button");
mybuttons.forEach((ele) => {
  ele.addEventListener("click", () => {
    divs.forEach((elem) => {
      elem.id == ele.innerHTML
        ? (elem.style.display = "block")
        : (elem.style.display = "none");
    });
  });
});
