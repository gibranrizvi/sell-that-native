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
        left: Platform.OS === 'android' ? 12 : 8,
        bottom: Platform.OS === 'android' ? -2 : 0
      }}
    >
      <Ionicons
        name="ios-arrow-back"
        color="black"
        size={28}
        style={{ alignSelf: 'center' }}
      />
    </View>
  </TouchableOpacity>
);

const OpenDrawerIconButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        right: Platform.OS === 'android' ? 12 : 8,
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

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Profile',
        headerLeft: <GoBackIconButton onPress={() => navigation.goBack()} />,
        headerRight: (
          <OpenDrawerIconButton onPress={() => navigation.openDrawer()} />
        )
      };
    }
  }
});

const ProfileDrawerNavigator = createDrawerNavigator(
  {
    Profile: ProfileStack
  },
  {
    drawerPosition: 'right',
    hideStatusBar: true,
    drawerType: 'slide'
  }
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
          ),
          headerLayoutPreset: 'left'
        };
      }
    },
    Post: {
      screen: PostScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Comments',
          headerLeft: <GoBackIconButton onPress={() => navigation.goBack()} />
        };
      }
    },
    Profile: {
      screen: ProfileDrawerNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          header: null
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
        return {
          header: (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
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
          )
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
