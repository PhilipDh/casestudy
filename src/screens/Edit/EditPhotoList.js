/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditListItem from '../../components/EditListItem';
import theme from '../../../styles/main.theme.js';
import StandardList from '../../components/common/StandardList';
import RouteNames from '../../RouteNames';
import {getEditByTypeUrl} from '../../config/api';
import {connect} from 'react-redux';
import {
  getCurrentPhoto,
  getCurrentIssue,
} from '../../redux/actions/issue.actions';
const axios = require('axios').default;

type Props = {};
//Type definition for states of this class. Helps with type safety
type State = {
  data: any,
  isLoading: boolean,
  id: string,
  showSnackbar: boolean,
};
class EditPhotoList extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      id: props.screenProps.id,
      showSnackbar: false,
    };
  }

  //Navigates to the EditPhoto screen with the params id and reloadlist
  navigateToEdit = id => {
    this.props.navigation.navigate(RouteNames.EditPhoto, {});
  };

  //Navigates to the AddPhoto screen witht he params id and reloadList
  navigateToAdd = () => {
    this.props.navigation.navigate(RouteNames.AddPhoto, {
      id: this.state.id,
      reloadList: this.reloadList,
    });
  };

  reloadList = () => {
    this.props.getCurrentIssue(this.props.currentIssue._id);
  };

  //Item that should be rendered with the StandardList
  renderListItem = (item, index) => (
    <EditListItem
      title={item.title}
      content={item.size}
      id={item._id}
      navigateToEdit={this.navigateToEdit}
      index={index}
      getCurrentItem={this.props.getCurrentPhoto}
    />
  );

  render() {
    //While the list is loading dont display anything

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
  editList: state.issue.photos,
  isLoading: state.issue.isLoading,
  errorMessage: state.issue.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  getCurrentPhoto: id => dispatch(getCurrentPhoto(id)),
  getCurrentIssue: id => dispatch(getCurrentIssue(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPhotoList);

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
