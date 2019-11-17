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
import theme from '../../../styles/main.theme.js';

class SectionedList extends Component {
  renderSectionHeader = section => (
    <View style={{}}>
      <Text style={styles.sectionText}>{section.title}</Text>
    </View>
  );

  _listEmptyComponent() {
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
        <SectionList
          //ItemSeparatorComponent={this.FlatListItemSeparator}
          ListEmptyComponent={this._listEmptyComponent()}
          sections={[
            {title: 'Ads', data: data.ads},
            {title: 'Articles', data: data.articles},
            {title: 'Photos', data: data.photos},
          ]}
          renderSectionHeader={({section}) => this.renderSectionHeader(section)}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={({_id}, index) => _id}
          //keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default SectionedList;

const styles = StyleSheet.create({
  rootContainer: {
    padding: theme.containerPadding,
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
  sectionText: {
    color: theme.colors.text,
    fontSize: 18,
    marginLeft: 10,
  },
});
