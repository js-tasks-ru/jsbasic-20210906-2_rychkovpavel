export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._container = document.createElement('div');
    this.spans = '';
    this.makeSpan(this.steps);
    this.sliderElement = this.makeSlider(this.spans);
    this.makeTemplate(this.sliderElement, this._container);
    this.thumb = this._container.querySelector('.slider__thumb');
    this.progress = this._container.querySelector('.slider__progress');
    this.leftPercents = 0;
    this.basicSettings(this._container, this.progress);

    this._container.addEventListener('click', this.onClick);
  }

  makeSpan(steps, spans) {
    for (let i = 0; i <= this.steps - 1; i++) {
      this.spans += `<span></span>`;
    }
  }

  makeSlider(spans) {
    return `
    <div class="slider__thumb">
      <span class="slider__value">${this.value}</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      ${this.spans}
    </div>
    `;
  }

  makeTemplate(sliderElement, container) {
    this._container.classList.add('slider');
    this._container.insertAdjacentHTML('afterbegin', this.sliderElement);
  }

  basicSettings(container, progress) {
    let spansElem = this._container.querySelectorAll('.slider__steps > span');
    spansElem[0].classList.add('slider__step-active');

    this.thumb.style.left = `${this.leftPercents}%`;
    this.progress.style.width = `${this.leftPercents}%`;
  }

  get elem() {
    return this._container;
  }

  onClick = (event) => {   
    let left = event.clientX - this._container.getBoundingClientRect().left;
    let leftRelative = left / this._container.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    let spanValue = document.querySelector('.slider__value');
    let sliderSteps = document.querySelectorAll('.slider__steps > span');

    this.value = value;
    spanValue.textContent = this.value;

    for (let i = 0; i <= segments; i++) {
      sliderSteps[i].classList.remove('slider__step-active');
    }

    sliderSteps[this.value].classList.add('slider__step-active');

    this.leftPercents = valuePercents;

    this.thumb.style.left = `${this.leftPercents}%`;
    this.progress.style.width = `${this.leftPercents}%`;

    const sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this._container.dispatchEvent(sliderChange);

    /* let sliderElement = document.querySelector('.slider');
    let coordinatesSliderElement = sliderElement.getBoundingClientRect();
    let widthStep = (coordinatesSliderElement.width / (this.steps - 1)) / 2;
    let start = coordinatesSliderElement.x;
    let coordinatesXClick = event.clientX;
    let spanValue = document.querySelector('.slider__value');
    let sliderSteps = document.querySelector('.slider__steps').children;
        
    if (coordinatesXClick >= start && coordinatesXClick <= start + widthStep * 1) {
      this.value = 0;
      this.leftPercents = 0;
    } else if (coordinatesXClick >= start + widthStep && coordinatesXClick <= start + widthStep * 3) {
      this.value = 1;
      this.leftPercents = 25;
    } else if (coordinatesXClick >= start + widthStep * 3 && coordinatesXClick <= start + widthStep * 5) {
      this.value = 2;
      this.leftPercents = 50;
    } else if (coordinatesXClick >= start + widthStep * 5 && coordinatesXClick <= start + widthStep * 7) {
      this.value = 3;
      this.leftPercents = 75;
    } else if (coordinatesXClick >= start + widthStep * 7 && coordinatesXClick <= start + widthStep * 8) {
      this.value = 4;
      this.leftPercents = 100;
    }

    spanValue.textContent = this.value;
    
    for (let i = 0; i < sliderSteps.length; i++) {
      sliderSteps[i].classList.remove('slider__step-active');
      if (i === this.value) {
        sliderSteps[i].classList.add('slider__step-active');
      }
    }

    this.thumb.style.left = `${this.leftPercents}%`;
    this.progress.style.width = `${this.leftPercents}%`;

    const sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this._container.dispatchEvent(sliderChange); */  
  }
}
