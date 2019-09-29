import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import InboxScreen from '../screens/InboxScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabBarIcon from '../components/tab-bar-icon/TabBarIcon';
import TabBarIconWithBadge from '../components/tab-bar-icon-with-badge/TabBarIconWithBadge';
import PostScreen from '../screens/PostScreen';
import { LogoText } from '../components/styled-text/StyledText';
import GoToProfileButton from '../components/go-to-profile-button/GoToProfileButton';
import GoBackIconButton from '../components/go-back-icon-button/GoBackIconButton';
import OpenDrawerIconButton from '../components/open-drawer-icon-button/OpenDrawerIconButton';

// HomeStack
export const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: (
            <LogoText
              style={{
                fontSize: 32,
                color: 'orangered',
                marginHorizontal: 12,
                bottom: Platform.OS === 'android' ? -4 : 0
              }}
            >
              Sell that
            </LogoText>
          ),
          headerRight: (
            <GoToProfileButton onPress={() => navigation.navigate('Profile')} />
          )
        };
      }
    },
    Post: {
      screen: PostScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Comments',
          headerLeft: <GoBackIconButton onPress={() => navigation.goBack()} />,
          headerStyle: { borderBottomWidth: 0 }
        };
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Profile',
          headerLeft: <GoBackIconButton onPress={() => navigation.goBack()} />,
          headerRight: (
            <OpenDrawerIconButton onPress={() => navigation.openDrawer()} />
          ),
          headerStyle: { borderBottomWidth: 0 }
        };
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { state } = navigation;
      const { routeName } = state.routes[state.index];
      return {
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="ios-today" size={28} />
        ),
        tabBarVisible: routeName === 'Home'
      };
    },
    // TODO come back to this
    mode: 'modal',
    headerMode: 'screen',
    // headerTransitionPreset: 'fade-in-place',
    headerBackTitleVisible: false,
    headerLayoutPreset: 'center'
  }
);

// CreateStack
const CreateStack = createStackNavigator(
  {
    Create: {
      screen: CreateScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTransparent: true,
          headerStyle: {},
          headerRight: (
            <GoToProfileButton onPress={() => navigation.navigate('Profile')} />
          )
        };
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Profile',
          headerLeft: <GoBackIconButton onPress={() => navigation.goBack()} />,
          headerRight: (
            <OpenDrawerIconButton onPress={() => navigation.openDrawer()} />
          ),
          headerStyle: { borderBottomWidth: 0 }
        };
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { state } = navigation;
      const { routeName } = state.routes[state.index];
      return {
        tabBarLabel: 'Create',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name="ios-add-circle-outline"
            size={28}
          />
        ),
        tabBarVisible: routeName === 'Create'
      };
    },
    // TODO come back to this
    mode: 'modal',
    headerMode: 'screen',
    // headerTransitionPreset: 'fade-in-place',
    headerBackTitleVisible: false,
    headerLayoutPreset: 'center'
  }
);

// InboxStack
const InboxStack = createStackNavigator(
  {
    Inbox: {
      screen: InboxScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Inbox',
          headerRight: (
            <GoToProfileButton onPress={() => navigation.navigate('Profile')} />
          ),
          headerStyle: { borderBottomWidth: 0 }
        };
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Profile',
          headerLeft: <GoBackIconButton onPress={() => navigation.goBack()} />,
          headerRight: (
            <OpenDrawerIconButton onPress={() => navigation.openDrawer()} />
          ),
          headerStyle: { borderBottomWidth: 0 }
        };
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { state } = navigation;
      const { routeName } = state.routes[state.index];
      return {
        tabBarLabel: 'Inbox',
        tabBarIcon: ({ focused }) => (
          <TabBarIconWithBadge focused={focused} name="ios-mail" size={28} />
        ),
        tabBarVisible: routeName === 'Inbox'
      };
    },
    // TODO come back to this
    mode: 'modal',
    headerMode: 'screen',
    // headerTransitionPreset: 'fade-in-place',
    headerBackTitleVisible: false,
    headerLayoutPreset: 'center'
  }
);

// MainTabNavigator
const MainTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    CreateStack,
    InboxStack
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        header: null
      };
    },
    resetOnBlur: true,
    lazy: false,
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default MainTabNavigator;
