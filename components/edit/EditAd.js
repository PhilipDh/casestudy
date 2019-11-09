/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Avatar, Button, Card, Title, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AdRadioButton from '../custom/AdRadioButton';
const axios = require('axios').default;

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

    var url = 'http://10.0.2.2:3000/ad/' + this.state.id;
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
    var url = 'http://10.0.2.2:3000/ad/' + this.state.id;
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
                <Image
                  source={require('../../assets/topBanner.png')}
                  style={styles.bannerImage}
                />
              </View>
            </View>
            <View style={styles.radioItemContainer}>
              <RadioButton value="topBanner" />
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.typeText}>Inline Ad</Text>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/inline.png')}
                  style={styles.bannerImage}
                />
              </View>
            </View>
            <View style={styles.radioItemContainer}>
              <RadioButton value="inlineBanner" />
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.typeText}>Bottom Banner Ad</Text>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/bottomBanner.png')}
                  style={styles.bannerImage}
                />
              </View>
            </View>
            <View style={styles.radioItemContainer}>
              <RadioButton value="bottomBanner" />
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
    backgroundColor: '#FFFFFF',
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
