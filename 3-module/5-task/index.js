function getMinMax(str) {
  let arr = str.split(' ');
  
  let newArr = [];
  
  arr.map(item => {
    if (isFinite(item)) {
      newArr.push(+item);
    }
  });

  newArr.sort((a, b) => a - b);

  let obj = {
    min: null,
    max: null
  };

  obj.min = newArr[0];
  obj.max = newArr[newArr.length - 1];
  
  return obj;
}
