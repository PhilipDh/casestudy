/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View} from 'react-native';
//import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../styles/main.theme.js';
import {getArticleUrl, getPeopleUrl, addArticleUrl} from '../../config/api';
import RouteNames from '../../RouteNames';
import AddArticleComponent from '../../components/Add/AddArticle';

const axios = require('axios').default;

type Props = {};
type State = {content: string, title: string, payment: number};
export default class AddArticleScreen extends Component<State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: this.props.navigation.getParam('id'),
      content: '',
      title: '',
      payment: '',
      owner: '',
      availablePeople: {},
      reloadList: this.props.navigation.getParam('reloadList'),
    };
  }

  setTitle = text => this.setState({title: text});

  setContent = text => this.setState({content: text});

  setPayment = text => this.setState({payment: text});

  setOwner = text => this.setState({owner: text});

  //Add a new ad to the current issue
  addArticle = () => {
    //If the title,content or payment field is empty throw an error
    //If the payment is Not a Number (NaN) it will throw an error
    if (this.state.title && !isNaN(this.state.payment) && this.state.payment) {
      let url = addArticleUrl(this.state.id);
      let content = {
        title: this.state.title,
        content: this.state.content,
        payment: this.state.payment,
        owner: this.state.owner,
      };
      axios
        .post(url, content)
        .then(data => {
          this.state.reloadList();
          this.props.navigation.goBack();
        })
        .catch(err => {
          //this.setState({data: [], isLoading: false, showSnackbar: true});
          console.log(err.message);
          return null;
        });
    } else {
      alert('Fields cant be empty');
    }
  };

  //Get a list of all the companies that can request an ad
  getPeople = () => {
    let url = getPeopleUrl();
    axios
      .get(url)
      .then(data => {
        let people = data.data.filter(person =>
          person.job.includes('Journalist'),
        );

        this.setState(
          {availablePeople: people, isLoading: false, owner: people[0].name},
          function() {
            // console.log(this.state.availablePeople);
          },
        );
      })
      .catch(err => {
        this.setState({data: [], isLoading: false});
        return null;
      });
  };

  componentDidMount() {
    this.getPeople();
  }

  render() {
    return (
      <AddArticleComponent
        setTitle={this.setTitle}
        setContent={this.setContent}
        setPayment={this.setPayment}
        setOwner={this.setOwner}
        addArticle={this.addArticle}
        owner={this.setOwner}
        availablePeople={this.state.availablePeople}
        title={this.state.title}
        content={this.state.content}
        payment={this.state.payment}
        isLoading={this.state.isLoading}
      />
    );
  }
}
