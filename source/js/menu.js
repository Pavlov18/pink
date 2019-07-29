var navMobileButton = document.querySelector(".main-nav__toogle");
var mobileMenu = document.querySelector(".main-nav");

mobileMenu.classList.remove("main-nav--nojs");

navMobileButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (mobileMenu.classList.contains("main-nav--open")) {
    mobileMenu.classList.remove("main-nav--open");
  }
  else {
    mobileMenu.classList.add("main-nav--open");
  }
});
