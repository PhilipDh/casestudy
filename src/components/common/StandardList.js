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
import EmptyListComponent from './EmptyListComponent';

class StandardList extends Component {
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
          ListEmptyComponent={
            <EmptyListComponent reloadList={this.props.reloadList} />
          }
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
  snackbar: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.text,
  },
});
