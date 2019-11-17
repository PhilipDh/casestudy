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
      params: {title: 'Issues'},
      navigationOptions: ({navigation}) => ({
        //Set the title for the Navigation header based on the navigation param "title"
        title: `${navigation.state.params.title}`,
        headerStyle: {
          backgroundColor: theme.colors.priamry,
        },
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

const AppNavigator = createAppContainer(bottomTabNavigator);

const styles = StyleSheet.create({
  issueList: {},
});

//Navigation stack for the Login page
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

//Navigation stack for the rest of the app
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

//Switch navigator that will not allow a back navigation unlike the Stack
export const SwitchNav = createAppContainer(
  createSwitchNavigator({
    [RouteNames.AuthStack]: AuthStack,
    [RouteNames.HomeStack]: HomeStack,
  }),
);
