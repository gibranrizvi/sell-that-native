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

// Local imports
import layout from '../constants/layout';
import { FirebaseContext } from '../firebase';

// Component imports
import Heading from '../components/heading/Heading';
import CategoryTabScrollView from '../components/category-tab-scroll-view/CategoryTabScrollView';
import TextInputField from '../components/text-input-field/TextInputField';
import ButtonStandard from '../components/button-standard/ButtonStandard';
import { createPostDocument } from '../firebase/firebase';
import TextInputMaskField from '../components/text-input-mask-field/TextInputMaskField';
import AddImagesCarousel from '../components/add-images-carousel/AddImagesCarousel';

// Constants
const { height, width } = layout.window;
const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const CreateScreen = ({ navigation }) => {
  const { user } = useContext(FirebaseContext);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([
    'https://hnsfpau.imgix.net/5/images/detailed/100/iPhone-11-Pro-Grey-01.jpg'
  ]);
  const [loading, setLoading] = useState(false);

  const submitPost = () => {
    setLoading(true);

    if (!title) {
      return alert('Please enter a title');
    } else if (!category) {
      return alert('Please choose a category');
    } else if (!price) {
      return alert('Please set a price');
    } else if (!condition) {
      return alert('Please enter the condition of your item');
    }

    const newPost = {
      title,
      category,
      price,
      condition,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus rem doloribus, adipisci pariatur sint ipsum voluptatem neque amet.',
      images: [
        'https://hnsfpau.imgix.net/5/images/detailed/100/iPhone-11-Pro-Grey-01.jpg',
        'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6341/6341561_sd.jpg',
        'http://cdn.iphonehacks.com/wp-content/uploads/2019/09/iphone11-pro-unboxing6.jpg'
      ]
    };

    createPostDocument(newPost, user).then(() => {
      setTitle('');
      setCategory('');
      setPrice('');
      setCondition('');
      setDescription('');
      setImages([]);
      setLoading(false);
      return navigation.navigate('Home');
    });
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
          <Text style={styles.subHeadingText}>Enter a title</Text>
          <View style={styles.formFieldsView}>
            <TextInputField
              value={title}
              onChangeText={value => setTitle(value)}
              placeholder="What are you selling? *"
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
              { name: 'Clothes' },
              { name: 'Accessories' },
              { name: 'Vehicles & Parts' },
              { name: 'Health & Beauty' },
              { name: 'Real Estate' },
              { name: 'Home & Garden' },
              { name: 'Sporting Goods' },
              { name: 'Miscellaneous' }
            ]}
            selected={category}
            onSelectCategory={value => setCategory(value)}
          />
        </View>

        {/* Product price */}
        <View style={styles.sectionView}>
          <Text style={styles.subHeadingText}>Enter a price</Text>
          <View style={styles.formFieldsView}>
            <TextInputMaskField
              type="money"
              options={{
                precision: 2,
                separator: '.',
                delimiter: ',',
                unit: 'SR ',
                suffixUnit: ''
              }}
              value={price}
              onChangeText={value => setPrice(value)}
              placeholder="SR 0.00 *"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Product condition */}
        <View style={styles.sectionView}>
          <Text style={styles.subHeadingText}>Item condition</Text>
          <View style={styles.formFieldsView}>
            <TextInputField
              value={condition}
              onChangeText={value => setCondition(value)}
              placeholder="Condition *"
            />
          </View>
        </View>

        {/* Product description */}
        <View style={styles.sectionView}>
          <Text style={styles.subHeadingText}>Add a short description</Text>
          <View style={styles.formFieldsView}>
            <TextInputField
              value={description}
              onChangeText={value => setDescription(value)}
              placeholder="Description"
            />
          </View>
        </View>

        {/* Product images */}
        <View style={styles.sectionView}>
          <Text style={styles.subHeadingText}>Add</Text>
          <AddImagesCarousel
            setImages={images => setImages(images)}
            images={images}
          />
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
  bodyScrollView: { marginTop: Platform.OS === 'android' ? 24 : 0 }, // TODO hard-coded value
  sectionView: {
    marginVertical: 2
  },
  subHeadingText: {
    marginHorizontal: 12,
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '500',
    color: 'black',
    fontSize: 12
  },
  categoryScrollView: {
    marginVertical: 8
  },
  formFieldsView: {
    marginHorizontal: 12
  }
});

export default CreateScreen;
