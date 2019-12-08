/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditListItem from '../../components/EditListItem';
import theme from '../../../styles/main.theme.js';
import StandardList from '../../components/common/StandardList';
import RouteNames from '../../RouteNames';
import {dateDiff} from '../../../utils/formatting';
import {getEditByTypeUrl} from '../../config/api';
import {
  getCurrentArticle,
  getCurrentIssue,
} from '../../redux/actions/issue.actions';
import {connect} from 'react-redux';

const axios = require('axios').default;

type Props = {};
//Type definition for states of this class. Helps with type safety
type State = {
  data: any,
  isLoading: boolean,
  id: string,
  dataChanged: boolean,
  showSnackbar: boolean,
  editable: boolean,
};

class EditArticleList extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  //Navigates to the EditArticle screen with the params id and reloadlist
  navigateToEdit = id => {
    this.props.navigation.navigate(RouteNames.EditArticle, {});
  };

  //Navigates to the AddArticle screen witht he params id and reloadList
  navigateToAdd = () => {
    this.props.navigation.navigate(RouteNames.AddArticle, {});
  };

  reloadList = () => {
    this.props.getCurrentIssue(this.props.currentIssue._id);
  };

  //Item that should be rendered with the StandardList
  renderListItem = (item, index) => (
    <EditListItem
      title={item.title}
      content={item.content}
      id={item._id}
      index={index}
      navigateToEdit={this.navigateToEdit}
      getCurrentItem={this.props.getCurrentArticle}
    />
  );

  render() {
    return (
      <View style={styles.rootContainer}>
        <StandardList
          data={this.props.editList}
          reloadList={this.reloadList}
          renderItem={this.renderListItem}
          isLoading={this.props.isLoading}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => this.navigateToAdd()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentIssue: state.issue.currentIssue,
  editList: state.issue.articles,
  isLoading: state.issue.isLoading,
  errorMessage: state.issue.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  getCurrentArticle: id => dispatch(getCurrentArticle(id)),
  getCurrentIssue: id => dispatch(getCurrentIssue(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticleList);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
