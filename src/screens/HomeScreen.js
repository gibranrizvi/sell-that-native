import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

// Local imports
import layout from '../constants/layout';
import Header from '../components/home-screen/Header';

// Component imports

// Constants
const { height, width } = layout.window;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const IS_IPHONE_X = height === 812 || height === 896;
const EXPANDED_HEADER_HEIGHT = height / 5;
const COLLAPSED_HEADER_HEIGHT = STATUS_BAR_HEIGHT + 82;
const SCROLL_DISTANCE = EXPANDED_HEADER_HEIGHT - COLLAPSED_HEADER_HEIGHT;

// HomeScreen component
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <Header navigation={navigation} />
      {/* Posts */}
      <ScrollView
        style={{ ...styles.bodyScrollView, flex: 1, backgroundColor: 'grey' }}
      >
        <View style={{ height: width / 3, width, borderWidth: 1 }}></View>
        <View style={{ height: width / 3, width, borderWidth: 1 }}></View>
        <View style={{ height: width / 3, width, borderWidth: 1 }}></View>
        <View style={{ height: width / 3, width, borderWidth: 1 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { backgroundColor: 'white' },
  bodyScrollView: {
    paddingTop: STATUS_BAR_HEIGHT
  },
  cardHeaderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 2
  },
  cardFooterView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    zIndex: 2
  },
  cardTitleText: {
    fontSize: 28,
    fontWeight: '700'
  },
  cardSubtitleText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6
  },
  cardDescriptionText: {
    fontSize: 16,
    fontWeight: '500'
  }
});

export default HomeScreen;
