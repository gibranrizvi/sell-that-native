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

const AppStackNavigator = createStackNavigator({
  Main: MainTabNavigator
});

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    Main: AppStackNavigator
  })
);
