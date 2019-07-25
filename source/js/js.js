var navMobileButton = document.querySelector(".main-nav__toogle");
var mobileMenu = document.querySelector(".main-nav");
var mapIndex = document.querySelector(".contacts__map");

mobileMenu.classList.remove("main-nav--nojs");
mapIndex.classList.remove("contacts__map--nojs");


navMobileButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (mobileMenu.classList.contains("main-nav--open")) {
    mobileMenu.classList.remove("main-nav--open");
  }
  else {
    mobileMenu.classList.add("main-nav--open");
  }

});
