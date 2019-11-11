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
  showSnackbar: boolean,
};

export default class EditList extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      id: '-1',
      data: {},
      isLoading: true,
      showSnackbar: false,
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
        this.setState({data: [], isLoading: false, showSnackbar: true});
        return null;
      });
  }

  reloadList = () => {
    this.getAdList();
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({id: this.props.screenProps.id});
    });
    this.getAdList();
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  navigateToDetail = id => {
    console.log('navved');
    this.props.navigation.navigate('EditAd', {
      id: id,
      reloadList: this.reloadList,
    });
  };

  _listEmptyComponent() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyListText}>There seems to be nothing here</Text>
        <Text style={styles.reloadText} onPress={() => this.getAdList()}>
          Reload
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.rootContainer}>
          <Text> {this.props.screenProps.id} </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.rootContainer}>
          <FlatList
            contentContainerStyle={styles.rootContainer}
            ListEmptyComponent={this._listEmptyComponent()}
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
  rootContainer: {flex: 1, margin: 5},
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
});
