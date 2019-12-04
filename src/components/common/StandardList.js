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
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import theme from '../../../styles/main.theme';
import {TextInput, Snackbar, DefaultTheme} from 'react-native-paper';
import EmptyListComponent from './EmptyListComponent';

/*
  Custom FlatList that will be used throughout the app to keep a consistent look
*/

type Props = {
  updateSnackbar: any,
  showSnackbar: any,
  renderItem: any,
  data: any,
  isLoading: boolean,
};
class StandardList extends Component<Props> {
  render() {
    const {
      updateSnackbar,
      showSnackbar,
      renderItem,
      data,
      isLoading,
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
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }
}

export default StandardList;

const styles = StyleSheet.create({
  rootContainer: {
    padding: theme.containerPadding,
    height: '100%',
  },
  list: {},
  snackbar: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.text,
    justifyContent: 'flex-end',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5d104988',
  },
});
