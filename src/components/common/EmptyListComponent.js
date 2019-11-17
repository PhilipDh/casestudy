import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import theme from '../../../styles/main.theme';

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
});
