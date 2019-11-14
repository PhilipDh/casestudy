import RouteNames from './RouteNames';
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

export const PaymentStack = {
  // For each screen that you can navigate to, create a new entry like this:
  [RouteNames.PaymentList]: {
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
  [RouteNames.PaymentDetails]: {
    screen: PaymentDetails,
    params: {data: 'dest'},
  },
};

PaymentStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = true;
  }
  return {
    tabBarVisible,
  };
};

export const IssueStack = {
  // For each screen that you can navigate to, create a new entry like this:
  [RouteNames.IssueList]: {
    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: IssueList,
    params: {title: 'Issues'},

    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.title}`,
      headerStyle: {
        backgroundColor: theme.colors.priamry,
      },
    }),
  },
};

export const EditTopNavigatior = {
  [RouteNames.EditAdList]: {
    screen: EditList,
  },
  [RouteNames.EditArticlesList]: {
    screen: EditArticleList,
  },
  [RouteNames.EditPhotoList]: {
    screen: EditPhotoList,
  },
};

export const EditStack = {
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
};

export const BottomTabRoutes = {
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
};
