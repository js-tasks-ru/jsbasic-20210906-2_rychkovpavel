function camelize(str) {
  let arr = str.split('');

  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '-') {
      newArr.push(arr[i]);
    } else {
      newArr.push(arr[i + 1].toUpperCase());
      i++;
    }
  }

  let newStr = newArr.join('');

  return newStr;
}
