import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/tab-bar-icon/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import InboxScreen from '../screens/InboxScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

HomeStack.path = '';

const CreateStack = createStackNavigator(
  {
    Create: CreateScreen
  },
  config
);

CreateStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  )
};

CreateStack.path = '';

const InboxStack = createStackNavigator(
  {
    Inbox: InboxScreen
  },
  config
);

InboxStack.navigationOptions = {
  tabBarLabel: 'Inbox',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};

InboxStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CreateStack,
  InboxStack
});

tabNavigator.path = '';

export default tabNavigator;
