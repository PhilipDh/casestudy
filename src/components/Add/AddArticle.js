/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
//import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../styles/main.theme.js';
import TextInput from '../../components/common/TextInput';
import {getArticleUrl, getPeopleUrl, addArticleUrl} from '../../config/api';
import Button from '../../components/common/Button';
import RouteNames from '../../RouteNames';

const axios = require('axios').default;

type Props = {
  setTitle: any,
  setContent: any,
  setPayment: any,
  addArticle: any,
  title: string,
  content: string,
  payment: number,
  owner: string,
  setOwner: any,
  availablePeople: any,
  isLoading: boolean,
  setCompany: any,
};

export default class AddArticle extends Component<Props> {
  constructor(props) {
    super(props);
  }

  _renderPeoplePickerItem = item => {
    return <Picker.Item label={item.name} value={item.name} />;
  };

  render() {
    const {
      setTitle,
      setContent,
      setPayment,
      setOwner,
      addArticle,
      owner,
      availablePeople,
      title,
      content,
      payment,
      isLoading,
    } = this.props;

    if (isLoading) {
      return <View></View>;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TextInput
              text={title}
              label={'Title'}
              onTextChange={setTitle}
              secure={false}
              multiline={false}
            />
          </View>

          <View style={styles.contentContainer}>
            <TextInput
              text={content}
              label={'Content'}
              onTextChange={setContent}
              secure={false}
              multiline={true}
            />
          </View>

          <View style={styles.contentContainer}>
            <TextInput
              keyboardType="numeric"
              text={payment}
              label={'Payment'}
              onTextChange={setPayment}
              secure={false}
              multiline={true}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.textStyle}>Journalist</Text>
            <Picker
              selectedValue={owner}
              style={{width: 300, height: 50, color: 'white'}}
              onValueChange={(itemValue, itemIndex) => setOwner(itemValue)}>
              {availablePeople.map(item => this._renderPeoplePickerItem(item))}
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={{
                padding: 8,
                width: 120,
                borderRadius: 4,
                backgroundColor: theme.colors.accent,
              }}
              text={'Save'}
              onPress={addArticle}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  saveButton: {},
  titleContainer: {},
  contentContainer: {},
  pickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  textStyle: {
    color: theme.setContrast(theme.colors.primary),
    fontSize: theme.FONT_SIZE_LARGE,
  },
});
