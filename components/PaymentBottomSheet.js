/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import {Button} from 'react-native-paper';
import {StackActions} from 'react-navigation';

type Props = {
  id: number,
  title: string,
  person: string,
  salary: number,
  payed: string,
  type: string,
};
type State = {};

export default class PaymentDetails extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};

    console.log(this.props.title);
  }

  render() {
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{this.props.title} </Text>
          <Text style={styles.subtitleText}> {this.props.type} </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.dataText}>Author: {this.props.person} </Text>
          <Text style={styles.dataText}>Salary: {this.props.salary}€ </Text>
          <Text style={styles.dataText}>Payed: {this.props.payed} </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={{borderRadius: 15, width: 80}}
            color="#5D1049"
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Pay
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    borderWidth: 0,
    borderColor: 'blue',

    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    borderWidth: 0,
    borderColor: 'red',
    marginLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    borderWidth: 0,
    marginTop: 5,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dataText: {
    marginBottom: 15,
    color: '#000000',
    fontSize: 16,
  },
  titleText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#BCBCBC',
    fontSize: 14,
  },
});
