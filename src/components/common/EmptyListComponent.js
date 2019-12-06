import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import theme from '../../../styles/main.theme';

/*
  EmptyListComponent that will be displayed whenver a list is empty
  Offers a reload option
*/
class EmptyListComponent extends Component {
  render() {
    const {reloadList} = this.props;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyListText}>There seems to be nothing here</Text>
        <Text style={styles.reloadText} onPress={() => reloadList()}>
          Reload
        </Text>
      </View>
    );
  }
}

export default EmptyListComponent;

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
});
