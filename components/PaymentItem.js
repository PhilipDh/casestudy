/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import theme from '../styles/main.theme.js';

type Props = {
  title: string,
  name: string,
  money: number,
  job: string,
  navigateToDetail: any,
  data: any,
};

export default class PaymentItem extends Component<Props> {
  constructor() {
    super();
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigateToDetail(this.props.data);
        }}>
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{this.props.title}</Text>
            <Text style={styles.jobText}>{this.props.name}</Text>
          </View>
          <View style={styles.moneyContainer}>
            <Text
              style={
                this.props.job != undefined
                  ? styles.moneyTextPerson
                  : styles.moneyTextCompany
              }>
              {this.props.money}€
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  dateText: {
    color: '#565656',
    fontSize: 10,
    flex: 1,
  },
  moneyTextPerson: {
    color: '#B70000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  moneyTextCompany: {
    color: '#119200',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameText: {color: theme.colors.textAlt, fontSize: 16, fontWeight: 'bold'},
  jobText: {color: '#4B4B4B', fontSize: 12, marginTop: -2},
  container: {
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    margin: 5,
    height: 66,
    borderColor: 'red',
    borderWidth: 0,
    borderRadius: 4,
    elevation: 5,
  },
  nameContainer: {
    paddingLeft: 24,
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'center',
  },
  moneyContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 14,
    flexDirection: 'column',
  },
});

/*
      <TouchableWithoutFeedback onPress={() => console.log('log')}>
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{this.props.name}</Text>
            <Text style={styles.jobText}>{this.props.job}</Text>
          </View>
          <View style={styles.moneyContainer}>
            <Text style={styles.dateText}>{this.props.date}</Text>
            <Text style={styles.moneyText}>{this.props.money}€</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
*/
