/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../styles/main.theme.js';
import TextInput from '../../components/common/TextInput';
import {getArticleUrl, getCompaniesUrl, addAdUrl} from '../../config/api';
import Button from '../../components/common/Button';
import RouteNames from '../../RouteNames';

const axios = require('axios').default;

const topBannerAd = require('../../../assets/images/topBanner.png');
const inlineAd = require('../../../assets/images/inline.png');
const bottomBannerAd = require('../../../assets/images/bottomBanner.png');

type Props = {
  setTitle: any,
  setContent: any,
  setPayment: any,
  addAd: any,
  title: string,
  content: string,
  payment: number,
  company: string,
  availableCompanies: any,
  isLoading: boolean,
  setCompany: any,
};

export default class AddAd extends Component<Props> {
  constructor(props) {
    super(props);
  }

  //Render a Picker item for each item in the company list
  _renderCompanyPickerItem = item => {
    return <Picker.Item label={item.name} value={item.name} />;
  };

  componentDidMount() {}

  render() {
    const {
      setTitle,
      setContent,
      setPayment,
      addAd,
      title,
      content,
      payment,
      company,
      availableCompanies,
      isLoading,
      setCompany,
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
            <Text style={styles.textStyle}>Company</Text>
            <Picker
              selectedValue={company}
              style={{width: 300, height: 50, color: 'white'}}
              onValueChange={(itemValue, itemIndex) => setCompany(itemValue)}>
              {availableCompanies.map(item =>
                this._renderCompanyPickerItem(item),
              )}
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
              onPress={addAd}
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
