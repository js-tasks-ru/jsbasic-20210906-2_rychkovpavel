/* // Влад подскажи пожалуйста сделал задание 7.4 в двух разных вариациях, первый вариант сделал как можно меньше
// повторяющегося кода.
// второй есть повторяющиеся строчки кода и почти все переменные локальные для своих методов
// Какой вариант на твой взгляд более читабельный и проверь сразу все ли правельно )))

// Первый вариант
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
    this.setBasicSettings(this._container, this.progress);
    this.segments = this.steps - 1;
    this._container.addEventListener('click', this.onClick);
    this.thumb.addEventListener('pointerdown', this.onPointerDown);
    this.thumb.addEventListener('dragstart', this.onDragStart);
    this.thumb.touchAction = 'none';
    this.sliderSteps = this._container.querySelectorAll('.slider__steps > span');
    this.sliderValue = this._container.querySelector('.slider__value');
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

  setBasicSettings(container, progress) {
    let spansElem = this._container.querySelectorAll('.slider__steps > span');
    spansElem[0].classList.add('slider__step-active');

    this.changeStyleLeftThumbAndProgress(this.leftPercents);
  }

  get elem() {
    return this._container;
  }

  onClick = (event) => { 
    let left = event.clientX - this._container.getBoundingClientRect().left;
    let leftRelative = left / this._container.offsetWidth;
    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / this.segments * 100;    

    this.addSliderValue(value);

    this.setActiveStep(this.value);

    this.leftPercents = valuePercents;

    this.changeStyleLeftThumbAndProgress(this.leftPercents);

    const sliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this._container.dispatchEvent(sliderChange);  
  }

  onPointerDown = ({pointerId}) => {
    //this.thumb.setPointerCapture(pointerId);
    
    let onPointerMove = (event) => {
      let left = event.clientX - this._container.getBoundingClientRect().left;
      let leftRelative = left / this._container.offsetWidth;
      
      this._container.classList.add('slider_dragging');

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      this.leftPercents = leftRelative * 100;

      this.changeStyleLeftThumbAndProgress(this.leftPercents);

      let approximateValue = leftRelative * this.segments;
      let value = Math.round(approximateValue);
  
      this.addSliderValue(value);

      this.setActiveStep(this.value);
    };

    document.addEventListener('pointermove', onPointerMove);

    let onPointerUp = () => {
      this._container.classList.remove('slider_dragging');

      this.leftPercents = this.value / (this.steps - 1) * 100;

      this.changeStyleLeftThumbAndProgress(this.leftPercents);

      document.removeEventListener('pointermove', onPointerMove);

      const sliderChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
  
      this._container.dispatchEvent(sliderChange);
    };
    
    document.addEventListener('pointerup', onPointerUp, {once: true});
  };

  onDragStart = (event) => {
    e.preventDefault();
  };

  addSliderValue = (value) => {
    this.value = value;
    this.sliderValue.textContent = this.value;
  }
    
  setActiveStep = (value) => {
    for (let i = 0; i <= (this.steps - 1); i++) {
      this.sliderSteps[i].classList.remove('slider__step-active');
    }

    this.sliderSteps[value].classList.add('slider__step-active');
  };

  changeStyleLeftThumbAndProgress = (leftPercents) => {
    this.thumb.style.left = `${this.leftPercents}%`;
    this.progress.style.width = `${this.leftPercents}%`;
  }
} */

// Второй вариант
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
    this.setBasicSettings();    
    this._container.addEventListener('click', this.onClick);
    this.thumb.addEventListener('pointerdown', this.onPointerDown);
    this.thumb.addEventListener('dragstart', this.onDragStart);
    this.thumb.touchAction = 'none';   
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
    let spansElem = this._container.querySelectorAll('.slider__steps > span');
    spansElem[this.value].classList.add('slider__step-active');
    
    let segments = this.steps - 1;
    let valuePercents = this.value / segments * 100;
    let thumb = this._container.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
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

  onPointerDown = ({pointerId}) => {
    //this.thumb.setPointerCapture(pointerId);
    
    let onPointerMove = (event) => {
      let left = event.clientX - this._container.getBoundingClientRect().left;
      let leftRelative = left / this._container.offsetWidth;
      
      this._container.classList.add('slider_dragging');

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;

      let thumb = this._container.querySelector('.slider__thumb');
      let progress = this._container.querySelector('.slider__progress');

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
  
      let spanValue = document.querySelector('.slider__value');
      this.value = value;
      spanValue.textContent = this.value;
  
      let sliderSteps = document.querySelectorAll('.slider__steps > span');
  
      for (let i = 0; i <= segments; i++) {
        sliderSteps[i].classList.remove('slider__step-active');
      }
  
      sliderSteps[this.value].classList.add('slider__step-active');
    };

    document.addEventListener('pointermove', onPointerMove);

    let onPointerUp = () => {
      this._container.classList.remove('slider_dragging');

      let leftPercents = this.value / (this.steps - 1) * 100;

      let thumb = this._container.querySelector('.slider__thumb');
      let progress = this._container.querySelector('.slider__progress');

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      document.removeEventListener('pointermove', onPointerMove);

      const sliderChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
  
      this._container.dispatchEvent(sliderChange);
    };
    
    document.addEventListener('pointerup', onPointerUp, {once: true});
  };

  onDragStart = (event) => {
    e.preventDefault();
  };
}