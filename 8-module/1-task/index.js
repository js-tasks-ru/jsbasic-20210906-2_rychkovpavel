import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
      
    if (this.elem.offsetWidth) { // проверка на пустоту
      let coordsCartIcon = this.elem.getBoundingClientRect();
      let widthCartIcon = this.elem.offsetWidth;
      let container = document.querySelector('.header').getBoundingClientRect();
      let windowClientWidth = document.documentElement.clientWidth;
      let space = windowClientWidth - container.right - (20 + widthCartIcon + 10);

      if (windowClientWidth > 767 && window.pageYOffset > coordsCartIcon.top && space > 0) {
        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '50px',
          zIndex: 1e3,
          left: `${container.right + 20}px`
        });
        //this.elem.style.cssText = "position: fixed; top: 50px; z-index: 1000000";
        //this.elem.style.left = `${container.right + 20}px`;
      } else if (windowClientWidth > 767 && window.pageYOffset > coordsCartIcon.top && space <= 0) {
        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '50px',
          zIndex: 1e3,
          left: `${windowClientWidth - widthCartIcon - 10}px`
        });
        //this.elem.style.cssText = "position: fixed; top: 50px; z-index: 1000000";
        //this.elem.style.left = `${windowClientWidth - widthCartIcon - 10}px`;
      } else if (window.pageYOffset < coordsCartIcon.top) {
        Object.assign(this.elem.style, {
          position: '',
          top: '',
          zIndex: '',
          left: '' 
        });
        //this.elem.style.cssText = "position: absolute; right: 0; top: 50px;";
      }  
    }
  }
}