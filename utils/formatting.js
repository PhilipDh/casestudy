export const formatDate = date => {
  var nDate = new Date(date);
  return nDate.getDate() + '/' + nDate.getMonth() + '/' + nDate.getFullYear();
};
