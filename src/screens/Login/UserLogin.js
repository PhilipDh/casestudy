/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import TextInput from '../../components/common/TextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
//import auth from '@react-native-firebase/auth';
import theme from '../../../styles/main.theme';
import RouteNames from '../../RouteNames';

const logo = require('../../../assets/images/itInTheValley.png');
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
      /*
      auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => this.props.navigation.navigate(RouteNames.Home))
        .catch(error => {
          this.setState({errorMessage: error.message, visible: true});
          console.log(error.message);
        });
        */
    } else {
      this.setState({visible: true, errorMessage: "Login can't be empty"});
    }
  };

  setUsername = text => this.setState({username: text});
  setPassword = text => this.setState({password: text});

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoStyle} />
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.loginCard}>
            <Text style={styles.loginTitleText}>{'Login'}</Text>
            <TextInput
              text={this.state.username}
              label={'Username'}
              onTextChange={this.setUsername}
              secure={false}
            />
            <TextInput
              text={this.state.password}
              label={'Password'}
              onTextChange={this.setPassword}
              secure={false}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              //icon={this.getIcon()}
              style={styles.saveButton}
              loading={this.state.loading}
              color={theme.colors.accent}
              mode={'contained'}
              onPress={() => this.navigateToHome()}>
              Home
            </Button>
            <Button
              //icon={this.getIcon()}
              style={styles.saveButton}
              loading={this.state.loading}
              color={theme.colors.accent}
              mode={'contained'}
              onPress={() => this.handleLogin()}>
              Login
            </Button>
          </View>
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
          {this.state.errorMessage}
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'column',
    flex: 1,
    padding: 15,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginContainer: {
    flex: 3,
    justifyContent: 'flex-start',
  },

  logoStyle: {
    width: 150,
    height: 90,
  },

  loginCard: {
    backgroundColor: theme.colors.surface,
    elevation: 5,
    padding: theme.containerPadding,
    // margin: 10,
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
    color: theme.setContrast(theme.colors.surface),
  },
  snackbar: {
    backgroundColor: theme.colors.accent,
  },
});
