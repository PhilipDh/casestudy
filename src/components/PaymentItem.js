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
import theme from '../../styles/main.theme.js';
import common from '../../styles/common.style.js';

type Props = {
  title: string,
  name: string,
  money: number,
  job: string,
  navigateToDetail: any,
  data: any,
};

/*
  Payment List item that will be used in Payment Lists
*/
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
  moneyTextPerson: {
    color: '#B70000',
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  moneyTextCompany: {
    color: '#119200',
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  nameText: {
    color: theme.setContrast(theme.colors.surface),
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  jobText: {
    color: theme.colors.textAlt,
    fontSize: theme.FONT_SIZE_SMALL,
    marginTop: -2,
  },
  container: {
    ...common.card,
    paddingLeft: theme.LIST_ITEM_PADDING,
    paddingRight: theme.LIST_ITEM_PADDING,
  },
  nameContainer: {
    flexDirection: 'column',
    flex: 2,
    justifyContent: 'center',
  },
  moneyContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
