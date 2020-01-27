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

// MainDrawerNavigator
const MainDrawerNavigator = createDrawerNavigator(
  {
    Main: MainTabNavigator
  },
  {
    navigationOptions: () => {
      return {
        header: null
      };
    },
    drawerPosition: 'right',
    hideStatusBar: true,
    drawerType: 'slide'
  }
);

const AppStackNavigator = createStackNavigator({
  // Main: MainDrawerNavigator
  Main: MainTabNavigator
});

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    Main: MainTabNavigator
  })
);
