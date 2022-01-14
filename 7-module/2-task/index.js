import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.template = null;
    this.makeTamplate();
    
    this.closeButton = this.template.querySelector('.modal__close');
    this.onClick = this.onClick.bind(this);
    this.closeButton.addEventListener('click', this.onClick, {once: true});
    
    this.onKeydown = this.onKeydown.bind(this);
    document.addEventListener('keydown', this.onKeydown, {once: true});
  }

  makeTamplate() {
    this.template = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body">
        </div>
    </div>
    `);
  }

  setTitle(title) {
    this.template.querySelector('.modal__title').innerHTML = title;
  }

  setBody(body) {    
    let modalBody = this.template.querySelector('.modal__body');
    modalBody.innerHTML = null;
    modalBody.append(body);
  }

  open() {
    document.body.append(this.template);
    document.body.classList.add('is-modal-open');
  }

  close() {
    document.body.classList.remove('is-modal-open');
    document.body.innerHTML = null;
    
  }

  onClick() {
    this.close();
  }

  onKeydown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
