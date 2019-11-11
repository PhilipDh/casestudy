/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SectionList,
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import PaymentItem from './PaymentItem';

const axios = require('axios').default;

type State = {data: any, isLoading: boolean, id: number, title: string};
type Props = {data: any, isLoading: boolean, id: number, title: string};

export default class PaymentList extends Component<State, Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Payments',
    };
  };

  constructor(props) {
    super(props);
    //console.info(this.props.navigation.getParam('issueTitle'), 'abc');
    this.state = {
      data: {},
      isLoading: true,
      id: this.props.screenProps.issueTitle,
      title: this.props.screenProps.issueTitle,
    };
    console.log(this.props.screenProps);
  }

  navigateToDetail = data => {
    //this.props.navigation.setParams('data', inp);

    var job = data.owner.job;
    var type = '';

    if (job == undefined) {
      type = 'Ad';
    } else if (job == 'Journalist') {
      type = 'Article';
    } else if (job == 'Photographer') {
      type = 'Photograph';
    }

    this.props.navigation.navigate('Details', {
      id: data._id,
      type: type,
    });
  };

  setDataState(data) {
    this.setState({data: data, isLoading: false});
  }

  getPaymentList() {
    this.setState({id: this.props.screenProps.id}, function() {
      var pId = this.props.screenProps.id;
      (async () => {
        try {
          const response = await axios.get(
            'http://10.0.2.2:3000/payment/' + this.state.id,
          );
          this.setDataState(response.data);
        } catch (error) {
          this.setState({
            data: {ads: [], articles: [], photos: []},
            isLoading: false,
          });
        }
      })();
    });
  }

  _listEmptyComponent() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyListText}>There seems to be nothing here</Text>
        <Text style={styles.reloadText} onPress={() => this.getPaymentList()}>
          Reload
        </Text>
      </View>
    );
  }

  componentDidMount() {
    //TODO only update when the issue changes
    this.getPaymentList();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      console.log('Payment list now in focus');
      this.getPaymentList();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.rootContainer}>
          <SectionList
            //ItemSeparatorComponent={this.FlatListItemSeparator}
            ListEmptyComponent={this._listEmptyComponent()}
            sections={[
              {title: 'Ads', data: this.state.data.ads},
              {title: 'Articles', data: this.state.data.articles},
              {title: 'Photos', data: this.state.data.photos},
            ]}
            renderSectionHeader={({section}) => (
              <View style={{}}>
                <Text style={styles.sectionText}>{section.title}</Text>
              </View>
            )}
            renderItem={({item}) => (
              <PaymentItem
                title={item.title}
                data={item}
                money={item.payment}
                name={item.owner.name}
                job={item.owner.job}
                navigateToDetail={this.navigateToDetail}
              />
            )}
            keyExtractor={({_id}, index) => _id}
            //keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    color: 'white',
    fontSize: 20,
  },
  reloadText: {
    color: '#fa3336',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  sectionText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});
