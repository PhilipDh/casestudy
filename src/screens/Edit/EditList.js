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
import {getCurrentAd} from '../../redux/actions/issue.actions';
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

    this.state = {
      id: props.screenProps.id,
      data: {},
      isLoading: true,
      showSnackbar: false,
    };
  }
  //setter for the showSnackbar state
  updateSnackbar = () => this.setState({showSnackbar: false});

  //Navigates to the EditAd screen with the params id and reloadlist
  navigateToEdit = id => {
    this.props.navigation.navigate(RouteNames.EditAd, {
      id: id,
      reloadList: this.reloadList,
    });
  };

  //Navigates to the AddAd screen witht he params id and reloadList
  navigateToAdd = () => {
    this.props.navigation.navigate(RouteNames.AddAd, {
      id: this.state.id,
      reloadList: this.reloadList,
    });
  };

  reloadList = () => {
    //this.getAdList();
  };

  componentDidMount() {
    //Since the Ad list itself is in a Top Navigator, directly adding a listener to it would only listen to the top navigation events
    //To access the bottom tab navigation events I have to call dangerouslyGetParent() to add a listener
  }

  componentWillUnmount() {
    // Remove the event listener
  }

  //Item that should be rendered with the StandardList
  renderListItem = (item, index) => (
    <EditListItem
      title={item.title}
      content={item.content}
      id={item._id}
      navigateToEdit={this.navigateToEdit}
      index={index}
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

const mapStateToProps = state => ({
  editList: state.issue.ads,
  isLoading: state.issue.isLoading,
  errorMessage: state.issue.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  getCurrentAd: id => dispatch(getCurrentAd(id)),
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
