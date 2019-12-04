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

export default class EditList extends Component<Props, State> {
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

  //Gets a list of all ads from the server
  getAdList = () => {
    var url = getEditByTypeUrl(this.state.id, 'ad');
    axios
      .get(url)
      .then(data => {
        this.setState({data: data.data, isLoading: false}, function() {});
      })
      .catch(err => {
        this.setState({data: [], isLoading: false, showSnackbar: true});
        return null;
      });
  };

  reloadList = () => {
    this.getAdList();
  };

  componentDidMount() {
    //Since the Ad list itself is in a Top Navigator, directly adding a listener to it would only listen to the top navigation events
    //To access the bottom tab navigation events I have to call dangerouslyGetParent() to add a listener
    this.focusListener = this.props.navigation
      .dangerouslyGetParent()
      .addListener('didFocus', () => {
        this.setState({id: this.props.screenProps.id}, () => {
          this.reloadList();
        });
      });
    this.getAdList();
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  //Item that should be rendered with the StandardList
  renderListItem = item => (
    <EditListItem
      title={item.title}
      content={item.content}
      id={item._id}
      navigateToEdit={this.navigateToEdit}
    />
  );

  render() {
    //While the list is loading dont display anything

    return (
      <View style={styles.rootView}>
        <StandardList
          data={this.state.data}
          reloadList={this.reloadList}
          renderItem={this.renderListItem}
          updateSnackbar={this.updateSnackbar}
          showSnackbar={this.state.showSnackbar}
          isLoading={this.state.isLoading}
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
