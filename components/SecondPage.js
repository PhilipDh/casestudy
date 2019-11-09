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
import {Button} from 'react-native-paper';

type Props = {
  id: number,
};

export default class SecondPage extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      id: -1,
    };
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Page 2 </Text>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => {
            //this.props.screenProps.updateContext();

            console.info(
              'Current Issue id: ' + this.props.navigation.getParam('id', 0),
            );
          }}>
          Press me
        </Button>
        <View></View>
      </View>
    );
  }
}
