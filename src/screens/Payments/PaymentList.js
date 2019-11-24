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
import SectionedList from '../../components/common/SectionedList';
import {getPaymentsUrl} from '../../config/api';

const axios = require('axios').default;

type State = {
  data: any,
  isLoading: boolean,
  id: number,
  title: string,
  showSnackbar: boolean,
};
type Props = {data: any, isLoading: boolean, id: number, title: string};

export default class PaymentList extends Component<State, Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Payments',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      id: this.props.screenProps.issueTitle,
      title: this.props.screenProps.issueTitle,
      showSnackbar: false,
    };
    console.log(this.props.screenProps);
  }

  updateSnackbar = () => this.setState({showSnackbar: false});

  //Navigate to the detail screen of the clicked item
  //Will be passed onto the List items and called when clicked
  navigateToDetail = data => {
    //Determines the navigaton parameters for the details screen based on the type of payment that has been clicked
    var job = data.owner.job;
    var type = '';

    if (job == undefined) {
      type = 'Ad';
    } else if (job == 'Journalist') {
      type = 'Article';
    } else if (job == 'Photographer') {
      type = 'Photograph';
    }

    this.props.navigation.navigate(RouteNames.PaymentDetails, {
      id: data._id,
      type: type,
      date: this.props.screenProps.releaseDate,
    });
  };

  //Returns the list of all Payments for the current issue, based on the screenProp ID from the Issue screen
  getPaymentList = () => {
    //After the state has been set to the new ID get the payments
    this.setState({id: this.props.screenProps.id}, function() {
      var pId = this.props.screenProps.id;
      (async () => {
        try {
          const response = await axios.get(getPaymentsUrl(this.state.id));
          this.setState({data: response.data, isLoading: false});
        } catch (error) {
          this.setState({
            data: {ads: [], articles: [], photos: []},
            isLoading: false,
          });
        }
      })();
    });
  };

  componentDidMount() {
    this.getPaymentList();
    //Listener that will be called whenver the Payment list is in focus
    //It will load the payment list in case the issue has changed
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getPaymentList();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  //List item that should be rendered with the SectionList
  renderListItem = item => (
    <PaymentItem
      title={item.title}
      data={item}
      money={item.payment}
      name={item.owner.name}
      job={item.owner.job}
      navigateToDetail={this.navigateToDetail}
    />
  );

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SectionedList
          data={this.state.data}
          reloadList={this.getPaymentList}
          renderItem={this.renderListItem}
          updateSnackbar={this.updateSnackbar}
          showSnackbar={this.state.showSnackbar}
        />
      );
    }
  }
}
