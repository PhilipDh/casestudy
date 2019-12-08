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
  isLoading: boolean,
  updatePayment: any,
  data: any,
};
type State = {};

export default class PaymentDetails extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  //Determines which Icon should be displayed by the payment button
  getIcon() {
    var result = '';

    if (this.props.data.type == 'Ad') {
      result = this.props.data.payed ? 'check' : '';
    } else {
      result = this.props.data.payed ? 'check' : '';
    }
    return result;
  }

  //Determine the screens properties based on the current item type
  getButtonText() {
    var result = '';

    if (this.props.data.type == 'Ad') {
      result = this.props.data.payed ? 'Payed' : 'Pending';
      var now = new Date();
      if (now > new Date(this.props.data.due) && !this.props.data.payed) {
        result = this.props.data.escalated ? 'Escalated' : 'Escalate';
      }
    } else {
      result = this.props.data.payed ? 'Payed' : 'Pay';
    }
    return result;
  }

  getTitle() {
    switch (this.props.data.type) {
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

  getOwner() {
    return this.props.data.type == 'Ad'
      ? this.props.data.debtor.name
      : this.props.data.payee.name;
  }

  isDisabled() {
    if (
      this.props.data.payed ||
      this.props.data.escalated ||
      this.props.data.type == 'Ad'
    )
      return true;
    return false;
  }

  componentDidMount() {}

  render() {
    if (this.props.isLoading) {
      return <View></View>;
    } else {
      const {type, amount, payed, due} = this.props.data;
      return (
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{this.getTitle()}</Text>
            <Text style={styles.subtitleText}>{type}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Payment: {amount}</Text>
            <Text style={styles.contentText}>Due: {due}</Text>
            <Text style={styles.contentText}>Owner: {this.getOwner()}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.props.updatePayment}
              icon={this.getIcon()}
              disabled={this.isDisabled()}
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
