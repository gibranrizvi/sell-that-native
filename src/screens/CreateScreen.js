import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
  AppState,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

// Local imports
import layout from '../constants/layout';

// Component imports

// Constants
const { height, width } = layout.window;
const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const CreateScreen = () => {
  return <View style={styles.root}></View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CreateScreen;
