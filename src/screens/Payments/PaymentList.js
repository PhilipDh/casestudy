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
import {connect} from 'react-redux';
import {getPaymentList} from '../../redux/actions/payment.action';
import {initCap} from '../../../utils/formatting';
import NetworkError from '../../components/common/NetworkError';

const axios = require('axios').default;

type State = {
  data: any,
  isLoading: boolean,
  id: number,
  title: string,
  showSnackbar: boolean,
};
type Props = {};

var prevId = 0;

class PaymentList extends Component<State, Props> {
  /*
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Payments',
    };
  };
  */

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      id: this.props.id,
      title: this.props.screenProps.issueTitle,
      showSnackbar: false,
    };
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
      date: this.props.date,
    });
  };

  //Returns the list of all Payments for the current issue, based on the screenProp ID from the Issue screen
  getPaymentList = () => {
    //After the state has been set to the new ID get the payments
    //this.setState({id: this.props.screenProps.id}, function() {
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
    //});
  };

  componentDidMount() {
    this.props.getPaymentList(this.props.id);
    //Listener that will be called whenver the Payment list is in focus
    //It will load the payment list in case the issue has changed
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      if (prevId != this.props.id) {
        this.props.getPaymentList(this.props.id);
        prevId = this.props.id;
      }
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  populateSections = () => {
    const result = [];
    const {data} = this.props;
    if (data)
      Object.keys(data).forEach(key => {
        if (key === 'issue') return;
        let row = {};
        row.title = initCap(key);
        row.data = data[key];
        result.push(row);
      });

    return result;
  };

  //List item that should be rendered with the SectionList
  renderListItem = item => {
    return (
      <PaymentItem
        title={item.title}
        data={item}
        money={item.payment}
        name={item.owner.name}
        job={item.owner.job}
        navigateToDetail={this.navigateToDetail}
      />
    );
  };

  render() {
    const {data, getPaymentList, isLoading, errorMessage} = this.props;
    return (
      <View>
        <SectionedList
          data={data}
          reloadList={getPaymentList}
          renderItem={this.renderListItem}
          sections={this.populateSections}
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
  id: state.issue.issueItem._id,
  date: state.issue.issueItem.releaseDate,
  isLoading: state.issue.isLoading,
  data: state.issue.paymentData,
  errorMessage: state.issue.errorMessage,
});
const mapDispatchToProps = dispatch => ({
  getPaymentList: id => dispatch(getPaymentList(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentList);

const styles = StyleSheet.create({
  networkMessage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
