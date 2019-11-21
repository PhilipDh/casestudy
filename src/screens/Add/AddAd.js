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
import {getArticleUrl, getCompaniesUrl, addAdUrl} from '../../config/api';
import Button from '../../components/common/Button';
import RouteNames from '../../RouteNames';

const axios = require('axios').default;

const topBannerAd = require('../../../assets/images/topBanner.png');
const inlineAd = require('../../../assets/images/inline.png');
const bottomBannerAd = require('../../../assets/images/bottomBanner.png');

type Props = {};
type State = {content: string, title: string, payment: number};
export default class AddAd extends Component<State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.navigation.getParam('id'),
      content: '',
      title: '',
      payment: '',
      company: '',
      availableCompanies: {},
      reloadList: this.props.navigation.getParam('reloadList'),
    };
  }

  setTitle = text => this.setState({title: text});

  setContent = text => this.setState({content: text});

  setPayment = text => this.setState({payment: text});

  //Add a new ad to the current issue
  addAd = () => {
    //If the title,content or payment field is empty throw an error
    //If the payment is Not a Number (NaN) it will throw an error
    if (
      this.state.title &&
      this.state.content &&
      !isNaN(this.state.payment) &&
      this.state.payment
    ) {
      let url = addAdUrl(this.state.id);
      let content = {
        title: this.state.title,
        content: this.state.content,
        payment: this.state.payment,
        owner: this.state.company,
      };
      axios
        .post(url, content)
        .then(data => {
          this.state.reloadList();
          this.props.navigation.goBack();
          this.props.navigation.navigate(RouteNames.EditAd, {
            id: data.data._id,
            reloadList: this.state.reloadList,
          });
        })
        .catch(err => {
          //this.setState({data: [], isLoading: false, showSnackbar: true});
          console.log(err);
          return null;
        });
    } else {
      alert('Fields cant be empty');
    }
  };

  //Get a list of all the companies that can request an ad
  getCompanies = () => {
    let url = getCompaniesUrl();
    axios
      .get(url)
      .then(data => {
        this.setState(
          {availableCompanies: data.data, isLoading: false},
          function() {
            console.log(this.state.availableCompanies);
          },
        );
      })
      .catch(err => {
        this.setState({data: [], isLoading: false});
        return null;
      });
  };

  //Render a Picker item for each item in the company list
  _renderCompanyPickerItem = item => {
    return <Picker.Item label={item.name} value={item.name} />;
  };

  componentDidMount() {
    this.getCompanies();
  }

  render() {
    if (this.state.isLoading) {
      return <View></View>;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TextInput
              text={this.state.title}
              label={'Title'}
              onTextChange={this.setTitle}
              secure={false}
              multiline={false}
            />
          </View>

          <View style={styles.contentContainer}>
            <TextInput
              text={this.state.content}
              label={'Content'}
              onTextChange={this.setContent}
              secure={false}
              multiline={true}
            />
          </View>

          <View style={styles.contentContainer}>
            <TextInput
              keyboardType="numeric"
              text={this.state.payment}
              label={'Payment'}
              onTextChange={this.setPayment}
              secure={false}
              multiline={true}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={this.state.company}
              style={{width: 300, height: 50, color: 'white'}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({company: itemValue})
              }>
              {this.state.availableCompanies.map(item =>
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
              onPress={this.addAd}
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
});
