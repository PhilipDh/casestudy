/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditListItem from './EditListItem';

const axios = require('axios').default;

type Props = {};

type State = {
  data: any,
  isLoading: boolean,
  id: string,
  dataChanged: boolean,
};

export default class EditArticleList extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      id: props.screenProps.id,
      dataChanged: true,
    };
  }

  navigateToEdit = id => {
    this.props.navigation.navigate('EditArticle', {
      id: id,
      reloadList: this.reloadList,
    });
  };

  getArticleList() {
    var url = 'http://10.0.2.2:3000/article/' + this.state.id + '/article';
    console.log(url);
    axios
      .get(url)
      .then(data => {
        this.setState(
          {data: data.data, isLoading: false, dataChanged: false},
          function() {},
        );
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  reloadList = () => {
    this.getArticleList();
  };

  componentDidMount() {
    this.getArticleList();
  }

  render() {
    if (this.state.isLoading) {
      return <View></View>;
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <EditListItem
                title={item.title}
                content={item.content}
                id={item._id}
                navigateToEdit={this.navigateToEdit}
              />
            )}
            keyExtractor={({_id}, index) => _id}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
