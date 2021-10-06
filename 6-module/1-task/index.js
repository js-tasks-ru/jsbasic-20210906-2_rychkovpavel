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
  constructor(rows) {
    this._container = document.createElement('table');
    this.makeRows = rows;
    this.makeTemplate = this._rowsTemplate;
    this._container.insertAdjacentHTML('afterBegin', this._template);
  }

  set makeRows(rows) {
    this._rowsTemplate = rows.map(item => {
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

  set makeTemplate(_rowsTemplate) {
    this._template = `
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
        ${this._rowsTemplate}
      </tbody>
    `;
  }

  get elem() {
    this.buttons.forEach(item => {
      item.addEventListener('click', this.#onClick);
    });

    return this._container;
  }

  get buttons() {
    return this._container.querySelectorAll('button');
  }

  #onClick = (event) => {
    event.target.closest('tr').remove();
  }

  destroy() {
    this.buttons.forEach(item => {
      item.removeEventListener('click', this.#onClick);
    });
  }
}
