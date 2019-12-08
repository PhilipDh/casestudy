/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import PaymentItem from '../../components/PaymentItem';
import theme from '../../../styles/main.theme.js';
import RouteNames from '../../RouteNames';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import SectionedList from '../../components/common/SectionedList';
import StandardList from '../../components/common/StandardList';
import PaymentHeaderButton from '../../components/PaymentHeaderButton';
import {getPaymentsUrl} from '../../config/api';
import {connect} from 'react-redux';
import {
  getPaymentList,
  setCurrentPayment,
  setPaymentFilter,
} from '../../redux/actions/payment.action';
import {getPayments} from '../../redux/selectors/payment.selectors';
import {initCap} from '../../../utils/formatting';
import NetworkError from '../../components/common/NetworkError';

const axios = require('axios').default;

type Props = {};

var prevId = 0;

class PaymentList extends Component<State, Props> {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => {
        return <PaymentHeaderButton />;
      },
    };
  };
  constructor(props) {
    super(props);
  }

  //Navigate to the detail screen of the clicked item
  //Will be passed onto the List items and called when clicked
  navigateToDetail = () => {
    //Determines the navigaton parameters for the details screen based on the type of payment that has been clicked
    this.props.navigation.navigate(RouteNames.PaymentDetails, {});
  };

  componentDidMount() {
    this.props.getPaymentList();
  }

  //List item that should be rendered with the SectionList
  renderListItem = item => {
    return (
      <PaymentItem
        data={item}
        amount={item.amount}
        navigateToDetail={this.navigateToDetail}
        type={item.type}
        setCurrentPayment={this.props.setCurrentPayment}
      />
    );
  };

  render() {
    const {data, getPaymentList, isLoading, errorMessage} = this.props;

    return (
      <View>
        <StandardList
          data={data}
          reloadList={getPaymentList}
          renderItem={this.renderListItem}
          isLoading={isLoading}
        />
        {errorMessage !== '' && (
          <View style={styles.networkMessage}>
            <NetworkError message={errorMessage} />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.issue.isLoading,
  data: getPayments(state),
  errorMessage: state.issue.errorMessage,
  paymentFilter: state.issue.paymentFilter,
});
const mapDispatchToProps = dispatch => ({
  getPaymentList: () => dispatch(getPaymentList()),
  setCurrentPayment: data => dispatch(setCurrentPayment(data)),
  setFilter: filter => dispatch(setPaymentFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentList);

const styles = StyleSheet.create({
  networkMessage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
