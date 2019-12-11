/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import EditListItem from '../../components/EditListItem';
import StandardList from '../../components/common/StandardList';
import RouteNames from '../../RouteNames';
import {getEditByTypeUrl} from '../../config/api';
import {StackActions, NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {getCurrentAd, getCurrentIssue} from '../../redux/actions/issue.actions';
const axios = require('axios').default;

type Props = {
  data: any,
  id: string,
  isLoading: boolean,
};
//Type definition for states of this class. Helps with type safety
type State = {
  data: any,
  id: string,
  isLoading: boolean,
  showSnackbar: boolean,
  open: false,
};

class EditList extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  //Navigates to the EditAd screen
  navigateToEdit = id => {
    this.props.navigation.navigate(RouteNames.EditAd, {});
  };

  //Navigates to the AddAd screen
  navigateToAdd = () => {
    this.props.navigation.navigate(RouteNames.AddAd, {});
  };

  reloadList = () => {
    this.props.getCurrentIssue(this.props.currentIssue._id);
  };

  //Item that should be rendered with the StandardList
  renderListItem = item => (
    <EditListItem
      title={item.title}
      content={item.content}
      id={item._id}
      navigateToEdit={this.navigateToEdit}
      getCurrentItem={this.props.getCurrentAd}
    />
  );

  render() {
    //While the list is loading dont display anything

    return (
      <View style={styles.rootView}>
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

//States from the redux store that should be mapped to props in this component
const mapStateToProps = state => ({
  currentIssue: state.issue.currentIssue,
  editList: state.issue.ads,
  isLoading: state.issue.isLoading,
  errorMessage: state.issue.errorMessage,
});

//Actions that should be mapped to props in this component
const mapDispatchToProps = dispatch => ({
  getCurrentAd: id => dispatch(getCurrentAd(id)),
  getCurrentIssue: id => dispatch(getCurrentIssue(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditList);

const styles = StyleSheet.create({
  rootContainer: {
    padding: 5,
  },
  rootView: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
