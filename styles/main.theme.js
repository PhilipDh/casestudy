//Function that converts hex values into rgb
function convertHex(hex) {
  hex = hex.replace('#', '');
  var rgb = [];
  r = parseInt(hex.substring(0, 2), 16);
  g = parseInt(hex.substring(2, 4), 16);
  b = parseInt(hex.substring(4, 6), 16);

  rgb.push(r);
  rgb.push(g);
  rgb.push(b);
  return rgb;
}

//Default color, font size and container padding values
export default {
  colors: {
    primary: '#5d1049', //Primary color used for the app
    accent: '#fa3336', //Accent used to highlight different items
    surface: '#FFFFFF', //Color of the surfaces used
    background: '#5d1049',
    text: '#FFFFFF',
    textAlt: '#565656',
  },
  containerPadding: 5,
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_TITLE: 20,
  LIST_ITEM_PADDING: 24,

  //Calculates whether to display a white or black label based on the color(hex string) input
  setContrast(color) {
    var rgb = convertHex(color);
    var o = Math.round(
      (parseInt(rgb[0]) * 299 +
        parseInt(rgb[1]) * 587 +
        parseInt(rgb[2]) * 114) /
        1000,
    );
    var fore = o > 125 ? 'black' : 'white';
    return fore;
  },
};
