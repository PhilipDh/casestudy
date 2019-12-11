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
import AddAdComponent from '../../components/Add/AddAd';
import {connect} from 'react-redux';
import {addAdToIssue} from '../../redux/actions/issue.actions';

const axios = require('axios').default;

const topBannerAd = require('../../../assets/images/topBanner.png');
const inlineAd = require('../../../assets/images/inline.png');
const bottomBannerAd = require('../../../assets/images/bottomBanner.png');

type Props = {};
//Type definition for states of this class. Helps with type safety
type State = {
  content: string,
  title: string,
  payment: number,
  setTitle: any,
  setContent: any,
  setPayment: any,
};
class AddAdScreen extends Component<State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      content: '',
      title: '',
      payment: '',
      company: '',
      availableCompanies: {},
    };
  }

  //Setters for the different states
  setTitle = text => this.setState({title: text});
  setContent = text => this.setState({content: text});
  setPayment = text => this.setState({payment: text});
  setCompany = text => this.setState({company: text});

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
      //Set the due date to two month from when the issue releases
      let dueDate = new Date(this.props.currentIssue.releaseDate);
      dueDate = new Date(dueDate.setMonth(dueDate.getMonth() + 2));

      let content = {
        title: this.state.title,
        content: this.state.content,
        amount: this.state.payment,
        owner: this.state.company,
        due:
          dueDate.getFullYear() +
          '-' +
          (dueDate.getMonth() + 1) +
          '-' +
          dueDate.getDate(),
      };

      //Make a post request to the given URL with the content
      this.props.addAdToIssue(this.props.currentIssue._id, content);
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
        this.setState({
          availableCompanies: data.data,
          isLoading: false,
          company: data.data[0].name,
        });
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
    return (
      <AddAdComponent
        setTitle={this.setTitle}
        setContent={this.setContent}
        setPayment={this.setPayment}
        setCompany={this.setCompany}
        getCompanies={this.getCompanies}
        addAd={this.addAd}
        title={this.state.title}
        content={this.state.content}
        payment={this.state.payment}
        company={this.state.company}
        availableCompanies={this.state.availableCompanies}
        isLoading={this.state.isLoading}
      />
    );
  }
}

//States from the redux store that should be mapped to props in this component
const mapStateToProps = state => ({
  currentIssue: state.issue.currentIssue,
});

//Actions that should be mapped to props in this component
const mapDispatchToProps = dispatch => ({
  addAdToIssue: (id, content) => dispatch(addAdToIssue(id, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAdScreen);
