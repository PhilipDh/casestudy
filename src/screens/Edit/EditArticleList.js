/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditListItem from '../../components/EditListItem';
import theme from '../../../styles/main.theme.js';
import StandardList from '../../components/common/StandardList';
import RouteNames from '../../RouteNames';
import {getArticlesByIssueUrl} from '../../config/api';

const axios = require('axios').default;

type Props = {};

type State = {
  data: any,
  isLoading: boolean,
  id: string,
  dataChanged: boolean,
  showSnackbar: boolean,
};

export default class EditArticleList extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      id: props.screenProps.id,
      dataChanged: true,
      showSnackbar: false,
    };
  }
  updateSnackbar = () => this.setState({showSnackbar: false});

  navigateToEdit = id => {
    this.props.navigation.navigate(RouteNames.EditArticle, {
      id: id,
      reloadList: this.reloadList,
    });
  };

  getArticleList() {
    var url = getArticlesByIssueUrl(this.state.id);
    console.log(url);
    axios
      .get(url)
      .then(data => {
        this.setState(
          {data: data.data, isLoading: false, dataChanged: false},
          function() {},
        );
      })
      .catch(err => {
        this.setState({data: [], isLoading: false, showSnackbar: true});
        return null;
      });
  }

  reloadList = () => {
    this.getArticleList();
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({id: this.props.screenProps.id});
    });
    this.getArticleList();
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  renderListItem = item => (
    <EditListItem
      title={item.title}
      content={item.content}
      id={item._id}
      navigateToEdit={this.navigateToEdit}
    />
  );

  render() {
    if (this.state.isLoading) {
      return <View></View>;
    } else {
      return (
        <StandardList
          data={this.state.data}
          reloadList={this.reloadList}
          renderItem={this.renderListItem}
          updateSnackbar={this.updateSnackbar}
          showSnackbar={this.state.showSnackbar}
        />
      );
    }
  }
}
