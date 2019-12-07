/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../styles/main.theme.js';
import {connect} from 'react-redux';

class Title extends Component {
  render() {
    return <Text style={styles.titleText}>{this.props.title}</Text>;
  }
}

const mapStateToProps = state => ({
  title: state.issue.currentIssue.title,
});

export default connect(mapStateToProps)(Title);

const styles = StyleSheet.create({
  titleText: {
    color: theme.setContrast(theme.colors.primary),
    fontSize: theme.FONT_SIZE_TITLE,
    marginLeft: 15,
  },
});
