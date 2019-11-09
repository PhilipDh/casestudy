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
import PaymentDetails from './PaymentDetails';

type Props = {
  type: string,
  title: string,
  money: number,
  payed: boolean,
  job: string,
  type: string,
  extendBottomSheet: any,
};

export default class PaymentDetailsItem extends Component<Props> {
  constructor(props) {
    super(props);

    console.log(this.props.title);
  }

  render() {
    //console.log(this.props.title);
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.extendBottomSheet(
              0,
              this.props.title,
              this.props.person,
              this.props.money,
              '10/10/19',
              this.props.type,
            );
          }}>
          <View style={styles.container}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{this.props.title}</Text>
              <Text style={styles.jobText}>{this.props.type}</Text>
            </View>
            <View style={styles.moneyContainer}>
              <Text
                style={
                  this.props.job != 'Company'
                    ? styles.moneyTextPerson
                    : styles.moneyTextCompany
                }>
                {this.props.money}€
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
  nameText: {color: '#000000', fontSize: 16, fontWeight: 'bold'},
  jobText: {color: '#4B4B4B', fontSize: 12, marginTop: -5},
  container: {
    backgroundColor: '#FFFFFF',
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
    paddingLeft: 36,
    flexDirection: 'column',
    flex: 1,
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
