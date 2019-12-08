/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../styles/main.theme.js';
import Button from './common/Button';
import {setPaymentFilter} from '../redux/actions/payment.action';
import {connect} from 'react-redux';

class PaymentHeaderButton extends Component {
  state = {
    text: 'All',
  };
  setFilter = () => {
    switch (this.props.paymentFilter.payed) {
      case 'ALL':
        this.props.setFilter('PAYED');
        this.setState({text: 'Payed'});
        break;
      case 'PAYED':
        this.props.setFilter('NOT_PAYED');
        this.setState({text: 'Not Payed'});
        break;
      case 'NOT_PAYED':
        this.props.setFilter('ALL');
        this.setState({text: 'All'});
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>{this.state.text}</Text>
        <Button
          onPress={this.setFilter}
          icon={'filter'}
          text={''}
          size={24}
          iconColor={'white'}
          buttonStyle={styles.button}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  paymentFilter: state.issue.paymentFilter,
});

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setPaymentFilter(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentHeaderButton);

const styles = StyleSheet.create({
  container: {marginRight: 30, flexDirection: 'row'},
  titleText: {
    color: theme.setContrast(theme.colors.primary),
  },
  button: {
    padding: 0,
    width: 30,
    marginRight: 0,
    borderRadius: 0,
    backgroundColor: theme.colors.primary,
  },
});
