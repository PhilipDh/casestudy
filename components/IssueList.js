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
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import IssueItem from './IssueItem';

const axios = require('axios').default;

type State = {data: any, isLoading: boolean};
type Props = {data: any, isLoading: boolean};

export default class IssueList extends Component<State, Props> {
  constructor() {
    super();
    this.state = {
      data: {},
      isLoading: true,
    };
  }

  setDataState(data) {
    this.setState({data: data, isLoading: false});
  }

  componentDidMount() {
    (async () => {
      const response = await axios.get('http://10.0.2.2:3000/issue');
      this.setDataState(response.data);
    })();

    const dataJson = require('../assets/issueList.json');
    //this.setState({data: dataJson.issues, isLoading: false});
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
        <View>
          <FlatList
            style={styles.issueList}
            data={this.state.data}
            renderItem={({item}) => (
              <IssueItem
                title={item.title}
                date={item.releaseDate}
                id={item._id}
                updateContext={this.props.screenProps.updateContext}
              />
            )}
            keyExtractor={({_id}, index) => _id}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  issueList: {
    height: '100%',
    padding: 5,
  },
});
