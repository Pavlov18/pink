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
var sliderToggles = slider.querySelectorAll(".slider__toggle");
var sliderTogglesList = slider.querySelector(".slider__toggles-list");

function slideButtons() {
  for (i = 0; i < slideRadio.length; i++) {
    if (slideRadio[i].checked) {
      numRadio =  i;
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

function funcCurrentSlide() {
  for (i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("slider__item--current")) {
      currentSlide = slides[i];
      nextSlide = slides[i+1];
      prevSlide = slides[i-1];
    }
    if (i === slides.length - 1) {
      finalSlide = slides[i];
    }
    if (i === 0) {
      firstSlide = slides[i];
    }
  }
};

btnNext.addEventListener("click", function (evt) {
  evt.preventDefault();
  slideButtons();
  funcCurrentSlide();
  currentCheck.checked = false;
  currentSlide.classList.remove("slider__item--current");
  currentSlide.classList.remove("bounce-right","bounce-left");
  if (currentCheck != finalRadio) {
    nextRadio.checked = true;
    nextSlide.classList.add("slider__item--current");
    nextSlide.classList.add("bounce-left");
  }
  else {
    firstRadio.checked = true;
    firstSlide.classList.add("slider__item--current");
    firstSlide.classList.add("bounce-left");
  }
});

btnBack.addEventListener("click", function (evt) {
  evt.preventDefault();
  slideButtons();
  funcCurrentSlide();
  currentCheck.checked = false;
  currentSlide.classList.remove("slider__item--current");
  currentSlide.classList.remove("bounce-right","bounce-left");
  if (currentCheck != firstRadio) {
    prevRadio.checked=true;
    prevSlide.classList.add("slider__item--current");
    prevSlide.classList.add("bounce-right");
  }
  else {
    finalRadio.checked = true;
    finalSlide.classList.add("slider__item--current");
    finalSlide.classList.add("bounce-right");
  }
});

for (var i=0 ; i < slideRadio.length; i++) {
  slideRadio[i].addEventListener("click", function() {
    for (var i = 0; i < slideRadio.length; i++) {
      if (slideRadio[i].checked) {
        numRadioChecked = i + 1;

        slideRadio[i].classList.add("current");

        for (var i = 0; i < slides.length; i++) {
          slides[i].classList.remove("slider__item--current","bounce-left","bounce-right","bounce-bottom");
        }

        percent = numRadioChecked / (slideRadio.length + 1 ) * 100;
        numSlide = sliderContent.querySelector(".slider__item:nth-of-type(" + numRadioChecked + ")");
        numRadio1 = sliderToggles.querySelector(".slider__toggle:nth-of-type(" + numRadioChecked + ")");
        console.log(numRadio1);
        // if (numRadio1) {

        // }

        if (percent > 50) {
          numSlide.classList.add("slider__item--current","bounce-left");
        }
        if (percent < 50) {
          numSlide.classList.add("slider__item--current","bounce-right");
        }
        if (percent === 50) {
          numSlide.classList.add("slider__item--current","bounce-bottom");
        }
      }
    }
  });
}
