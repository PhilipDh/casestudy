/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AdRadioButton from '../../components/AdRadioButton';
import theme from '../../../styles/main.theme.js';
import {getAdUrl} from '../../config/api';
import EditAdComponent from '../../components/Edit/EditAd';
const axios = require('axios').default;

type Props = {};
//Type definition for states of this class. Helps with type safety
type State = {
  isLoading: boolean,
  loading: boolean,
  placement: string,
  id: string,
  reloadList: any,
  payed: any,
};
export default class EditAdScreen extends Component<State, Props> {
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

  //Setter for the placement state
  setPlacement = placement =>
    this.setState({placement: placement}, () => this.updateAd()); //Once the state has been updated, execture updateAd()

  //Update the ad with the new placement data
  updateAd() {
    this.setState({loading: true});

    var url = getAdUrl(this.state.id);
    var body = {
      placement: this.state.placement,
      payed: this.state.payed.toString(),
    };

    axios
      .put(url, body)
      .then(data => {
        this.setState({
          isLoading: false,
          loading: false,
          placement: data.data.placement,
        });
        //Reloads the ad list
        this.state.reloadList();
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  //Gets the ad with the given id from the database
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
      <EditAdComponent
        setPlacement={this.setPlacement}
        placement={this.state.placement}
        isLoading={this.state.isLoading}
      />
    );
  }
}
