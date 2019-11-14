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

export default {
  colors: {
    primary: '#5d1049',
    accent: '#fa3336',
    surface: '#FFFFFF',
    background: '#5d1049',
    text: '#FFFFFF',
    textAlt: '#000000',
  },
  containerPadding: 5,
  //Calculates whether to display a white or black label based on the color(hex string) input
  setContrast(color) {
    // http://www.w3.org/TR/AERT#color-contrast
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

//#5d1049
//#fa3336
