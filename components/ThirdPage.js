/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';

export default class ThirdPage extends Component<{}> {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Page 3 </Text>
      </View>
    );
  }
}
