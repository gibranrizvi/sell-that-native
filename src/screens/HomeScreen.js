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

// Component imports
import Header from '../components/home-screen/Header';

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
      <ScrollView contentContainerStyle={styles.bodyScrollView}>
        <View
          style={{ height: width / 1.2, marginTop: 12, borderWidth: 1 }}
        ></View>
        <View
          style={{ height: width / 1.2, marginTop: 12, borderWidth: 1 }}
        ></View>
        <View
          style={{ height: width / 1.2, marginTop: 12, borderWidth: 1 }}
        ></View>
        <View
          style={{ height: width / 1.2, marginTop: 12, borderWidth: 1 }}
        ></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { backgroundColor: 'white' },
  bodyScrollView: {
    paddingTop: 64, // TODO this is hard-coded
    paddingBottom: 64
  }
});

export default HomeScreen;
