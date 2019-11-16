/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  RadioButton,
  DefaultTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AdRadioButton from '../custom/AdRadioButton';
import theme from '../../styles/main.theme.js';
import {getAdUrl} from '../config/api';

const axios = require('axios').default;

const topBannerAd = require('../../assets/topBanner.png');
const inlineAd = require('../../assets/inline.png');
const bottomBannerAd = require('../../assets/bottomBanner.png');

type Props = {
  placement: any,
  isLoading: boolean,
  loading: boolean,
  placement: string,
  id: string,
  reloadList: any,
};
type State = {
  placement: any,
  isLoading: boolean,
  loading: boolean,
  placement: string,
  id: string,
  reloadList: any,
  payed: any,
};
export default class EditAd extends Component<State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loading: false,
      id: this.props.navigation.getParam('id'),
      placement: '',
      reloadList: this.props.navigation.getParam('reloadList'),
      payed: null,
    };
  }

  updateAd() {
    this.setState({loading: true});

    var url = getAdUrl(this.state.id);
    var body = {
      placement: this.state.placement,
      payed: this.state.payed,
    };

    //TODO SHow toast if content is empty -> error
    axios
      .put(url, body)
      .then(data => {
        this.setState({
          isLoading: false,
          loading: false,
          placement: data.data.placement,
        });
        this.state.reloadList();
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  getAd() {
    var url = getAdUrl(this.state.id);
    axios
      .get(url)
      .then(data => {
        this.setState({
          isLoading: false,
          loading: false,
          placement: data.data.placement,
          payed: data.data.payed,
        });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  componentDidMount() {
    this.getAd();
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <RadioButton.Group
          style={{width: '100%', borderWidth: 1, borderColor: 'black'}}
          onValueChange={placement => {
            this.setState({placement: placement}, function() {
              this.updateAd();
            });
          }}
          value={this.state.placement}>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.typeText}>Top Banner Ad</Text>
              <View style={styles.imageContainer}>
                <Image source={topBannerAd} style={styles.bannerImage} />
              </View>
            </View>
            <View style={styles.radioItemContainer}>
              <RadioButton
                theme={{...DefaultTheme, colors: {text: 'black'}}}
                value="topBanner"
              />
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.typeText}>Inline Ad</Text>
              <View style={styles.imageContainer}>
                <Image source={inlineAd} style={styles.bannerImage} />
              </View>
            </View>
            <View style={styles.radioItemContainer}>
              <RadioButton
                theme={{...DefaultTheme, colors: {text: 'black'}}}
                value="inlineBanner"
              />
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.typeText}>Bottom Banner Ad</Text>
              <View style={styles.imageContainer}>
                <Image source={bottomBannerAd} style={styles.bannerImage} />
              </View>
            </View>
            <View style={styles.radioItemContainer}>
              <RadioButton
                theme={{...DefaultTheme, colors: {text: 'black'}}}
                value="bottomBanner"
              />
            </View>
          </View>
        </RadioButton.Group>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    margin: 5,
    borderColor: 'red',
    borderWidth: 0,
  },
  cardContainer: {
    padding: 5,
    backgroundColor: theme.colors.surface,
    elevation: 5,
    borderRadius: 4,
    margin: 10,
    flexDirection: 'row',
  },
  radioItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 2,
  },
  typeText: {
    flex: 1.5,
  },
  bannerImage: {
    width: 120,
    height: 78,
  },
});
