/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditListItem from './EditListItem';
import theme from '../../styles/main.theme.js';
import StandardList from '../dumb/StandardList';

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
    this.props.navigation.navigate('EditPhoto', {
      id: id,
      reloadList: this.reloadList,
    });
  };

  reloadList = () => {
    this.getPhotoList();
  };

  getPhotoList() {
    var url =
      'http://10.0.2.2:3000/photograph/' + this.state.id + '/photograph';
    console.log(url);
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
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({id: this.props.screenProps.id});
    });
    this.getPhotoList();
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  _listEmptyComponent() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyListText}>There seems to be nothing here</Text>
        <Text style={styles.reloadText} onPress={() => this.getPhotoList()}>
          Reload
        </Text>
      </View>
    );
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
        <StandardList
          data={this.state.data}
          reloadList={this.reloadList}
          renderItem={this.renderListItem}
          updateSnackbar={this.updateSnackbar}
          showSnackbar={this.state.showSnackbar}
        />
      );
    }
  }
}

/*

        <View style={styles.rootContainer}>
          <FlatList
            contentContainerStyle={styles.rootContainer}
            ListEmptyComponent={this._listEmptyComponent()}
            data={this.state.data}
            renderItem={({item}) => (
              <EditListItem
                title={item.title}
                content={item.size}
                id={item._id}
                navigateToEdit={this.navigateToEdit}
              />
            )}
            keyExtractor={({_id}, index) => _id}
          />
        </View>
*/
