import React, {Component} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

/*
  Radio Button group that will be displayed in
*/

//Type definition for states of this class. Helps with type safety
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
        <View style={styles.radioButtonGroup}>
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

const styles = StyleSheet.create({
  radioButtonGroup: {
    flexDirection: 'column',
  },
});
