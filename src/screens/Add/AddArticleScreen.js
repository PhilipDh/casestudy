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
import theme from '../../../styles/main.theme.js';
import {getArticleUrl, getPeopleUrl, addArticleUrl} from '../../config/api';
import RouteNames from '../../RouteNames';
import AddArticleComponent from '../../components/Add/AddArticle';
import {connect} from 'react-redux';
import {addArticleToIssue} from '../../redux/actions/issue.actions';

const axios = require('axios').default;

type Props = {};
//Type definition for states of this class. Helps with type safety
type State = {
  content: string,
  title: string,
  payment: number,
  owner: string,
  isLoading: boolean,
};
class AddArticleScreen extends Component<State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: '',
      title: '',
      payment: '',
      owner: '',
      availablePeople: {},
    };
  }

  //Setters for the different states
  setTitle = text => this.setState({title: text});
  setContent = text => this.setState({content: text});
  setPayment = text => this.setState({payment: text});
  setOwner = text => this.setState({owner: text});

  //Add a new ad to the current issue
  addArticle = () => {
    //If the title,content or payment field is empty throw an error
    //If the payment is Not a Number (NaN) it will throw an error
    if (this.state.title && !isNaN(this.state.payment) && this.state.payment) {
      //Set the due date to the date that the issue releases
      let dueDate = new Date(this.props.currentIssue.releaseDate);
      let content = {
        title: this.state.title,
        content: this.state.content,
        amount: this.state.payment,
        owner: this.state.owner,
        due:
          dueDate.getFullYear() +
          '-' +
          (dueDate.getMonth() + 1) +
          '-' +
          dueDate.getDate(),
      };
      //Make a post request to the given URL with the content
      this.props.addArticleToIssue(this.props.currentIssue._id, content);
      this.props.navigation.goBack();
    } else {
      alert('Fields cant be empty');
    }
  };

  //Get a list of all the people that can write an article
  getPeople = () => {
    let url = getPeopleUrl();
    axios
      .get(url)
      .then(data => {
        //Filter the returned data for people that have the job Journalist
        let people = data.data.filter(person =>
          person.job.includes('Journalist'),
        );
        //Set states based on the result sent from the server
        this.setState(
          {availablePeople: people, isLoading: false, owner: people[0].name},
          function() {},
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
        owner={this.state.owner}
        availablePeople={this.state.availablePeople}
        title={this.state.title}
        content={this.state.content}
        payment={this.state.payment}
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
  addArticleToIssue: (id, content) => dispatch(addArticleToIssue(id, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddArticleScreen);
