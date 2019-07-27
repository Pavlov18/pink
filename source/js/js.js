var navMobileButton = document.querySelector(".main-nav__toogle");
var mobileMenu = document.querySelector(".main-nav");
var mapIndex = document.querySelector(".contacts__map");
var mapIframe = document.querySelector(".contacts__map-iframe")

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

mapIndex.addEventListener('click', function(evt) {
  evt.preventDefault();
  mapIframe.classList.add("contacts__map-iframe--scroll");
});

var slider = document.querySelector(".slider");
var slides = slider.querySelectorAll(".slider__item");
var slideRadio = document.getElementsByName("slider__button");
var btnBack = slider.querySelector(".reviews__button--prev");
var btnNext = slider.querySelector(".reviews__button--next");
var sliderContent = slider.querySelector(".slider__list");
var firstSlide = sliderContent.firstElementChild;
var finalSlide = sliderContent.lastElementChild;

function slideButtons() {
  for (var i = 0; i < slideRadio.length; i++) {
    if (slideRadio[i].checked) {
      currentCheck = slideRadio[i];
      nextRadio = slideRadio[i+1];
      prevRadio = slideRadio[i-1];
    }
    if (i === slideRadio.length - 1) {
      finalRadio = slideRadio[i];
    }
    if (i === 0) {
      firstRadio = slideRadio[i];
    }
  }
};

btnNext.addEventListener("click", function (evt) {
  evt.preventDefault();
  slideButtons();
  currentCheck.checked = false;
  if (currentCheck != finalRadio) {
    nextRadio.checked = true;
  }
  else {
    firstRadio.checked = true;
  }
});

btnBack.addEventListener("click", function (evt) {
  evt.preventDefault();
  slideButtons();
  currentCheck.checked = false;
  if (currentCheck != firstRadio) {
    prevRadio.checked=true;
  }
  else {
    finalRadio.checked = true;
  }
});
