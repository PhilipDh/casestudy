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
    color: theme.colors.textAlt,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#4B4B4B',
    fontSize: 12,
  },
  container: {
    ...common.card,
    borderColor: 'red',
    borderWidth: 0,
  },
  contentContainer: {
    paddingLeft: 36,
    paddingRight: 36,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
});

/*
      <TouchableWithoutFeedback onPress={() => console.log('log')}>
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{this.props.name}</Text>
            <Text style={styles.jobText}>{this.props.job}</Text>
          </View>
          <View style={styles.moneyContainer}>
            <Text style={styles.dateText}>{this.props.date}</Text>
            <Text style={styles.moneyText}>{this.props.money}€</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
*/
