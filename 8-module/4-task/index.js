import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
    this.modal = new Modal();
  }

  addProduct(product) {
    if (product !== null && product !== undefined) {
      let productExists = this.cartItems.find(item => item.product.id === product.id);
      let cartItem = null;

      if (!productExists) {
        cartItem = {'product': product, 'count': 1};
        this.cartItems.push(cartItem);
      } else {
        productExists.count++;
        cartItem = productExists;
      }

      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = null;

    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        item.count += amount;
        if (item.count < 1) {
          this.cartItems.splice(index, 1);
        }
        cartItem = item;
      }
    });

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    for (let product of this.cartItems) {
      return false;
    }

    return true;
  }

  getTotalCount() {
    let count = this.cartItems.map(item => item.count);

    let totalCount = count.reduce((sum, current) => sum + current, 0);

    return totalCount;
  }

  getTotalPrice() {
    let price = this.cartItems.map(item => item.product.price * item.count);

    let totalPrice = price.reduce((sum, current) => sum + current, 0);

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(count * product.price).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let div = document.createElement('div');
    let result = [];

    for (let item of this.cartItems) {
      let elementsProduct = this.renderProduct(item.product, item.count);
      result.push(elementsProduct);
    }

    let elementOrderForm = this.renderOrderForm();

    div.append(...result, elementOrderForm);
    
    this.modal.setTitle("Your order");
    this.modal.setBody(div);
    this.modal.open();

    let plusButton = document.querySelectorAll('.cart-counter__button_plus');
    let minusButton = document.querySelectorAll('.cart-counter__button_minus');

    plusButton.forEach(item => item.addEventListener('click', (event) => {
      let eventTarget = event.target.closest('button');
      let productId = eventTarget.closest('.cart-product').dataset.productId;
      this.updateProductCount(productId, 1);
    }));

    minusButton.forEach(item => item.addEventListener('click', (event) => {
      let eventTarget = event.target.closest('button');
      let productId = eventTarget.closest('.cart-product').dataset.productId;
      this.updateProductCount(productId, -1);
    }));

    elementOrderForm.addEventListener('submit', this.onSubmit);
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open') && cartItem.count >= 1) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector('.cart-buttons__info-price');

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    } else if (document.body.classList.contains('is-modal-open') && cartItem.count < 1) {
      let productId = cartItem.product.id;
      let product = document.querySelector(`[data-product-id="${productId}"]`);
      product.remove();
    }
    
    if (this.isEmpty()) {
      this.modal.close();
    }

    this.cartIcon.update(this);
  }

  onSubmit = async (event) => {
    event.preventDefault();
    
    const buttonSubmit = document.querySelector(`.modal__body [type="submit"]`);
    buttonSubmit.classList.add('is-loading');

    const elementOrderForm = document.querySelector('.cart-form');
    const formData = new FormData(elementOrderForm);

    try {
      const response = await fetch('https://httpbin.org/post', {
        body: formData,
        method: 'POST'
      });

      if (response.ok) {
        const modalBodyInner = createElement(`
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
        `);
          
        const modalTitle = document.querySelector('.modal__title');
        modalTitle.textContent = 'Success!';

        this.cartItems.splice(0);
    
        const modalBody = document.querySelector('.modal__body');
        modalBody.innerHTML = '';
        modalBody.append(modalBodyInner);
      }
    } catch (error) {
      console.log('Message', error.message, '\nName', error.name, '\nStack', error.stack);
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();    
  }
}

