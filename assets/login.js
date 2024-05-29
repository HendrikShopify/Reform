let recoverWrap = document.getElementById("recover");
let recoverButton = document.getElementById("recoverButton");

let loginWrap = document.getElementById("login");
let loginButton = document.getElementById("loginButton");

recoverButton.addEventListener("click", function (event) {
  event.preventDefault();
  loginWrap.classList.toggle("hide");
  recoverWrap.classList.toggle("hide");
});

loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  recoverWrap.classList.toggle("hide");
  loginWrap.classList.toggle("hide");
});