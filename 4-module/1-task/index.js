function makeFriendsList(arr) {
  const names = arr.map(item => `<li>${item.firstName} ${item.lastName}</li>`);
  let liItems = ''; 
    
  for (let i = 0; i < names.length; i++) {
    liItems += names[i];
  }

  let ul = document.createElement('ul');
  ul.insertAdjacentHTML('afterBegin', liItems);

  return ul;
}
