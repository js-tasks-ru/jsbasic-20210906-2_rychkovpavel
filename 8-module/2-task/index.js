import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.template = this.makeTemplate(this.products);
    this._container = createElement(this.template);
    
    /* this._container = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          ${this.template}
        </div>
      </div>
    ` 
    ); */
  }

  makeTemplate(products) {
    let template = products.map(item => {
      return new ProductCard(item);
    });

    return `
      <div class="products-grid">
        <div class="products-grid__inner">
          ${template.map(item => item.template).join('')}
        </div>
      </div>
    `;

    //return template.map(item => item.template).join('');
  }

  get elem() {
    return this._container;
  }

  updateFilter(filters) {   
    this._container.innerHTML = "";

    this.filters = Object.assign(this.filters, filters);
    let checkProducts = [];

    if (this.filters.noNuts) {
      let noNuts = this.products.filter(item => item.nuts === false || item.nuts === undefined); // или лучше item.nuts == null
      noNuts.forEach(item => checkProducts.push(item));
    }

    if (this.filters.vegeterianOnly) {
      let vegeterian = this.products.filter(item => item.vegeterian === true);
      vegeterian.forEach(item => checkProducts.push(item));
    }
    
    if (this.filters.maxSpiciness) {
      let spiciness = null;
      switch(this.filters.maxSpiciness) {
      case 0:
        spiciness = this.products.filter(item => item.spiciness === 0);
        spiciness.forEach(item => checkProducts.push(item));
        break;
      case 1:
        spiciness = this.products.filter(item => item.spiciness === 1);
        spiciness.forEach(item => checkProducts.push(item));
        break;
      case 2:
        spiciness = this.products.filter(item => item.spiciness === 2);
        spiciness.forEach(item => checkProducts.push(item));
        break;
      case 3:
        spiciness = this.products.filter(item => item.spiciness === 3);
        spiciness.forEach(item => checkProducts.push(item));
        break;
      case 4:
        spiciness = this.products.filter(item => item.spiciness === 4);
        spiciness.forEach(item => checkProducts.push(item));
        break;
      }
    }

    if (this.filters.category) {
      let category = null;
      switch(this.filters.category) {
      case "salads":
        category = this.products.filter(item => item.category === "salads");
        category.forEach(item => checkProducts.push(item));
        break;
      case "soups":
        category = this.products.filter(item => item.category === "soups");
        category.forEach(item => checkProducts.push(item));
        break;
      case "chicken-dishes":
        category = this.products.filter(item => item.category === "chicken-dishes");
        category.forEach(item => checkProducts.push(item));
        break;
      case "beef-dishes":
        category = this.products.filter(item => item.category === "beef-dishes");
        category.forEach(item => checkProducts.push(item));
        break;
      case "seafood-dishes":
        category = this.products.filter(item => item.category === "seafood-dishes");
        category.forEach(item => checkProducts.push(item));
        break;
      case "vegetable-dishes":
        category = this.products.filter(item => item.category === "vegetable-dishes");
        category.forEach(item => checkProducts.push(item));
        break;
      case "bits-and-bites":
        category = this.products.filter(item => item.category === "bits-and-bites");
        category.forEach(item => checkProducts.push(item));
        break;
      case "on-the-side":
        category = this.products.filter(item => item.category === "on-the-side");
        category.forEach(item => checkProducts.push(item));
        break;
      }
    }

    this._container.insertAdjacentHTML('afterBegin', this.makeTemplate(checkProducts));
    
  }
}
