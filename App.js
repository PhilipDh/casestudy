/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import {
  Snackbar,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import UserLogin from './src/screens/Login/UserLogin';
import theme from './styles/main.theme.js';
import RouteNames from './src/RouteNames';
import {AppNavigator} from './src/Routes';
import {accelerometer} from './src/custom/Accelerometer';
import {map, filter} from 'rxjs/operators';
import {initStore} from './src/redux/store';
import {Provider} from 'react-redux';

type State = {
  title: string,
  id: number,
  showSnackbar: boolean,
};

const store = initStore();

class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      title: 'IT in the Valley',
      id: -1,
      showSnackbar: false,
      issueTitle: '',
      releaseDate: '',
    };

    //Disable warnings
    console.disableYellowBox = true;
  }

  componentDidMount() {
    //Variable that will subscribe to the Accelerometer obersavle. Whenver the phone is shaken it will pop up a window that asks if the user wants to submit a bug
    //Try it in the emulator by rotating it into landscape
    const subscription = accelerometer.subscribe(speed => {
      this.setState({showSnackbar: true});
    });
  }

  showToast = message => {
    AndroidToast.show(message, ToastAndroid.SHORT);
  };

  updateSnackbar = () => this.setState({showSnackbar: false});

  render() {
    return (
      //Paper Provider: has to wrapped in the PaperProvider to pass its theme to the React Native Paper components
      //AppNavigator: Root navigator from the Routes.js file, screenProps has to be a parameter to pass props between bottom tab screens
      //Snackbar: Shows up when the phone is shaken
      <Provider store={store}>
        <PaperProvider theme={themes}>
          <AppNavigator screenProps={{showToast: this.showToast}} />
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
      </Provider>
    );
  }
}

export default App;

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
