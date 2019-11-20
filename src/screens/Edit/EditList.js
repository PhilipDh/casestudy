/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FAB, Provider, Portal} from 'react-native-paper';
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

  updateSnackbar = () => this.setState({showSnackbar: false});

  getAdList() {
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
  }

  reloadList = () => {
    this.getAdList();
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({id: this.props.screenProps.id});
    });
    this.getAdList();
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  navigateToEdit = id => {
    this.props.navigation.navigate(RouteNames.EditAd, {
      id: id,
      reloadList: this.reloadList,
    });
  };

  navigateToAdd = () => {
    this.props.navigation.navigate(RouteNames.AddAd, {
      id: this.state.id,
      reloadList: this.reloadList,
    });
  };

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
      return (
        <View style={styles.rootContainer}>
          <Text> {this.props.screenProps.id} </Text>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <StandardList
            data={this.state.data}
            reloadList={this.reloadList}
            renderItem={this.renderListItem}
            updateSnackbar={this.updateSnackbar}
            showSnackbar={this.state.showSnackbar}
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
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
