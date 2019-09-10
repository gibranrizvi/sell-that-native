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
import TabBarIconWithBadge from '../components/tab-bar-icon-with-badge/TabBarIconWithBadge';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
};

HomeStack.path = '';

const CreateStack = createStackNavigator(
  {
    Create: CreateScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  },
  config
);

CreateStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={focused ? 'md-add-circle-outline' : 'ios-add-circle-outline'}
    />
  )
};

CreateStack.path = '';

const InboxStack = createStackNavigator(
  {
    Inbox: InboxScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  },
  config
);

InboxStack.navigationOptions = {
  tabBarLabel: 'Inbox',
  tabBarIcon: ({ focused }) => (
    <TabBarIconWithBadge focused={focused} name="md-mail" />
  )
};

InboxStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    CreateStack,
    InboxStack
  },
  {
    initialRouteName: 'InboxStack',
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: 'white',
        opacity: 0.95,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      }
    }
  }
);

tabNavigator.path = '';

export default tabNavigator;
