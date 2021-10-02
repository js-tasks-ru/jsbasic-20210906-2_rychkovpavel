function initCarousel() {
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const slidesContainer = document.querySelector('.carousel__inner');
  const slides = document.querySelectorAll('.carousel__slide');
  let widthSlide = slides[0].offsetWidth;
  let width = 0;
  let counterSlides = 0;

  slides[0].classList.toggle('active');

  if (slides[0].classList.contains('active')) {
    arrowLeft.style.display = 'none';
  }

  arrowRight.addEventListener('click', () => {
    width = width + widthSlide;
    
    if (counterSlides < slides.length - 1) {
      slidesContainer.style.transform = `translateX(-${width + 'px'})`;
    }
    
    counterSlides++;

    arrowLeft.style.display = '';

    if (counterSlides === slides.length - 1) {
      arrowRight.style.display = 'none';
    } 
  });
  
  arrowLeft.addEventListener('click', () => {
    width = width - widthSlide;
    
    if (counterSlides !== 0 && counterSlides < slides.length) {
      slidesContainer.style.transform = `translateX(-${width + 'px'})`;
    }
    
    counterSlides--;

    arrowRight.style.display = '';

    if (counterSlides === 0) {
      arrowLeft.style.display = 'none';
    }
  });
}
