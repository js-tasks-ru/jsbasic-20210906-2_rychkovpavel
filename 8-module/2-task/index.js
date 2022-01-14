import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.template = this.makeTemplate(this.products);
    this._container = createElement(this.template);
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
  }

  get elem() {
    return this._container;
  }

  updateFilter(filters) {
    let productsGridInner = this._container.querySelector('.products-grid__inner');
    productsGridInner.innerHTML = "";

    this.filters = Object.assign(this.filters, filters);

    let {noNuts, vegeterianOnly, maxSpiciness, category} = this.filters;

    for (let product of this.products) {
      if (noNuts && product.nuts) {
        continue;
      }
      if (vegeterianOnly && !product.vegeterian) {
        continue;
      }
      if (maxSpiciness !== undefined && product.spiciness > maxSpiciness) {
        continue;
      }
      if (category && product.category != category) {
        continue;
      }

      let card = new ProductCard(product);
      productsGridInner.append(card.elem);
    }   
  }
}