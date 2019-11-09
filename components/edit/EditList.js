/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import {Button} from 'react-native-paper';
import EditListItem from './EditListItem';
import DraggableFlatList from 'react-native-draggable-flatlist';
const axios = require('axios').default;

type Props = {
  data: any,
  id: string,
  isLoading: boolean,
};

type State = {
  data: any,
  id: string,
  isLoading: boolean,
};

export default class EditList extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      id: '-1',
      data: {},
      isLoading: true,
    };
  }

  getAdList() {
    var url = 'http://10.0.2.2:3000/ad/' + this.props.screenProps.id + '/ad';
    console.log(url);
    axios
      .get(url)
      .then(data => {
        this.setState({data: data.data, isLoading: false}, function() {
          console.log(this.state.data);
        });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  reloadList = () => {
    this.getAdList();
  };

  componentDidMount() {
    this.getAdList();
  }

  navigateToDetail = id => {
    console.log('navved');
    this.props.navigation.navigate('EditAd', {
      id: id,
      reloadList: this.reloadList,
    });
  };

  componentWillUnmount() {
    // Remove the event listener
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text> {this.props.screenProps.id} </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <EditListItem
                title={item.title}
                content={item.content}
                id={item._id}
                navigateToEdit={this.navigateToDetail}
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
  container: {height: '100%', margin: 10},
});
