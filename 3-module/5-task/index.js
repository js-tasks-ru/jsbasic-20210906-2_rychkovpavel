function getMinMax(str) {
  let arr = str.split(' ');

  let arrNumberAsStr = arr.filter(item => isFinite(item));
  let arrNumber = arrNumberAsStr.map(item => Number(item));

  arrNumber.sort((a, b) => a - b);

  let obj = {
    min: null,
    max: null
  };

  obj.min = arrNumber[0];
  obj.max = arrNumber[arrNumber.length - 1];
  
  return obj;
}
