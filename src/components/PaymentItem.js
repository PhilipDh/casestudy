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

//Type definition for props of this class. Helps with type safety
type Props = {
  amount: number,
  navigateToDetail: any,
  data: any,
  type: string,
  setCurrentPayment: any,
};

/*
  Payment List item that will be used in Payment Lists
*/
export default class PaymentItem extends Component<Props> {
  getName() {
    return this.props.type == 'Ad'
      ? this.props.data.debtor.name
      : this.props.data.payee.name;
  }

  getTitle() {
    switch (this.props.type) {
      case 'Ad':
        return this.props.data.ad.title;
      case 'Article':
        return this.props.data.article.title;
      case 'Photograph':
        return this.props.data.photo.title;
      default:
        break;
    }
  }

  render() {
    const {data, title, name, job, amount, type} = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.setCurrentPayment(data);
          this.props.navigateToDetail(data);
        }}>
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{this.getName()}</Text>
            <Text style={styles.jobText}>{this.getTitle()}</Text>
          </View>
          <View style={styles.moneyContainer}>
            <Text
              style={
                type != 'Ad' ? styles.moneyTextPerson : styles.moneyTextCompany
              }>
              {amount}€
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
