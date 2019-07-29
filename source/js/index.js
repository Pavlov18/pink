var mapIndex = document.querySelector(".contacts__map");
var mapIframe = document.querySelector(".contacts__map-iframe")

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
var sliderTogglesList = slider.querySelector(".slider__toggles-list");
var sliderToggles = sliderTogglesList.querySelectorAll(".slider__toggle");
var oldChecked = slider.querySelector(".slider__button:checked");

// Определение кнопок слайдера
function slideButtons() {
  for (i = 0; i < slideRadio.length; i++) {
    if (slideRadio[i].checked) {
        numChecked = i;
        currentChecked  = slideRadio[i];
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

  currentChecked.checked = false;
  currentSlide.classList.remove("slider__item--current");
  currentSlide.classList.remove("bounce-right","bounce-left");

  if (currentChecked != finalRadio) {
    nextRadio.checked = true;
    nextSlide.classList.add("slider__item--current");
    nextSlide.classList.add("bounce-left");
  }

  else {
    firstRadio.checked = true;
    firstSlide.classList.add("slider__item--current");
    firstSlide.classList.add("bounce-right");
  }
});

btnBack.addEventListener("click", function (evt) {
  evt.preventDefault();
  slideButtons();
  funcCurrentSlide();
  currentChecked.checked = false;
  currentSlide.classList.remove("slider__item--current");
  currentSlide.classList.remove("bounce-right","bounce-left");

  if (currentChecked != firstRadio) {
    prevRadio.checked=true;
    prevSlide.classList.add("slider__item--current");
    prevSlide.classList.add("bounce-right");
  }

  else {
    finalRadio.checked = true;
    finalSlide.classList.add("slider__item--current");
    finalSlide.classList.add("bounce-left");
  }
});

sliderTogglesList.addEventListener("click", function() {
  slideButtons();
  for (i = 0; i < slideRadio.length; i++) {
    slideRadio[i].addEventListener("click", function() {
      for (i = 0; i < slideRadio.length; i++) {
        if (slideRadio[i].checked) {
          var numCheck = i + 1;
          for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove("slider__item--current","bounce-left","bounce-right");
          }
          numSlide = sliderContent.querySelector(".slider__item:nth-of-type(" + numCheck + ")");
        }
      }
      if (numCheck > (numChecked + 1)) {
        numSlide.classList.add("slider__item--current","bounce-left");
      }
      if (numCheck < (numChecked + 1)) {
        numSlide.classList.add("slider__item--current","bounce-right");
      }
      if (numCheck === (numChecked + 1)) {
        numSlide.classList.add("slider__item--current");
      }
    });
  }
});
