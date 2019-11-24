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

const axios = require('axios').default;

type Props = {};

type State = {
  data: any,
  isLoading: boolean,
  id: string,
  showSnackbar: boolean,
};

export default class EditPhotoList extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      id: props.screenProps.id,
      showSnackbar: false,
    };
  }

  updateSnackbar = () => this.setState({showSnackbar: false});

  navigateToEdit = id => {
    this.props.navigation.navigate(RouteNames.EditPhoto, {
      id: id,
      reloadList: this.reloadList,
    });
  };

  navigateToAdd = () => {
    this.props.navigation.navigate(RouteNames.AddPhoto, {
      id: this.state.id,
      reloadList: this.reloadList,
    });
  };

  reloadList = () => {
    this.getPhotoList();
  };

  getPhotoList() {
    var url = getEditByTypeUrl(this.state.id, 'photo');
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

  componentDidMount() {
    //Since the Photo list itself is in a Top Navigator, directly adding a listener to it would only listen to the top navigation events
    //To access the bottom tab navigation events I have to call dangerouslyGetParent() to add a listener
    this.focusListener = this.props.navigation
      .dangerouslyGetParent()
      .addListener('didFocus', () => {
        this.setState({id: this.props.screenProps.id}, () => {
          this.reloadList();
        });

        console.log(this.props.screenProps.id);
      });
    this.getPhotoList();
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  renderListItem = item => (
    <EditListItem
      title={item.title}
      content={item.size}
      id={item._id}
      navigateToEdit={this.navigateToEdit}
    />
  );

  render() {
    if (this.state.isLoading) {
      return <View></View>;
    } else {
      return (
        <View style={styles.rootContainer}>
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
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
