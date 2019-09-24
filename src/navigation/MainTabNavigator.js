import React from 'react';
import { Platform, View, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import InboxScreen from '../screens/InboxScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabBarIcon from '../components/tab-bar-icon/TabBarIcon';
import TabBarIconWithBadge from '../components/tab-bar-icon-with-badge/TabBarIconWithBadge';
import PostScreen from '../screens/PostScreen';
import { LogoText } from '../components/styled-text/StyledText';
import { Ionicons } from '@expo/vector-icons';
import GoToProfileButton from '../components/go-to-profile-button/GoToProfileButton';

const GoBackIconButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        left: Platform.OS === 'android' ? 16 : 12,
        bottom: Platform.OS === 'android' ? -2 : 0
      }}
    >
      <Ionicons
        name="ios-close"
        color="#333"
        size={36}
        style={{ alignSelf: 'center' }}
      />
    </View>
  </TouchableOpacity>
);

const OpenDrawerIconButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        right: Platform.OS === 'android' ? 16 : 12,
        bottom: Platform.OS === 'android' ? -2 : 0
      }}
    >
      <Ionicons
        name="ios-menu"
        color="black"
        size={28}
        style={{ alignSelf: 'center' }}
      />
    </View>
  </TouchableOpacity>
);

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
                bottom: Platform.OS === 'android' ? -2 : 0
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
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name="ios-today" />
      )
    },
    // TODO come back to this
    mode: 'card',
    headerMode: 'screen',
    headerTransitionPreset: 'fade-in-place',
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
          headerContainerStyles: (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: 'white'
              }}
            />
          ),
          headerRight: (
            <GoToProfileButton onPress={() => navigation.openDrawer()} />
          )
        };
      }
    }
  },
  {
    navigationOptions: {
      tabBarLabel: 'Create',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name="ios-add-circle-outline" />
      )
    }
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
    navigationOptions: {
      tabBarLabel: 'Inbox',
      tabBarIcon: ({ focused }) => (
        <TabBarIconWithBadge focused={focused} name="ios-mail" />
      )
    },
    // TODO come back to this
    mode: 'card',
    headerMode: 'screen',
    headerTransitionPreset: 'fade-in-place',
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
    navigationOptions: () => {
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
