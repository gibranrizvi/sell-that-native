import React, { useEffect, useState, useRef, useContext } from 'react';
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
  Button,
  Animated
} from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
// import Animated from 'react-native-reanimated';

// Local imports
import layout from '../constants/layout';
import { FirebaseContext } from '../firebase';

// Component imports
import Heading from '../components/heading/Heading';
import CategoryTabScrollView from '../components/category-tab-scroll-view/CategoryTabScrollView';
import TextInputField from '../components/text-input-field/TextInputField';
import ButtonStandard from '../components/button-standard/ButtonStandard';
import { createPostDocument } from '../firebase/firebase';

// Constants
const { height, width } = layout.window;
const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const CreateScreen = () => {
  const { auth, user } = useContext(FirebaseContext);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(null);
  const [condition, setCondition] = useState('');
  const [loading, setLoading] = useState(false);

  const submitPost = () => {
    setLoading(true);

    const newPost = {
      title,
      price,
      category,
      condition,
      images: [
        'https://pazzion.shopcadacdn.com/sites/files/pazzion/productimg/201904/pazzion_3723_handbag_blue_back_view.jpg',
        'https://pazzion.shopcadacdn.com/sites/files/pazzion/productimg/201904/pazzion_3723_handbag_blue_front_view_2.jpg'
      ]
    };

    const postDocRef = createPostDocument(newPost, user);
  };

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

        {/* Submit button */}
        <View style={{ ...styles.sectionView, marginHorizontal: 12 }}>
          <ButtonStandard
            text="Submit"
            onPress={() => submitPost()}
            loading={loading}
            disabled={!title || !price}
          />
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
  bodyScrollView: { marginVertical: 12, paddingBottom: 80 },
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
