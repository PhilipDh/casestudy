/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import IssueList from './screens/Issues/IssueList';
import PaymentList from './screens/Payments/PaymentList';
import PaymentDetailsScreen from './screens/Payments/PaymentDetails';
import EditList from './screens/Edit/EditList';
import EditAdScreen from './screens/Edit/EditAdScreen';
import EditArticleList from './screens/Edit/EditArticleList';
import EditPhotoList from './screens/Edit/EditPhotoList';
import EditArticleScreen from './screens/Edit/EditArticleScreen';
import EditPhotoScreen from './screens/Edit/EditPhotoScreen';
import AddAdScreen from './screens/Add/AddAdScreen';
import AddArticle from './screens/Add/AddArticleScreen';
import AddPhoto from './screens/Add/AddPhotoScreen';
import UserLogin from './screens/Login/UserLogin';
import theme from '../styles/main.theme.js';
import Title from './components/Title';
import {
  PaymentConfig,
  IssueConfig,
  EditConfig,
  EditTopNavConfig,
  BottomTabConfig,
} from './config/routes.config';
import RouteNames from './RouteNames';

const PaymentStack = createStackNavigator(
  {
    [RouteNames.PaymentList]: {
      screen: PaymentList,
      params: {issueTitle: 'Payments'},
    },
    [RouteNames.PaymentDetails]: {
      screen: PaymentDetailsScreen,
      params: {data: 'dest'},
    },
  },
  PaymentConfig,
);

//Navigation options to hide the bottom bar on certain screens
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
      //params: {title: 'Issues'},

      navigationOptions: ({navigation}) => ({
        //Set the title for the Navigation header based on the navigation param "title"
        //title: `${navigation.state.params.title}`,
        //title: <Title />,
        headerTitle: <Title />,
      }),
    },
  },
  IssueConfig,
);

//Top tab navigator to navigate to the different Edit screens
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
    },
    [RouteNames.EditAd]: {
      screen: EditAdScreen,
      navigationOptions: ({navigation}) => ({
        //Set the title for the Navigation header based on the navigation param "title"
        title: 'Edit Ad',
      }),
    },
    [RouteNames.EditArticle]: {
      screen: EditArticleScreen,
      navigationOptions: ({navigation}) => ({
        //Set the title for the Navigation header based on the navigation param "title"
        title: 'Edit Article',
      }),
    },
    [RouteNames.EditPhoto]: {
      screen: EditPhotoScreen,
      navigationOptions: ({navigation}) => ({
        //Set the title for the Navigation header based on the navigation param "title"
        title: 'Add Photograph',
      }),
    },
    [RouteNames.AddAd]: {
      screen: AddAdScreen,
      navigationOptions: ({navigation}) => ({
        //Set the title for the Navigation header based on the navigation param "title"
        title: 'Add an Ad',
      }),
    },
    [RouteNames.AddArticle]: {
      screen: AddArticle,
      navigationOptions: ({navigation}) => ({
        //Set the title for the Navigation header based on the navigation param "title"
        title: 'Add an Article',
      }),
    },
    [RouteNames.AddPhoto]: {
      screen: AddPhoto,
      navigationOptions: ({navigation}) => ({
        //Set the title for the Navigation header based on the navigation param "title"
        title: 'Add a Photograph',
      }),
    },
  },
  EditConfig,
);

//Bottom tab navigator to navigate between Edit,Issue and Payment
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

//Navigation stack for the Login page
const AuthStack = createStackNavigator(
  {
    [RouteNames.Login]: {
      screen: UserLogin,
    },
  },
  {
    //Hide the header for the User login
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
      screen: bottomTabNavigator,
      params: {issueTitle: 'No'},
    },
  },
  {
    //Hide header
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

//Switch navigator that will not allow a back navigation unlike the Stack
const SwitchNav = createSwitchNavigator({
  //  [RouteNames.AuthStack]: AuthStack,
  [RouteNames.HomeStack]: HomeStack,
});

//Export the Switch Nav as the App Container
export const AppNavigator = createAppContainer(SwitchNav);
