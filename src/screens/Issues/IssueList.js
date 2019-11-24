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

  setTitle = title => this.props.navigation.setParams({title: title});

  updateSnackbar = () => this.setState({showSnackbar: false});

  //Returns the list of Issues from the backend
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

  //Sets the id, title and release date properties that will be used by the other screens to know which issue is currently active
  updateProperties = (title, id, date) => {
    this.setTitle(title);
    //Screen props are a navigation property supplied by the bottom tab navigator
    this.props.screenProps.id = id;
    this.props.screenProps.issueTitle = title;
    this.props.screenProps.releaseDate = date;
  };

  //Defines which type of list item should be rendered
  renderListItem = item => (
    <IssueItem
      title={item.title}
      date={item.releaseDate}
      id={item._id}
      updateContext={this.updateProperties}
      setTitle={this.setTitle}
    />
  );

  componentDidMount() {
    //Upon mounting the component load all issues from the API
    this.getIssueList();
  }

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
