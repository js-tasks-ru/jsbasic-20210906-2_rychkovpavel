/* import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  #product = null;
  #template = '';
  
  constructor(product) {
    this.#product = product;
    this.#template = this.makeTemplate(this.#product);
    this._container = createElement(this.#template);
    this.button.addEventListener('click', this.onClick);
  }

  makeTemplate() {
    return `
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.#product.image}" class="card__image" alt="product">
          <span class="card__price">€${this.#product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.#product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  get elem() {
    return this._container;
  }

  get button() {
    return this._container.querySelector('.card__button');
  }  
  
  onClick = () => {
    const productAdd = new CustomEvent('product-add', {
      detail: this.#product.id,
      bubbles: true
    });

    this._container.dispatchEvent(productAdd);
  }

  //destroy() {
    //this.button.removeEventListener('click', this.onClick); // здесь он не нужен, т.к. может 
  //}                                                         // клиент несколько раз кликнуть и добавить блюдо
 
} */

import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  
  constructor(product) {
    this.product = product;
    this.template = this.makeTemplate(this.product);
    this._container = createElement(this.template);
    this.button.addEventListener('click', this.onClick);
  }

  makeTemplate() {
    return `
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;

    //elem.category = this.product.category;
    //elem.id = this.product.id;
  }

  get elem() {
    return this._container;
  }

  get button() {
    return this._container.querySelector('.card__button');
  }  
  
  onClick = () => {
    const productAdd = new CustomEvent('product-add', {
      detail: this.product.id,
      bubbles: true
    });

    this._container.dispatchEvent(productAdd); // клиент несколько раз кликнуть и добавить блюдо
  }                                                      
 
}