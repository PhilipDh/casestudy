/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../../styles/main.theme.js';
import {connect} from 'react-redux';

class NetworkError extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.props.message}</Text>
      </View>
    );
  }
}

export default NetworkError;

const styles = StyleSheet.create({
  titleText: {
    color: theme.setContrast(theme.colors.primary),
    fontSize: 10,
    marginLeft: 15,
  },
  container: {
    backgroundColor: '#4E0D3A',

    alignItems: 'center',
  },
});
