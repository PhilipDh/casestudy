/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../styles/main.theme';
import common from '../../styles/common.style';
type Props = {
  id: string,
  title: string,
  content: string,
  navigateToEdit: any,
};

export default class EditListItem extends Component<State, Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigateToEdit(this.props.id)}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}> {this.props.title}</Text>
            <Text numberOfLines={1} style={styles.subtitleText}>
              {this.props.content}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    color: theme.setContrast(theme.colors.surface),
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: theme.colors.textAlt,
    fontSize: theme.FONT_SIZE_SMALL,
  },
  container: {
    ...common.card,
  },
  contentContainer: {
    paddingLeft: theme.LIST_ITEM_PADDING,
    paddingRight: theme.LIST_ITEM_PADDING,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
});
