/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomNavigation, Appbar, withTheme} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer} from 'react-navigation';
import IssueList from './IssueList';
import PaymentList from './PaymentList';
import PaymentDetails from './PaymentDetails';
import EditList from './edit/EditList';
import EditAd from './edit/EditAd';
import EditArticleList from './edit/EditArticleList';
import EditPhotoList from './edit/EditPhotoList';
import EditArticle from './edit/EditArticle';
import EditPhoto from './edit/EditPhoto';
import theme from '../styles/main.theme.js';

type Props = {
  issueTitle: string,
  setTitle: any,
  id: string,
};

type State = {
  issueTitle: string,
  setTitle: any,
  id: string,
};

class Home extends Component<State, Props> {
  constructor(props) {
    super(props);

    //console.log(this.props.navigation);
    this.state = {
      issueTitle: '',
      setTitle: '',
      id: '-1',
    };
  }

  updateContext = (title, id) => {
    this.setState({issueTitle: title});
    //this.props.setTitle(title, id);
    //this.props.navigation.push({id: {id}});
    this.setState({id: id});
    this.props.navigation.setParams('issueTitle', title);
  };

  render() {
    return (
      <AppNavigator
        params={{id: 1230, issueTitle: this.state.issueTitle}}
        screenProps={{
          updateContext: this.updateContext,
          issueTitle: this.state.issueTitle,
          id: this.state.id,
        }}
      />
    );
  }
}

export default withTheme(Home);

const PaymentStack = createStackNavigator(
  {
    // For each screen that you can navigate to, create a new entry like this:
    List: {
      // `ProfileScreen` is a React component that will be the main content of the screen.
      screen: PaymentList,
      params: {issueTitle: 'Payments'},
      // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

      // Optional: When deep linking or using react-navigation in a web app, this path is used:
      //path: 'people/:name',
      // The action and route params are extracted from the path.

      // Optional: Override the `navigationOptions` for the screen
      // Optional: Override the `navigationOptions` for the screen
    },
    Details: {
      screen: PaymentDetails,
      params: {data: 'dest'},
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        title: 'Second',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.setContrast(theme.colors.primary),
        headerTitleStyle: {
          color: theme.setContrast(theme.colors.primary),
        },
        tabBarVisible: false,
      };
    },
    cardStyle: {
      backgroundColor: theme.colors.primary,
      //opacity: 1,
    },
  },
);

PaymentStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

const IssueStack = createStackNavigator(
  {
    // For each screen that you can navigate to, create a new entry like this:
    List: {
      // `ProfileScreen` is a React component that will be the main content of the screen.
      screen: IssueList,
      params: {title: 'Issues'},

      // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

      // Optional: When deep linking or using react-navigation in a web app, this path is used:
      //path: 'people/:name',
      // The action and route params are extracted from the path.

      // Optional: Override the `navigationOptions` for the screen
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.title}`,
        headerStyle: {
          backgroundColor: theme.colors.priamry,
        },
      }),
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        title: 'Issues',
        headerTitleStyle: {
          color: theme.setContrast(theme.colors.primary),
        },
      };
    },
    cardStyle: {
      backgroundColor: theme.colors.primary,
    },
  },
);

const EditTopNavigatior = createMaterialTopTabNavigator(
  {
    Ads: {
      screen: EditList,
    },
    Articles: {
      screen: EditArticleList,
    },
    Photos: {
      screen: EditPhotoList,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      swipeEnabled: true,
    }),
    tabBarOptions: {
      swipeEnabled: true,
      style: {
        backgroundColor: theme.colors.primary,
        elevation: 5,
      },
      labelStyle: {
        color: theme.setContrast(theme.colors.primary),
      },
      indicatorStyle: {
        backgroundColor: theme.colors.accent,
      },
    },
    navigationOptions: {
      swipeEnabled: true,
    },
  },
);

const EditStack = createStackNavigator(
  {
    Edit: {
      screen: EditTopNavigatior,
      title: 'Edit',

      navigationOptions: {
        swipeEnabled: true,

        tabBarOptions: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
    EditAd: {
      screen: EditAd,
    },
    EditArticle: {
      screen: EditArticle,
    },
    EditArticleList: {
      screen: EditArticleList,
    },
    EditPhotoList: {
      screen: EditPhotoList,
    },
    EditPhoto: {
      screen: EditPhoto,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        title: 'Edit',
        headerTintColor: theme.setContrast(theme.colors.primary),
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 0,
        },
        headerTitleStyle: {
          color: theme.setContrast(theme.colors.primary),
        },
      };
    },
    cardStyle: {
      backgroundColor: theme.colors.primary,
    },
    initialRouteName: 'Edit',
  },
);

const bottomTabNavigator = createMaterialBottomTabNavigator(
  //RouteConfigs
  {
    Home: {
      screen: IssueStack,
      //navigationOptions: {barStyle: {backgroundColor: '#5d1049'}},
    },

    Edit: {
      screen: EditStack,
      //params: {id: 321},
      //navigationOptions: {barStyle: {backgroundColor: '#5d1049'}},
    },
    Payments: {
      screen: PaymentStack,
    },
  },
  //BottomTabNavigatorConfig
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName = '';
        let iconSize = 25;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Edit') {
          iconName = `edit`;
        } else if (routeName === 'Payments') {
          iconName = `credit-card`;
          iconSize = 22;
        }

        return <Icon name={iconName} color={tintColor} size={iconSize} />;
      },
      backgroundColor: theme.colors.primary,
    }),
    navigationOptions: ({navigation}) => {
      return {};
    },

    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
    },
  },
);

const AppNavigator = createAppContainer(bottomTabNavigator);

const styles = StyleSheet.create({
  issueList: {},
});
