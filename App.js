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
import {Appbar} from 'react-native-paper';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Home from './components/Home';
import PaymentDetails from './components/PaymentDetails';
import UserLogin from './components/login/UserLogin';
import {withNavigation} from 'react-navigation';
import theme from './styles/main.theme.js';

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
    Login: {
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
    // For each screen that you can navigate to, create a new entry like this:
    List: {
      // `ProfileScreen` is a React component that will be the main content of the screen.
      screen: Home,
      params: {issueTitle: 'No'},
      // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

      // Optional: When deep linking or using react-navigation in a web app, this path is used:
      //path: 'people/:name',
      // The action and route params are extracted from the path.

      // Optional: Override the `navigationOptions` for the screen
      //    navigationOptions: ({navigation}) => ({
      //      title: `${navigation.state.params.name}'s Profile'`,
      //    }),
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
    Auth: AuthStack,
    Home: HomeStack,
  }),
);

/*

        <Appbar.Header style={{backgroundColor: '#5d1049', elevation: 5}}>
          <Appbar.BackAction onPress={console.log('no idea')} />
          <Appbar.Content title={this.state.title} />
        </Appbar.Header>

        */
