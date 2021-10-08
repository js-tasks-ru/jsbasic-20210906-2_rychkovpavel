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
    this._rowsTemplate = '';
    this.makeRows = rows;
    this._template = '';
    this.makeTemplate = this._rowsTemplate;
    this._container.insertAdjacentHTML('afterBegin', this._template);
    this.buttons.forEach(item => item.addEventListener('click', this.#onClick, {once: true}));
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
    return this._container;
  }

  get buttons() {
    return this._container.querySelectorAll('button');
  }

  #onClick = (event) => {
    event.target.closest('tr').remove();
  }

  /* destroy() {
    this.buttons.forEach(item => {
      item.removeEventListener('click', this.#onClick); // это метод отмены подписки на событие, метод обычно
    });                                                 // вызывается после удаления элемента со страницы на
  }                                                     // который была подписка на событие, либо при переходе
                                                        // на другую страницу сайта (приложения)
                                                        // в этом примере он нужен, но здесь реалтзован как
                                                        // {once: true}                                      
  */
}
