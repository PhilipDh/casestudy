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
import {Snackbar, withTheme} from 'react-native-paper';
import IssueItem from './IssueItem';
import theme from '../styles/main.theme.js';

const axios = require('axios').default;

type State = {data: any, isLoading: boolean, showSnackbar: boolean};
type Props = {data: any, isLoading: boolean};

class IssueList extends Component<State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      showSnackbar: false,
    };
  }

  setDataState(data) {
    this.setState({data: data, isLoading: false});
  }

  componentDidMount() {
    this.getIssueList();
  }

  getIssueList() {
    (async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/issue');
        this.setDataState(response.data);
      } catch (erorr) {
        this.setState({isLoading: false, data: [], showSnackbar: true});
      }
    })();
  }

  setTitle = title => {
    this.props.navigation.setParams({title: title});
  };

  _listEmptyComponent() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyListText}>There seems to be nothing here</Text>
        <Text style={styles.reloadText} onPress={() => this.getIssueList()}>
          Reload
        </Text>
      </View>
    );
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
          <FlatList
            contentContainerStyle={styles.rootContainer}
            style={styles.issueList}
            data={this.state.data}
            ListEmptyComponent={this._listEmptyComponent()}
            renderItem={({item}) => (
              <IssueItem
                title={item.title}
                date={item.releaseDate}
                id={item._id}
                updateContext={this.props.screenProps.updateContext}
                setTitle={this.setTitle}
              />
            )}
            keyExtractor={({_id}, index) => _id}
          />
          <Snackbar
            style={styles.snackbar}
            visible={this.state.showSnackbar}
            onDismiss={() => this.setState({showSnackbar: false})}
            action={{
              label: 'Undo',
              onPress: () => {
                // Do something
              },
            }}>
            Network Error
          </Snackbar>
        </View>
      );
    }
  }
}

export default withTheme(IssueList);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    color: theme.colors.text,
    fontSize: 20,
  },
  reloadText: {
    color: theme.colors.accent,
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  issueList: {
    padding: 5,
  },
  snackbar: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.text,
  },
});
