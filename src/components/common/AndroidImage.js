/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import PropTypes from 'prop-types';
import {requireNativeComponent, ViewPropTypes} from 'react-native';

//Returns the Native Component defined in the Android directory
//Accepts the properties src, borderRadius, resizeMode and the general properties of a View
const iface = {
  name: 'ImageView',
  propTypes: {
    src: PropTypes.string,
    borderRadius: PropTypes.number,
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch']),
    ...ViewPropTypes, // include the default view properties
  },
};

module.exports = requireNativeComponent('RCTImageView1', iface);
