/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {
  Snackbar,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Home from './components/Home';
import PaymentDetails from './components/PaymentDetails';
import UserLogin from './components/login/UserLogin';
import {withNavigation} from 'react-navigation';
import theme from './styles/main.theme.js';
import RouteNames from './components/routes/RouteNames';
import {accelerometer} from './components/custom/Accelerometer';
import {map, filter} from 'rxjs/operators';
import {NativeEventEmitter, NativeModules} from 'react-native';

type State = {
  title: string,
  id: number,
};

type Props = {
  title: string,
  id: number,
};
export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      title: 'IT in the Valley',
      id: -1,
      showSnackbar: false,
    };
  }

  componentDidMount() {
    const subscription = accelerometer.subscribe(speed => {
      console.log(`You moved your phone with ${speed}`);
      this.setState({showSnackbar: true});
    });
  }

  updateSnackbar = () => this.setState({showSnackbar: false});

  setTitle = (title, id) => this.setState({title: title, id: id});

  render() {
    return (
      <PaperProvider theme={themes}>
        <SwitchNav />
        <Snackbar
          theme={{...DefaultTheme, colors: {accent: 'white'}}}
          style={styles.snackbar}
          visible={this.state.showSnackbar}
          onDismiss={() => {
            this.updateSnackbar();
          }}
          action={{
            label: 'Submit',
            onPress: () => {
              console.log('Submitted bug');
            },
          }}>
          Submit a bug report?
        </Snackbar>
      </PaperProvider>
    );
  }
}

const themes = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    accent: theme.colors.accent,
    background: theme.colors.background,
    surface: theme.colors.surface,
    text: theme.setContrast(theme.colors.primary),
  },
};

//Navigation stack for the Login page
const AuthStack = createStackNavigator(
  {
    [RouteNames.Login]: {
      screen: UserLogin,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

//Navigation stack for the rest of the app
const HomeStack = createStackNavigator(
  {
    [RouteNames.Home]: {
      screen: Home,
      params: {issueTitle: 'No'},
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

//Switch navigator that will not allow a back navigation unlike the Stack
const SwitchNav = createAppContainer(
  createSwitchNavigator({
    [RouteNames.AuthStack]: AuthStack,
    [RouteNames.HomeStack]: HomeStack,
  }),
);

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.text,
  },
});
