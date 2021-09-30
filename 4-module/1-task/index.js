function makeFriendsList(arr) {
  const arrNames = arr.map(item => `<li>${item.firstName} ${item.lastName}</li>`);
  const strNames = arrNames.join('');

  const ul = document.createElement('ul');
  ul.insertAdjacentHTML('afterBegin', strNames);

  return ul;
}
