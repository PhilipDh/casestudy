/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {StyleSheet} from 'react-native';
import theme from './main.theme.js';

export default StyleSheet.create({
  btn: {
    padding: 10,
    borderWidth: 1,
  },
  card: {
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    margin: 10,
    height: 66,
    borderRadius: 4,
    elevation: 5,
  },
});
