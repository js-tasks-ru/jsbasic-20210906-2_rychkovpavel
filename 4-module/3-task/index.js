function highlight(table) {
  let rows = table.rows;

  for (let i = 0; i < rows.length; i++) {

    for (let j = 0; j < rows[i].cells.length; j++) {

      if (rows[i].cells[j].dataset.available === 'true') {
        rows[i].classList.toggle('available');
      } else if (rows[i].cells[j].dataset.available === 'false') {
        rows[i].classList.toggle('unavailable');
      }
          
      if (rows[i].cells[j].innerHTML === 'm') {
        rows[i].classList.toggle('male');
      } else if (rows[i].cells[j].innerHTML === 'f') {
        rows[i].classList.toggle('female');
      }

      if (rows[i].cells[j].innerHTML < '18') {
        rows[i].style.textDecoration = 'line-through';
      }
    }
  }

  for (let i = 1; i < rows.length; i++) {
    if (!(rows[i].classList.contains("available")) && !(rows[i].classList.contains("unavailable"))) {
      rows[i].setAttribute('hidden', true);
    }
  }
}
