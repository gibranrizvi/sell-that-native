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

// Local imports
import layout from '../constants/layout';

// Component imports

// Constants
const { height, width } = layout.window;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const IS_IPHONE_X = height === 812 || height === 896;
const EXPANDED_HEADER_HEIGHT = height / 5;
const COLLAPSED_HEADER_HEIGHT = STATUS_BAR_HEIGHT + 82;
const SCROLL_DISTANCE = EXPANDED_HEADER_HEIGHT - COLLAPSED_HEADER_HEIGHT;

// HomeScreen component
const HomeScreen = props => {
  return <SafeAreaView style={styles.root}></SafeAreaView>;
};

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', backgroundColor: 'white' },
  bodyScrollView: {
    paddingTop: IS_IPHONE_X ? 40 : 20
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
