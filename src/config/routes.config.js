import React, {Component} from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../styles/main.theme.js';
import RouteNames from '../RouteNames';

/*
  Configs for the navigation types
*/

export const PaymentConfig = {
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
    };
  },
  cardStyle: {
    backgroundColor: theme.colors.primary,
    //opacity: 1,
  },
};

export const IssueConfig = {
  defaultNavigationOptions: ({navigation}) => {
    return {
      title: 'Issues',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.setContrast(theme.colors.primary),
      headerTitleStyle: {
        color: theme.setContrast(theme.colors.primary),
      },
    };
  },
  cardStyle: {
    backgroundColor: theme.colors.primary,
  },
};

export const EditConfig = {
  defaultNavigationOptions: ({navigation}) => {
    return {
      title: 'Edit',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.setContrast(theme.colors.primary),
      headerTitleStyle: {
        color: theme.setContrast(theme.colors.primary),
      },
    };
  },
  cardStyle: {
    backgroundColor: theme.colors.primary,
  },
};

export const EditTopNavConfig = {
  defaultNavigationOptions: ({navigation}) => ({}),
  tabBarOptions: {
    style: {
      backgroundColor: theme.colors.primary,
      elevation: 0,
    },
    labelStyle: {
      color: theme.setContrast(theme.colors.primary),
    },
    indicatorStyle: {
      backgroundColor: theme.colors.accent,
    },
  },
  navigationOptions: {},
};

export const BottomTabConfig = {
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      const {routeName} = navigation.state;
      let iconName = '';
      let iconSize = 25;
      if (routeName === RouteNames.IssueStack) {
        iconName = `home`;
      } else if (routeName === RouteNames.EditStack) {
        iconName = `edit`;
      } else if (routeName === RouteNames.PaymentStack) {
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
};
