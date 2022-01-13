import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    const carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    const ribbonHolder = document.querySelector('[data-ribbon-holder]');
    ribbonHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    const sliderHolder = document.querySelector('[data-slider-holder]');
    sliderHolder.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    const cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);
    
    try {
      const response = await fetch('products.json');
      if (response.ok) {
        const result = await response.json();
        this.productsGrid = new ProductsGrid(result);
        const productsGridHolder = document.querySelector('[data-products-grid-holder]');
        productsGridHolder.innerHTML = '';
        productsGridHolder.append(this.productsGrid.elem);
      }
    } catch (error) {
      console.log('Message', error.message, '\nNmame', error.name, '\nStack', error.stack);
    }

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (productAdd) => {
      let productToAdd = this.productsGrid.products.find((product) => product.id === productAdd.detail);
      this.cart.addProduct(productToAdd);
    });

    document.body.addEventListener('slider-change', (sliderChange) => {
      this.productsGrid.updateFilter({maxSpiciness: sliderChange.detail});
    });

    document.body.addEventListener('ribbon-select', (ribbonSelect) => {
      this.productsGrid.updateFilter({category: ribbonSelect.detail});
    });

    let nutsCheckbox = document.getElementById('nuts-checkbox');
    nutsCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({noNuts: nutsCheckbox.checked});
    });

    let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
    vegeterianCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({vegeterianOnly: vegeterianCheckbox.checked});
    });
  }
}
