/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  return (
    name != '' && 
    name != null &&
    name.length >= 4 &&
    !(name.includes(' '))) 
    ? true : false;
}

// возможно лучше использовать !(name.startsWith(' ')) && !(name.endsWith(' ')),
//т.к. пользователь может ввести например Василий Иванович и тогда пробел по середине будет считаться ошибкой
// запускад тест с таким кодом, но код не проходит

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
