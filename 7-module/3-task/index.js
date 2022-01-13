export default class StepSlider {
  constructor({ steps, value = 0}) {
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
    this.setBasicSettings();
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

  get elem() {
    return this._container;
  }

  setBasicSettings() {
    let spansElem = this._container.querySelectorAll('.slider__steps > span');
    spansElem[this.value].classList.add('slider__step-active');
    
    let segments = this.steps - 1;
    let valuePercents = this.value / segments * 100;
    let thumb = this._container.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
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
  }
}

/* export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._container = document.createElement('div');
    this.spans = '';
    this.makeSpan(this.steps);
    this.sliderElement = this.makeSlider(this.spans);
    this.makeTemplate(this.sliderElement, this._container);
    this.setBasicSettings();
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

  setBasicSettings() {
    let thumb = this._container.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let spansElem = this._container.querySelectorAll('.slider__steps > span');
    
    spansElem[0].classList.add('slider__step-active');
    thumb.style.left = `${0}%`;
    progress.style.width = `${0}%`;
  }

  get elem() {
    return this._container;
  }

  onClick = (event) => {
    let thumb = this._container.querySelector('.slider__thumb');
    let progress = this._container.querySelector('.slider__progress');
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

    let leftPercents = valuePercents;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    const sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this._container.dispatchEvent(sliderChange);  
  }
} */
