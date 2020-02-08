import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  AppState,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Button,
  Animated
} from 'react-native';
import Constants from 'expo-constants';

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
  const [images, setImages] = useState([]);
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
      description,
      images
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

        {/* Product images */}
        <View style={styles.sectionView}>
          <Text style={styles.subHeadingText}>Add images</Text>
          <AddImagesCarousel
            addImage={imageToAdd =>
              images.filter(image => image === imageToAdd).length === 0
                ? setImages([...images, imageToAdd])
                : alert(
                    'You have already added this image, please select another'
                  )
            }
            removeImage={imageToBeRemoved => {
              const filteredImages = images.filter(
                image => image !== imageToBeRemoved
              );
              return setImages(filteredImages);
            }}
            images={images}
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
          <Text style={styles.subHeadingText}>Select item condition</Text>
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
          <Text style={styles.subHeadingText}>Write a short description</Text>
          <View style={styles.formFieldsView}>
            <TextInputField
              value={description}
              onChangeText={value => setDescription(value)}
              placeholder="Description"
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
    fontSize: 14
  },
  categoryScrollView: {
    marginVertical: 8
  },
  formFieldsView: {
    marginHorizontal: 12
  }
});

export default CreateScreen;
