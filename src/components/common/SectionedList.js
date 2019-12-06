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
  ActivityIndicator,
  StyleSheet,
  SectionList,
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import theme from '../../../styles/main.theme.js';
import EmptyListComponent from './EmptyListComponent';

/*
  Custom Section List that will be used as a component throughout the app
*/

type Props = {
  renderItem: any,
  data: any,
  sections: any,
  isLoading: any,
};
class SectionedList extends Component<Props> {
  renderSectionHeader = section => (
    <View style={{}}>
      <Text style={styles.sectionText}>{section.title}</Text>
    </View>
  );

  render() {
    const {renderItem, data, sections, isLoading, ...extraProps} = this.props;

    return (
      <View style={styles.rootContainer}>
        <SectionList
          //ItemSeparatorComponent={this.FlatListItemSeparator}
          ListEmptyComponent={
            <EmptyListComponent reloadList={this.props.reloadList} />
          }
          sections={sections()}
          renderSectionHeader={({section}) => this.renderSectionHeader(section)}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={({_id}, index) => _id}
          //keyExtractor={(item, index) => index}
        />
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }
}

export default SectionedList;

const styles = StyleSheet.create({
  rootContainer: {
    padding: theme.containerPadding,
    height: '100%',
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
