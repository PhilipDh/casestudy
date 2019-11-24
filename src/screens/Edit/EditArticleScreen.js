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
import {getArticleUrl} from '../../config/api';
import EditArticleComponent from '../../components/Edit/EditArticle';
const axios = require('axios').default;

type Props = {};

type State = {
  data: any,
  isLoading: boolean,
  loading: boolean,
  title: string,
  content: string,
  reloadList: any,
};

export default class EditArticleScreen extends Component<State, Props> {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      id: this.props.navigation.getParam('id'),
      loading: false,
      isLoading: true,
      title: '',
      content: '',
      reloadList: this.props.navigation.getParam('reloadList'),
    };
  }

  setTitle = text => this.setState({title: text});

  setContent = text => this.setState({content: text});

  updateArticle = () => {
    this.setState({loading: true});

    var url = getArticleUrl(this.state.id);
    var body = {
      title: this.state.title,
      content: this.state.content,
      //Has to be called to string because of request constraints
      payed: this.state.data.payed.toString(),
    };

    //TODO SHow toast if content is empty -> error
    axios
      .put(url, body)
      .then(data => {
        this.setState({
          isLoading: false,
          loading: false,
          data: data.data,
        });

        this.state.reloadList();
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };

  componentDidMount() {
    var url = getArticleUrl(this.state.id);
    axios
      .get(url)
      .then(data => {
        this.setState({
          isLoading: false,
          loading: false,
          data: data.data,
          title: data.data.title,
          content: data.data.content,
        });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  render() {
    return (
      <EditArticleComponent
        setTitle={this.setTitle}
        setContent={this.setContent}
        title={this.state.title}
        content={this.state.content}
        isLoading={this.state.isLoading}
        updateArticle={this.updateArticle}
      />
    );
  }
}
