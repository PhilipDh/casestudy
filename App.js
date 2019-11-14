/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Home from './components/Home';
import PaymentDetails from './components/PaymentDetails';
import UserLogin from './components/login/UserLogin';
import {withNavigation} from 'react-navigation';
import theme from './styles/main.theme.js';
import RouteNames from './components/routes/RouteNames';
//import Routes from './components/routes/app.js';

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
    };
  }

  setTitle = (title, id) => this.setState({title: title, id: id});

  render() {
    return (
      <PaperProvider theme={themes}>
        <SwitchNav />
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

const SwitchNav = createAppContainer(
  createSwitchNavigator({
    [RouteNames.AuthStack]: AuthStack,
    [RouteNames.HomeStack]: HomeStack,
  }),
);
