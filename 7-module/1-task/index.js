import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.linkTemplate = '';
    this.makeLink = this.categories;
    this.template = '';
    this.makeTemplate = this.linkTemplate;
    this._container = createElement(this.template);

    this.arrowRight = this._container.querySelector('.ribbon__arrow_right');
    this.arrorLeft = this._container.querySelector('.ribbon__arrow_left');
    this.arrowRight.addEventListener('click', this.onClickArrowRight);
    this.arrorLeft.addEventListener('click', this.onClickArrowLeft);
    this.ribbonInner = this._container.querySelector('.ribbon__inner');
    
    this.ribbonInner.addEventListener('scroll', this.onScroll);
    
    this.linksMenu = this._container.querySelectorAll('.ribbon__item');
    this.ribbonInner.addEventListener('click', this.onClickMenu);
  }

  set makeLink(categories) {
    this.linkTemplate = categories.map(item => {
      return `
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `;
    }).join('');
  }

  set makeTemplate(linkTemplate) {
    this.template = `
      <div class="ribbon">

        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.linkTemplate}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;
  }

  get elem() {
    return this._container;
  }

  onClickArrowRight = () => {
    this.ribbonInner.scrollBy(350, 0);
  }

  onClickArrowLeft = () => {
    this.ribbonInner.scrollBy(-350, 0);
  }

  onScroll = () => {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidht = this.ribbonInner.clientWidth;
    
    let scrollRight = scrollWidth - scrollLeft - clientWidht;

    if (scrollLeft > 0) {
      this.arrorLeft.classList.add('ribbon__arrow_visible');
    } else if (scrollLeft === 0) {
      this.arrorLeft.classList.remove('ribbon__arrow_visible');
    }

    if (scrollRight <= 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else if (scrollRight > 1) {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  }

  onClickMenu = (event) => {
    event.preventDefault();
    let target = event.target;
    
    this.linksMenu.forEach(item => {
      if (item.classList.contains('ribbon__item_active')) {
        item.classList.remove('ribbon__item_active');
      }

      if (item === target && !(item.classList.contains('ribbon__item_active'))) {
        item.classList.add('ribbon__item_active');
      }
    });

    let id = target.dataset.id;
    let category = {id: id};

    const ribbonSelect = new CustomEvent('ribbon-select', {
      detail: category.id,
      bubbles: true
    });

    this._container.dispatchEvent(ribbonSelect);  
  }
}
