/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../../styles/main.theme.js';
import {API_URL, getUpdatePaymentUrl} from '../../config/api';
import {formatDate, dateDiff} from '../../../utils/formatting';
import Button from '../../components/common/Button';

const axios = require('axios').default;

//Type definition for states of this class. Helps with type safety
type Props = {
  title: string,
  payment: number,
  owner: string,
  payed: boolean,
  date: string,
  id: string,
  type: string,
  isLoading: boolean,
  updatePayment: any,
  disabled: boolean,
};
type State = {};

export default class PaymentDetails extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  //Determines which Icon should be displayed by the payment button
  getIcon() {
    var result = '';

    if (this.props.type == 'Ad') {
      result = this.props.payed ? 'check' : '';
    } else {
      result = this.props.payed ? 'check' : '';
    }
    return result;
  }

  //Returns the due date for the payment
  getDate() {
    //Different format for an Ad payment
    if (this.props.type == 'Ad') {
      return formatDate(this.props.date, true);
    }
    return formatDate(this.props.date);
  }

  //Determine the screens properties based on the current item type
  getButtonText() {
    var result = '';

    if (this.props.type == 'Ad') {
      result = this.props.payed ? 'Payed' : 'Pending';
      if (dateDiff(this.props.date)) {
        if (this.props.payed) result = 'Escalated';
        else result = 'Escalate';
      }
    } else {
      result = this.props.payed ? 'Payed' : 'Pay';
    }
    return result;
  }

  componentDidMount() {}

  render() {
    const {
      isLoading,
      title,
      type,
      payment,
      owner,
      payed,
      date,
      updatePayment,
      disabled,
    } = this.props;
    5;
    if (this.props.isLoading) {
      return <View></View>;
    } else {
      return (
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.subtitleText}>{type}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Payment: {payment}</Text>
            <Text style={styles.contentText}>Due: {this.getDate()}</Text>
            <Text style={styles.contentText}>Owner: {owner}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={updatePayment}
              icon={this.getIcon()}
              disabled={disabled}
              text={this.getButtonText()}
              buttonStyle={{
                padding: 8,
                width: 120,
                borderRadius: 15,
                backgroundColor: theme.colors.primary,
              }}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    height: 250,
    margin: 15,
    borderRadius: 8,
    padding: theme.containerPadding,
  },

  titleContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'column',
  },

  contentContainer: {
    flex: 2,
    marginLeft: 15,
    justifyContent: 'center',
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  adButton: {borderRadius: 15, width: 120, borderWidth: 1},

  generalButton: {
    borderRadius: 15,
    width: 120,
    color: 'green',
  },

  titleText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.colors.textAlt,
  },
  contentText: {
    fontSize: theme.FONT_SIZE_LARGE,
    paddingTop: 5,
  },
});
