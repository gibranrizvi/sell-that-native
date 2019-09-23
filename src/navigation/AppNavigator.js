import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import AuthScreen from '../screens/AuthScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OpenDrawerButton from '../components/open-drawer-button/OpenDrawerButton';

const AppStackNavigator = createStackNavigator({
  Main: MainTabNavigator
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Profile',
        headerRight: (
          <OpenDrawerButton onPress={() => navigation.openDrawer()} />
        )
      };
    }
  }
});

const AppDrawerNavigator = createDrawerNavigator(
  {
    Main: AppStackNavigator,
    ProfileStack: ProfileStack
  },
  {
    drawerPosition: 'right',
    hideStatusBar: true,
    drawerType: 'slide'
  }
);

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    Main: AppDrawerNavigator
  })
);
