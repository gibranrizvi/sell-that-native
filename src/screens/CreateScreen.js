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
  StatusBar,
  Button
} from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// Local imports
import layout from '../constants/layout';
import { FirebaseContext } from '../firebase';

// Component imports
import Heading from '../components/heading/Heading';
import CategoryTabScrollView from '../components/category-tab-scroll-view/CategoryTabScrollView';
import TextInputField from '../components/text-input-field/TextInputField';

// Constants
const { height, width } = layout.window;
const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const CreateScreen = () => {
  const { auth } = React.useContext(FirebaseContext);

  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [price, setPrice] = React.useState(null);
  const [condition, setCondition] = React.useState('');

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.bodyScrollView}>
        <View style={styles.headingView}>
          <Heading
            title="What are you selling?"
            subtitle="Enter some details"
          />
        </View>
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

        {/* Product price */}
        <View style={styles.sectionView}>
          <Text style={styles.subHeadingText}>Price</Text>
          <View style={styles.formFieldsView}>
            <TextInputField
              value={price}
              onChangeText={value => setPrice(value)}
              placeholder="SR 99.99"
            />
          </View>
        </View>

        {/* Product title */}
        <View style={styles.sectionView}>
          <Text style={styles.subHeadingText}>Condition</Text>
          <View style={styles.formFieldsView}>
            <TextInputField
              value={condition}
              onChangeText={value => setCondition(value)}
              placeholder="Select condition"
            />
          </View>
        </View>

        <Button
          title="Sign Out"
          color="orangered"
          onPress={() => auth.signOut()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'center', backgroundColor: 'white' },
  headingView: {
    marginHorizontal: 12,
    justifyContent: 'center'
  },
  bodyScrollView: { marginVertical: 12 },
  sectionView: {
    marginVertical: 2
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
