import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

type State = {
  value: any,
};

export default class AdRadioButton extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <RadioButton.Group
        onValueChange={value => this.setState({value})}
        value={this.state.value}>
        <View style={{flexDirection: 'column'}}>
          <Text>First</Text>
          <RadioButton value="first" />
        </View>
        <View>
          <Text>Second</Text>
          <RadioButton value="second" />
        </View>
      </RadioButton.Group>
    );
  }
}
