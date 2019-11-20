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

export const dateDiff = date => {
  var now = new Date.now();
  var due = new Date(date);

  return (
    now.getMonth() + 12 * now.getFullYear() - (due.getMonth() + 12 * due.get)
  );
};
