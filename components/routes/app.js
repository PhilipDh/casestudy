import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomNavigation, Appbar, withTheme} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import IssueList from '../IssueList';
import PaymentList from '../PaymentList';
import PaymentDetails from '../PaymentDetails';
import EditList from '../edit/EditList';
import EditAd from '../edit/EditAd';
import EditArticleList from '../edit/EditArticleList';
import EditPhotoList from '../edit/EditPhotoList';
import EditArticle from '../edit/EditArticle';
import EditPhoto from '../edit/EditPhoto';
import theme from '../../styles/main.theme.js';
import UserLogin from '../login/UserLogin';
import HomeRoutes from './home.routes';

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

const Router = createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    Home: HomeRoutes,
  }),
);

export default Router;
