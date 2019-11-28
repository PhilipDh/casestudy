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
import PaymentDetailsComponent from '../../components/Payments/PaymentDetails';

const axios = require('axios').default;

//Type definition for states of this class. Helps with type safety
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
    //Initiallizing the different states
    this.state = {
      isLoading: true,
      data: {},
      type: this.props.navigation.getParam('type'), //Set type to the parameter that was passed to the navigation action
      loading: false,
      disabled: false,
      id: this.props.navigation.getParam('id'), //Set id to the parameter that was passed to the navigation action
      date: this.props.navigation.getParam('date'), //Set date to the parameter that was passed to the navigation action
    };
  }

  //Function that will update the payment for the current ad/article/photo
  updatePayment = () => {
    this.setState({loading: true});
    //Build the request URL based on ID and type
    var url = getUpdatePaymentUrl(
      this.state.data._id,
      this.state.type.toLowerCase(),
    );
    var content = {payed: 'true'};

    //Perform put request and save the resulting data in state data
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

  //Once the component did mount get the information for the ad/article/photo from the database
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
    //Show nothing while loading
    if (this.state.isLoading) {
      return <View></View>;
    } else {
      return (
        <PaymentDetailsComponent
          title={this.state.data.title}
          type={this.state.type}
          payment={this.state.data.payment}
          owner={this.state.data.owner.name}
          payed={this.state.data.payed}
          date={this.state.date}
          id={this.state.data._id}
          updatePayment={this.updatePayment}
          isLoading={this.state.isLoading}
          disabled={this.state.disabled}
        />
      );
    }
  }
}
