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
import Title from '../../components/Title';
import NetworkError from '../../components/common/NetworkError';
import {getIssueList, getCurrentIssue} from '../../redux/actions/issue.actions';

const axios = require('axios').default;

//Type definition for states of this class. Helps with type safety

type Props = {title: string};

class IssueList extends Component<State, Props> {
  constructor(props) {
    super(props);
  }

  //Defines which type of list item should be rendered
  renderListItem = (item, index) => {
    return (
      <IssueItem
        title={item.title}
        date={item.releaseDate}
        id={item._id}
        getCurrentIssue={this.props.getCurrentIssue}
        item={item}
        selectIssue={this.props.selectIssue}
        cover={item.cover}
      />
    );
  };

  componentDidMount() {
    //Upon mounting the component load all issues from the API
    this.props.getIssueList();
  }

  render() {
    const {title, errorMessage} = this.props;
    //Show a loading indicator while the list is loading
    return (
      <View>
        <StandardList
          data={this.props.data}
          reloadList={this.props.getIssueList}
          updateContext={this.props.screenProps.updateContext}
          renderItem={this.renderListItem}
          isLoading={this.props.isLoading}
        />
        {errorMessage !== '' && (
          <View style={styles.networkMessage}>
            <NetworkError message={errorMessage} />
          </View>
        )}
      </View>
    );
  }
}

//States from the redux store that should be mapped to props in this component
const mapStateToProps = state => ({
  title: state.issue.currentIssue.title,
  data: state.issue.data,
  isLoading: state.issue.isLoading,
  errorMessage: state.issue.errorMessage,
});

//Actions that should be mapped to props in this component
const mapDispatchToProps = dispatch => ({
  getIssueList: () => dispatch(getIssueList()),
  getCurrentIssue: id => dispatch(getCurrentIssue(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);

const styles = StyleSheet.create({
  networkMessage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
