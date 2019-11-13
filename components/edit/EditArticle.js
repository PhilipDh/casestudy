/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Button, Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../styles/main.theme.js';
import TextInput from '../dumb/TextInput';
const axios = require('axios').default;

type Props = {
  id: string,
  data: any,
  isLoading: boolean,
  loading: boolean,
  title: string,
  content: string,
};

type State = {
  data: any,
  isLoading: boolean,
  loading: boolean,
  title: string,
  content: string,
  reloadList: any,
};

export default class EditArticle extends Component<State, Props> {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      id: this.props.navigation.getParam('id'),
      loading: false,
      isLoading: true,
      title: '',
      content: '',
      reloadList: this.props.navigation.getParam('reloadList'),
    };
  }

  setTitle = text => this.setState({title: text});

  setContent = text => this.setState({content: text});

  updateArticle(title, content) {
    this.setState({loading: true});

    var url = 'http://10.0.2.2:3000/article/' + this.state.id;
    var body = {
      title: title,
      content: content,
      payed: this.state.data.payed,
    };

    //TODO SHow toast if content is empty -> error
    axios
      .put(url, body)
      .then(data => {
        this.setState({
          isLoading: false,
          loading: false,
          data: data.data,
        });
        this.state.reloadList();
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  componentDidMount() {
    var url = 'http://10.0.2.2:3000/article/' + this.state.id;
    axios
      .get(url)
      .then(data => {
        this.setState({
          isLoading: false,
          loading: false,
          data: data.data,
          title: data.data.title,
          content: data.data.content,
        });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>ABC</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TextInput
              text={this.state.title}
              label={'Title'}
              onTextChange={this.setTitle}
              secure={false}
              multiline={false}
            />
          </View>

          <View style={styles.contentContainer}>
            <TextInput
              text={this.state.content}
              label={'Content'}
              onTextChange={this.setContent}
              secure={false}
              multiline={true}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              //icon={this.getIcon()}
              style={styles.saveButton}
              loading={this.state.loading}
              color={theme.colors.accent}
              mode={'contained'}
              onPress={() =>
                this.updateArticle(this.state.title, this.state.content)
              }>
              Save
            </Button>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  saveButton: {},
  titleContainer: {},
  contentContainer: {},
  buttonContainer: {
    justifyContent: 'flex-end',
  },
});
