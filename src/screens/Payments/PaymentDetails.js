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
import {connect} from 'react-redux';
import {
  getPaymentList,
  updatePayment,
  setPaymentStatus,
} from '../../redux/actions/payment.action';

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

class PaymentDetails extends Component<Props, State> {
  constructor(props) {
    super(props);
    //Initiallizing the different states
  }

  //Function that will update the payment for the current ad/article/photo
  updatePayment = () => {
    var content;
    if (this.props.data.type != 'Ad') {
      content = {
        payed: true,
        escalated: false,
      };
    } else {
      content = {
        payed: false,
        escalated: true,
      };
    }

    this.props.updatePayment(this.props.data._id, content);
    this.props.setPaymentStatus(content);
  };

  render() {
    //Show nothing while loading
    if (this.props.isLoading) {
      return <View></View>;
    } else {
      return (
        <PaymentDetailsComponent
          data={this.props.data}
          updatePayment={this.updatePayment}
          isLoading={this.props.isLoading}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoading: state.issue.isLoading,
  data: state.issue.currentPayment,
  errorMessage: state.issue.errorMessage,
});
const mapDispatchToProps = dispatch => ({
  setPaymentStatus: content => dispatch(setPaymentStatus(content)),
  updatePayment: (id, content) => dispatch(updatePayment(id, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
