import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._slideTemplate = '';
    this.makeSlideTemplate = this.slides;
    this._template = '';
    this.makeTemplate = this._slideTemplate;
    this._container = createElement(this._template);

    this.arrowRight = this._container.querySelector('.carousel__arrow_right');
    this.arrowLeft = this._container.querySelector('.carousel__arrow_left');
    this.arrowLeft.style.display = 'none';
    this.slidesContainer = this._container.querySelector('.carousel__inner');
    this.slides = this._container.querySelectorAll('.carousel__slide');   
    this.width = 0;
    this.counterSlides = 0;

    this.arrowRight.addEventListener('click', this.onClickRight);
    this.arrowLeft.addEventListener('click', this.onClickLeft);
    this.carouselButton.forEach(item => item.addEventListener('click', this.onClickProductAdd));
  }

  set makeSlideTemplate(slides) {
    this._slideTemplate = this.slides.map(item => {
      return `
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  set makeTemplate(_slideTemplate) {
    this._template = `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this._slideTemplate}
        </div>
      </div>
    `;
  }

  get elem() {    
    return this._container;
  }

  onClickRight = () => {    
    const widthSlide = this.slides[0].offsetWidth;
    
    if (this.counterSlides < this.slides.length - 1) {
      this.width += widthSlide;
      this.slidesContainer.style.transform = `translateX(-${this.width + 'px'})`;
      this.counterSlides++;
      this.arrowLeft.style.display = '';
    }

    if (this.counterSlides === this.slides.length - 1) {
      this.arrowRight.style.display = 'none';
    }
    
  }

  onClickLeft = () => {
    const widthSlide = this.slides[0].offsetWidth;
    
    if (this.counterSlides !== 0 && this.counterSlides < this.slides.length) {
      this.width -= widthSlide;
      this.slidesContainer.style.transform = `translateX(-${this.width + 'px'})`;
      this.counterSlides--;
      this.arrowRight.style.display = '';
    }

    if (this.counterSlides === 0) {
      this.arrowLeft.style.display = 'none';
    }
  }

  get carouselButton() {
    return this._container.querySelectorAll('.carousel__button');
  }

  onClickProductAdd = (event) => {
    const target = event.target.closest('.carousel__slide');
    const id = target.dataset.id;
    const slide = {id: id};

    const productAdd = new CustomEvent('product-add', {
      detail: slide.id,
      bubbles: true
    });

    this._container.dispatchEvent(productAdd);
  }
}
