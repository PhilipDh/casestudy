/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Snackbar,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Home from './src/Home';
import UserLogin from './src/screens/Login/UserLogin';
import theme from './styles/main.theme.js';
import RouteNames from './src/RouteNames';
import {AppNavigator} from './src/Routes';
import {accelerometer} from './src/custom/Accelerometer';
import {map, filter} from 'rxjs/operators';

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
      issueTitle: '',
      releaseDate: '',
    };

    console.disableYellowBox = true;
  }

  componentDidMount() {
    const subscription = accelerometer.subscribe(speed => {
      console.log(`You moved your phone with ${speed}`);
      this.setState({showSnackbar: true});
    });
  }

  updateSnackbar = () => this.setState({showSnackbar: false});

  //setTitle = (title, id) => this.setState({title: title, id: id});
  /*
  updateContext = (title, id, date) => {
    this.setState({issueTitle: title, id: id, releaseDate: date});
  };
*/
  //<SwitchNav />

  render() {
    return (
      <PaperProvider theme={themes}>
        <AppNavigator
          params={{id: 1230, issueTitle: this.state.issueTitle}}
          screenProps={{
            //updateContext: this.updateContext,
            issueTitle: this.state.issueTitle,
            id: this.state.id,
            releaseDate: this.state.releaseDate,
          }}
        />
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

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.text,
  },
});
