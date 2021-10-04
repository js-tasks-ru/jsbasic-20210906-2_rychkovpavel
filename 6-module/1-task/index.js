/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = null;
  #rowsTemplate = '';
  #template = '';

  constructor(rows) {
    this.#rows = rows;
    this.elem = document.createElement('table');
    this.#rowsTemplate = this.#makeRows(this.#rows);
    this.#template = this.#makeTemplate();
    this.render = this.render();
    this.#onClick = this.#onClick();
  }

  #makeRows() {
    return this.#rows.map(item => {
      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.salary}</td>
          <td>${item.city}</td>
          <td><button>X</button></td>
        </tr>
      `;
    }).join('');
  }

  #makeTemplate() {
    return `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${this.#rowsTemplate}
    </tbody>
  `;
  }

  render() {
    this.elem.insertAdjacentHTML('afterBegin', this.#template);
  }

  get buttons() {
    return this.elem.querySelectorAll('BUTTON');
  }

  #onClick = () => {  
    this.buttons.forEach(item => {
      item.addEventListener('click', () => {
        item.parentElement.parentElement.remove();
      });
    });
  }
}
