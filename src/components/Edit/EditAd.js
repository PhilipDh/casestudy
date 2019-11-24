/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RadioButton, DefaultTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AdRadioButton from '../../components/AdRadioButton';
import theme from '../../../styles/main.theme.js';

const topBannerAd = require('../../../assets/images/topBanner.png');
const inlineAd = require('../../../assets/images/inline.png');
const bottomBannerAd = require('../../../assets/images/bottomBanner.png');

type Props = {
  setPlacement: any,
  placement: string,
  isLoading: boolean,
};

export default class EditAd extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {setPlacement, placement, isLoading} = this.props;
    return (
      <View style={styles.rootContainer}>
        <RadioButton.Group
          style={styles.radioButtonGroup}
          onValueChange={placement => {
            setPlacement(placement);
          }}
          value={placement}>
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
  radioButtonGroup: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
});
