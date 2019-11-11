/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  RadioButton,
  TextInput,
  Snackbar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
const axios = require('axios').default;

type State = {
  username: string,
  password: string,
  loading: boolean,
  status: boolean,
  errorMessage: string,
  visible: boolean,
};

export default class UserLogin extends Component<State> {
  constructor() {
    super();

    this.state = {
      loading: false,
      username: '',
      password: '',
      status: false,
      errorMessage: '',
      visible: false,
    };
  }

  navigateToHome() {
    this.props.navigation.navigate('Home');
  }

  handleLogin = () => {
    const {username, password} = this.state;
    if (username && password) {
      this.setState({visible: false});
      auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({errorMessage: error.message}));
    } else {
      this.setState({visible: true});
    }
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.loginCard}>
          <Text style={styles.loginTitleText}>{'Login'}</Text>
          <TextInput
            label={'Username'}
            value={this.state.username}
            placeholder={'Username'}
            underlineColor="#5d1049"
            onChangeText={text => this.setState({username: text})}
            style={{backgroundColor: '#FFF', margin: 10}}
          />
          <TextInput
            label={'Password'}
            value={this.state.password}
            placeholder={'Password'}
            underlineColor="#5d1049"
            secureTextEntry={true}
            onChangeText={text => this.setState({password: text})}
            style={{backgroundColor: '#FFF', margin: 10}}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            //icon={this.getIcon()}
            style={styles.saveButton}
            loading={this.state.loading}
            color={'#fa3336'}
            mode={'contained'}
            onPress={() => this.navigateToHome()}>
            Home
          </Button>
          <Button
            //icon={this.getIcon()}
            style={styles.saveButton}
            loading={this.state.loading}
            color={'#fa3336'}
            mode={'contained'}
            onPress={() => this.handleLogin()}>
            Login
          </Button>
        </View>
        <Snackbar
          style={styles.snackbar}
          visible={this.state.visible}
          onDismiss={() => this.setState({visible: false})}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}>
          Username and password can't be empty!
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    backgroundColor: '#5d1049',

    flex: 1,
  },

  loginCard: {
    backgroundColor: '#FFFFFF',
    elevation: 5,
    margin: 10,
    borderRadius: 4,
    height: 250,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    margin: 10,
    flex: 1,
  },
  loginTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  snackbar: {
    backgroundColor: '#fa3336',
    color: 'white',
  },
});
