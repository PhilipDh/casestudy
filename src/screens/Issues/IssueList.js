/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';
import IssueItem from '../../components/IssueItem';
import theme from '../../../styles/main.theme.js';
import StandardList from '../../components/common/StandardList';
import {getIssueUrl} from '../../config/api';

const axios = require('axios').default;

type State = {data: any, isLoading: boolean, showSnackbar: boolean};
type Props = {data: any, isLoading: boolean};

class IssueList extends Component<State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      showSnackbar: false,
    };
  }

  updateSnackbar = () => this.setState({showSnackbar: false});

  componentDidMount() {
    //Upon mounting the component load all issues from the API
    this.getIssueList();
  }

  getIssueList = () => {
    (async () => {
      try {
        const response = await axios.get(getIssueUrl());
        this.setState({
          isLoading: false,
          data: response.data,
        });
      } catch (error) {
        console.log(error);
        this.setState({isLoading: false, data: [], showSnackbar: true});
      }
    })();
  };

  updateProperties = (title, id, date) => {
    this.setTitle(title);
    this.props.screenProps.id = id;
    this.props.screenProps.issueTitle = title;
    this.props.screenProps.releaseDate = date;
  };

  setTitle = title => {
    this.props.navigation.setParams({title: title});
  };

  renderListItem = item => (
    <IssueItem
      title={item.title}
      date={item.releaseDate}
      id={item._id}
      //updateContext={this.props.screenProps.updateContext}
      updateContext={this.updateProperties}
      setTitle={this.setTitle}
    />
  );

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <StandardList
          data={this.state.data}
          setTitle={this.setTitle}
          reloadList={this.getIssueList}
          updateContext={this.props.screenProps.updateContext}
          renderItem={this.renderListItem}
          updateSnackbar={this.updateSnackbar}
          showSnackbar={this.state.showSnackbar}
        />
      );
    }
  }
}

export default withTheme(IssueList);
