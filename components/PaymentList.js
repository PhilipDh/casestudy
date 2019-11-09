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
      title: navigation.getParam('issueTitle', 'Titler'),
    };
  };

  constructor() {
    super();
    //console.info(this.props.navigation.getParam('issueTitle'), 'abc');
    this.state = {
      data: {},
      isLoading: true,
      id: '-1',
    };
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

  componentDidMount() {
    //TODO only update when the issue changes
    this.setState({id: this.props.screenProps.id}, function() {
      var pId = this.props.screenProps.id;
      (async () => {
        const response = await axios.get(
          'http://10.0.2.2:3000/payment/' + this.state.id,
        );
        this.setDataState(response.data);
      })();
      this.focusListener = this.props.navigation.addListener('didFocus', () => {
        console.log('Payment list now in focus');
        //this.forceUpdate();
      });
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}} />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SectionList
          //ItemSeparatorComponent={this.FlatListItemSeparator}
          sections={[
            {title: 'Ads', data: this.state.data.ads},
            {title: 'Articles', data: this.state.data.articles},
            {title: 'Photos', data: this.state.data.photos},
          ]}
          renderSectionHeader={({section}) => (
            <View style={{}}>
              <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
                {section.title}
              </Text>
            </View>
          )}
          renderItem={({item}) => (
            // Single Comes here which will be repeatative for the FlatListItems
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
      );
    }
  }
}

const style = StyleSheet.create({
  container: {
    padding: 5,
  },
});

/*


                <FlatList
          style={style.container}
          data={this.state.data}
          renderItem={({item}) => (
            <PaymentItem
              name={item.name}
              date={item.date}
              money={item.money}
              job={item.job}
              contributions={item.contributions}
              nav={this.navigateToDetail}
            />
          )}
          keyExtractor={({pId}, index) => pId}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'red',
                flex: 1,
              }}>
              <Text>There is nothing here</Text>
            </View>
          }
        />
        */
