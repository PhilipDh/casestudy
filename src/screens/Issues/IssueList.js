/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {withTheme} from 'react-native-paper';
import IssueItem from '../../components/IssueItem';
import theme from '../../../styles/main.theme.js';
import StandardList from '../../components/common/StandardList';
import {getIssueUrl} from '../../config/api';
import {connect} from 'react-redux';
import {setTitle, selectIssue} from '../../redux/actions/issue.actions';
import Title from '../../components/Title';
import {getIssueList} from '../../redux/actions/issue.actions';

const axios = require('axios').default;

//Type definition for states of this class. Helps with type safety
type State = {
  data: any,
  isLoading: boolean,
  showSnackbar: boolean,
  title: string,
};
type Props = {title: string};

class IssueList extends Component<State, Props> {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      showSnackbar: false,
    };
  }

  //Set the title state
  setTitle = title => this.props.navigation.setParams({title: title});

  //Set the showSnackbar state
  updateSnackbar = () => this.setState({showSnackbar: false});

  //Returns the list of Issues from the server
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
      setTitle={this.props.setTitle}
      item={item}
      selectIssue={this.props.selectIssue}
    />
  );

  componentDidMount() {
    //Upon mounting the component load all issues from the API
    //this.getIssueList();
    this.props.getIssueList();
  }

  render() {
    const {setTitle, title} = this.props;
    //Show a loading indicator while the list is loading
    if (this.props.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <StandardList
          data={this.props.data}
          setTitle={setTitle}
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

const mapStateToProps = state => ({
  title: state.issue.title,
  data: state.issue.data,
  isLoading: state.issue.isLoading,
});

const mapDispatchToProps = dispatch => ({
  setTitle: title => dispatch(setTitle(title)),
  getIssueList: () => dispatch(getIssueList()),
  selectIssue: item => dispatch(selectIssue(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);
