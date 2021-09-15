function filterRange(arr, a, b) {
  if (a < b) {
    return arr.filter(item => item >= a && item <= b);
  }

  return arr.filter(item => item >= b && item <= a);
}
