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
import {PaymentConfig} from './config/routes.config';
import {IssueConfig} from './config/routes.config';
import {EditConfig} from './config/routes.config';
import {EditTopNavConfig} from './config/routes.config';
import {BottomTabConfig} from './config/routes.config';
import {BottomTabRoutes} from './routes/home.routes';
import RouteNames from './routes/RouteNames';

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

    this.state = {
      issueTitle: '',
      setTitle: '',
      id: '-1',
    };
  }

  updateContext = (title, id) => {
    this.setState({issueTitle: title});

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
    [RouteNames.PaymentList]: {
      screen: PaymentList,
      params: {issueTitle: 'Payments'},
    },
    [RouteNames.PaymentDetails]: {
      screen: PaymentDetails,
      params: {data: 'dest'},
    },
  },
  PaymentConfig,
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
    [RouteNames.IssueList]: {
      screen: IssueList,
      params: {title: 'Issues'},

      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.title}`,
        headerStyle: {
          backgroundColor: theme.colors.priamry,
        },
      }),
    },
  },
  IssueConfig,
);

const EditTopNavigatior = createMaterialTopTabNavigator(
  {
    [RouteNames.EditAdList]: {
      screen: EditList,
      navigationOptions: {tabBarLabel: 'Ads'},
    },
    [RouteNames.EditArticlesList]: {
      screen: EditArticleList,
      navigationOptions: {tabBarLabel: 'Articles'},
    },
    [RouteNames.EditPhotoList]: {
      screen: EditPhotoList,
      navigationOptions: {tabBarLabel: 'Photos'},
    },
  },
  EditTopNavConfig,
);

const EditStack = createStackNavigator(
  {
    [RouteNames.EditTabs]: {
      screen: EditTopNavigatior,
      title: 'Edit',

      navigationOptions: {
        swipeEnabled: true,

        tabBarOptions: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
    [RouteNames.EditAd]: {
      screen: EditAd,
    },
    [RouteNames.EditArticle]: {
      screen: EditArticle,
    },
    [RouteNames.EditPhoto]: {
      screen: EditPhoto,
    },
  },
  EditConfig,
);

const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    [RouteNames.IssueStack]: {
      screen: IssueStack,
      navigationOptions: {tabBarLabel: 'Home'},
    },

    [RouteNames.EditStack]: {
      screen: EditStack,
      params: {id: 321},
      navigationOptions: {tabBarLabel: 'Edit'},
    },
    [RouteNames.PaymentStack]: {
      screen: PaymentStack,
      navigationOptions: {tabBarLabel: 'Payments'},
    },
  },
  BottomTabConfig,
);

const AppNavigator = createAppContainer(bottomTabNavigator);

const styles = StyleSheet.create({
  issueList: {},
});
