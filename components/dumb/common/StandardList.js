/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import theme from '../../../styles/main.theme';
import {TextInput, Snackbar, DefaultTheme} from 'react-native-paper';
import IssueItem from '../../IssueItem';

class StandardList extends Component {
  _listEmptyComponent() {
    console.log(this.props.reloadList);
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyListText}>There seems to be nothing here</Text>
        <Text style={styles.reloadText} onPress={() => this.props.reloadList()}>
          Reload
        </Text>
      </View>
    );
  }

  render() {
    const {
      updateSnackbar,
      showSnackbar,
      renderItem,
      data,
      ...extraProps
    } = this.props;
    return (
      <View style={styles.rootContainer}>
        <FlatList
          contentContainerStyle={styles.list}
          data={data}
          ListEmptyComponent={this._listEmptyComponent()}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={({_id}, index) => _id}
        />
        <Snackbar
          style={styles.snackbar}
          visible={showSnackbar}
          onDismiss={() => {
            updateSnackbar();
          }}
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

export default StandardList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: theme.containerPadding,
  },
  list: {
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
  snackbar: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.text,
  },
});
