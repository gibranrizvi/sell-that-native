import React from 'react';
import { Platform, View, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import InboxScreen from '../screens/InboxScreen';
import TabBarIcon from '../components/tab-bar-icon/TabBarIcon';
import TabBarIconWithBadge from '../components/tab-bar-icon-with-badge/TabBarIconWithBadge';
import PostScreen from '../screens/PostScreen';
import { LogoText } from '../components/styled-text/StyledText';
import { Ionicons } from '@expo/vector-icons';
import OpenDrawerButton from '../components/open-drawer-button/OpenDrawerButton';

const GoBackIconButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ marginLeft: 8 }}>
      <Ionicons
        name="ios-arrow-back"
        color="black"
        size={28}
        style={{ alignSelf: 'center' }}
      />
    </View>
  </TouchableOpacity>
);

export const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: (
            <LogoText
              style={{
                fontSize: 28,
                color: 'orangered',
                marginHorizontal: 12,
                bottom: Platform.OS === 'android' ? -4 : 0
              }}
            >
              Sell that
            </LogoText>
          ),
          headerRight: (
            <OpenDrawerButton onPress={() => navigation.openDrawer()} />
          )
        };
      }
    },
    Post: {
      screen: PostScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Post',
          headerRight: (
            <OpenDrawerButton onPress={() => navigation.openDrawer()} />
          ),
          headerLeft: <GoBackIconButton onPress={() => navigation.goBack()} />
        };
      }
    }
  },
  {
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name="md-home" />
      )
    },
    headerMode: 'float',
    headerTransitionPreset: 'uikit',
    headerBackTitleVisible: false,
    cardOverlayEnabled: true
  }
);

const CreateStack = createStackNavigator(
  {
    Create: {
      screen: CreateScreen,
      navigationOptions: ({ navigation }) => {
        return { header: null };
      }
    }
  },
  {
    navigationOptions: {
      tabBarLabel: 'Create',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={focused ? 'md-add-circle-outline' : 'ios-add-circle-outline'}
        />
      )
    }
  }
);

const InboxStack = createStackNavigator(
  {
    Inbox: {
      screen: InboxScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Inbox',
          headerRight: (
            <OpenDrawerButton onPress={() => navigation.openDrawer()} />
          )
        };
      }
    }
  },
  {
    navigationOptions: {
      tabBarLabel: 'Inbox',
      tabBarIcon: ({ focused }) => (
        <TabBarIconWithBadge focused={focused} name="md-mail" />
      )
    }
  }
);

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
    lazy: false,
    tabBarOptions: {
      showLabel: false
    }
  }
);

MainTabNavigator.path = '';

export default MainTabNavigator;
