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
//import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import theme from '../../../styles/main.theme.js';
import {API_URL, getUpdatePaymentUrl} from '../../config/api';
import {formatDate, dateDiff} from '../../../utils/formatting';
import Button from '../../components/common/Button';

const axios = require('axios').default;

type Props = {
  data: any,
  id: string,
  type: string,
};
type State = {
  data: any,
  type: string,
  id: string,
  loading: boolean,
  disabled: boolean,
  isLoading: boolean,
  date: string,
};

export default class PaymentDetails extends Component<Props, State> {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('person', 'Details'),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: {},
      type: this.props.navigation.getParam('type'),
      loading: false,
      disabled: false,
      id: this.props.navigation.getParam('id'),
      date: this.props.navigation.getParam('date'),
    };
  }

  //Determines which Icon should be displayed by the payment button
  getIcon() {
    var result = '';

    if (this.state.type == 'Ad') {
      result = this.state.data.payed ? 'check' : '';
    } else {
      result = this.state.data.payed ? 'check' : '';
    }
    return result;
  }

  //Returns the due date for the payment
  getDate() {
    //Different format for an Ad payment
    if (this.state.type == 'Ad') {
      return formatDate(this.state.date, true);
    }
    return formatDate(this.state.date);
  }

  //Determine the screens properties based on the current item type
  getButtonText() {
    var result = '';

    if (this.state.type == 'Ad') {
      result = this.state.data.payed ? 'Payed' : 'Pending';
      if (dateDiff(this.state.date)) {
        result = 'Escalate';
      }
    } else {
      result = this.state.data.payed ? 'Payed' : 'Pay';
    }
    return result;
  }

  updatePayment = () => {
    this.setState({loading: true});
    //Build the request URL based on ID and type
    var url = getUpdatePaymentUrl(
      this.state.data._id,
      this.state.type.toLowerCase(),
    );
    var content = {payed: 'true'};

    axios
      .put(url, content)
      .then(data => {
        this.setState({
          loading: false,
          data: data.data,
          disabled: data.data.payed,
        });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };

  componentDidMount() {
    var url =
      API_URL + '/' + this.state.type.toLowerCase() + '/' + this.state.id;

    axios
      .get(url)
      .then(data => {
        this.setState(
          {data: data.data, isLoading: false, disabled: data.data.payed},
          function() {
            //If the details page is an ad change the button based on the status of the payment
            if (this.state.type == 'Ad') {
              if (dateDiff(this.state.date)) this.setState({disabled: false});
              else this.setState({disabled: true});
            }
          },
        );
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  render() {
    if (this.state.isLoading) {
      return <View></View>;
    } else {
      console.log(this.state.data);
      return (
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{this.state.data.title}</Text>
            <Text style={styles.subtitleText}>{this.state.type}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              Payment: {this.state.data.payment}
            </Text>
            <Text style={styles.contentText}>Due: {this.getDate()}</Text>
            <Text style={styles.contentText}>
              Owner: {this.state.data.owner.name}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.updatePayment}
              icon={this.getIcon()}
              disabled={this.state.disabled}
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
