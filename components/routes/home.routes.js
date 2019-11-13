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

const HomeStack = createStackNavigator(
  {
    // For each screen that you can navigate to, create a new entry like this:
    List: {
      // `ProfileScreen` is a React component that will be the main content of the screen.
      screen: bottomTabNavigator,
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

export default bottomTabNavigator;
