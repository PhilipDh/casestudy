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
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableRipple} from 'react-native-paper';
import theme from '../../styles/main.theme';
import common from '../../styles/common.style';
import {formatDate} from '../../utils/formatting';

type Props = {
  title: string,
  date: string,
  id: string,
  updateContext: any,
  setTitle: any,
};

export default class IssueItem extends Component<Props> {
  render() {
    return (
      <TouchableRipple
        rippleColor={'white'}
        onPress={() => {
          this.props.updateContext(this.props.title, this.props.id);
          this.props.setTitle(this.props.title);
        }}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/hbr.png')}
              style={styles.itemImage}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.issueText}>{this.props.title}</Text>
          </View>
          <View style={styles.dateIconTextContainer}>
            <View style={styles.dateIconTextInnerContainer}>
              <Icon
                name="calendar-o"
                color="#565656"
                size={12}
                style={{padding: 2}}
              />
              <Text style={styles.dateText}>{formatDate(this.props.date)}</Text>
            </View>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  dateText: {
    color: theme.colors.textAlt,
    fontSize: theme.FONT_SIZE_SMALL,
  },
  itemImage: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: 'red',
  },
  issueText: {
    color: theme.setContrast(theme.colors.surface),
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  container: {
    ...common.card,
  },
  textContainer: {
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 4,
  },
  imageContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 5,
  },
  dateIconTextContainer: {
    paddingRight: 10,
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dateIconTextInnerContainer: {
    flexDirection: 'row',
  },
});
