//Function that will return the given date in a readable format
//In case the given date is for an ad it will alter it to be 2 month into the future
export const formatDate = (date, ad = false) => {
  var nDate = new Date(date);
  var carryOver = 0;
  if (ad) nDate = new Date(nDate.setMonth(nDate.getMonth() + 2));
  return (
    nDate.getDate() + '/' + (nDate.getMonth() + 1) + '/' + nDate.getFullYear()
  );
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

export const createFormData = (photo, body) => {
  const data = new FormData();

  //The name has to match the upload name on the backend, in this case 'avatar'
  data.append('avatar', {
    name: body.id,
    type: photo.type,
    uri:
      //Based on the OS of the device change the URI to match the needed pattern
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};

export const makeId = length => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
