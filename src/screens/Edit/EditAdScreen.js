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
import {connect} from 'react-redux';
import {updateAd, setAdPlacement} from '../../redux/actions/issue.actions';

const axios = require('axios').default;

type Props = {};
//Type definition for states of this class. Helps with type safety
type State = {};
class EditAdScreen extends Component<State, Props> {
  constructor(props) {
    super(props);
  }

  //Setter for the placement state
  setPlacement = placement => this.props.setAdPlacement(placement); //Once the state has been updated, execture updateAd()

  //Update the ad with the new placement data
  updateAd = () => {
    var body = {
      placement: this.props.data.placement,
      issueId: this.props.issueId,
    };
    this.props.updateAd(this.props.data._id, body);
    this.props.navigation.goBack();
  };

  render() {
    if (this.props.isLoading) {
      return <View></View>;
    } else {
      return (
        <EditAdComponent
          setPlacement={this.setPlacement}
          placement={this.props.data.placement}
          isLoading={this.props.isLoading}
          updateAd={this.updateAd}
        />
      );
    }
  }
}

//States from the redux store that should be mapped to props in this component
const mapStateToProps = state => ({
  data: state.issue.currentAd,
  issueId: state.issue.currentIssue._id,
  isLoading: state.issue.isLoading,
});

//Actions that should be mapped to props in this component
const mapDispatchToProps = dispatch => ({
  updateAd: (id, content) => dispatch(updateAd(id, content)),
  setAdPlacement: placement => dispatch(setAdPlacement(placement)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAdScreen);
