import React, { useEffect, useState, useRef } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
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
import Constants from 'expo-constants';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// Local imports
import layout from '../constants/layout';

// Component imports
import Heading from '../components/heading/Heading';
import CategoryTabScrollView from '../components/category-tab-scroll-view/CategoryTabScrollView';
import TextInputField from '../components/text-input-field/TextInputField';

// Constants
const { height, width } = layout.window;
const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const CreateScreen = () => {
  const [category, setCategory] = React.useState('');
  const [title, setTitle] = React.useState('');

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.headingView}>
        <Heading title="What are you selling?" subtitle="Enter some details" />
      </View>
      <ScrollView contentContainerStyle={styles.bodyScrollView}>
        {/* Product title */}
        <View style={styles.sectionView}>
          <Text style={styles.subHeadingText}>Title</Text>
          <View style={styles.formFieldsView}>
            <TextInputField
              value={title}
              onChangeText={value => setTitle(value)}
              placeholder="What are you selling?"
            />
          </View>
        </View>

        {/* Product category */}
        <View style={styles.sectionView}>
          <Text style={styles.subHeadingText}>Select a category</Text>
          <CategoryTabScrollView
            tabs={[
              { name: 'Electronics' },
              { name: 'Services' },
              { name: 'Vehicles' },
              { name: 'Fashion' },
              { name: 'Health & Beauty' },
              { name: 'Home & Garden' },
              { name: 'Sports' },
              { name: 'Property' },
              { name: 'Miscellaneous' }
            ]}
            selected={category}
            onSelectCategory={value => setCategory(value)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white'
  },
  headingView: {
    marginHorizontal: 12,
    justifyContent: 'center'
  },
  bodyScrollView: {
    marginVertical: 12
  },
  sectionView: {
    marginVertical: 8
  },
  subHeadingText: {
    marginHorizontal: 12,
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '500',
    color: 'black',
    fontSize: 18
  },
  categoryScrollView: {
    marginVertical: 8
  },
  formFieldsView: {
    marginHorizontal: 12
  }
});

export default CreateScreen;
