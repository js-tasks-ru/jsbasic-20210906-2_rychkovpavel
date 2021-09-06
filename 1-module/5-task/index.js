function truncate(str, maxlength) {
  if (str.length > maxlength) {
    let newStr = str.substr(0, maxlength);
    newStr = newStr.slice(0, -1) + '…';
    
    return newStr;
  }

  return str;
}
