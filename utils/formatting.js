//Function that will return the given date in a readable format
//In case the given date is for an ad it will alter it to be 2 month into the future
export const formatDate = (date, ad = false) => {
  var nDate = new Date(date);
  var carryOver = 0;
  if (!ad) {
    return (
      nDate.getDate() + '/' + (nDate.getMonth() + 1) + '/' + nDate.getFullYear()
    );
  } else {
    carryOver = (nDate.getMonth() + 2) % 11 < nDate.getMonth() ? 1 : 0;

    return (
      nDate.getDate() +
      '/' +
      ((nDate.getMonth() % 12) + 3) +
      '/' +
      (nDate.getFullYear() + carryOver)
    );
  }
};

// Function that returns wether the difference between two dates is greate than a threshhold 'difference' (default value is 2 month)
export const dateDiff = (date, difference = 60) => {
  var now = Date.now();
  var due = new Date(date);

  return Math.floor((now - due) / (1000 * 60 * 60 * 24)) > difference;
};

export const initCap = inp => {
  return inp.charAt(0).toUpperCase() + inp.slice(1);
};
