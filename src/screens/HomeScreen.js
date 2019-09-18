import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

// Local imports
import layout from '../constants/layout';
import { FirebaseContext } from '../firebase';

// Component imports
import Header from '../components/home-screen/Header';
import { MonoText } from '../components/styled-text/StyledText';
import ButtonRounded from '../components/button-rounded/ButtonRounded';

// Constants
const { height, width } = layout.window;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const IS_IPHONE_X = height === 812 || height === 896;
const EXPANDED_HEADER_HEIGHT = height / 5;
const COLLAPSED_HEADER_HEIGHT = STATUS_BAR_HEIGHT + 82;
const SCROLL_DISTANCE = EXPANDED_HEADER_HEIGHT - COLLAPSED_HEADER_HEIGHT;

// HomeScreen component
const HomeScreen = ({ navigation }) => {
  const { firestore, user } = useContext(FirebaseContext);
  const [posts, setPosts] = useState();

  const postsRef = firestore.collection('posts');
  const { push } = navigation;

  useEffect(() => {
    const unsubscribe = getPosts();

    return () => unsubscribe();
  }, []);

  const getPosts = () => {
    // TODO revert to this
    // const unsubscribe = postsRef
    //   .orderBy('created_at', 'desc')
    //   .onSnapshot(snapshot => {
    //     const posts = snapshot.docs.map(doc => {
    //       return { id: doc.id, ...doc.data() };
    //     });

    //     console.log(posts);
    //     setPosts(posts);
    //   });
    setPosts([
      {
        category: 'Fashion',
        condition: 'Brand new',
        created_at: 1568766697534,
        created_by: {
          created_at: 1568142656131,
          email: 'gibranrzv@gmail.com',
          emailVerified: true,
          first_name: 'Gibran',
          id: 'bqFXaaLx8qcPCEH9ddHO5XBqc282',
          last_name: 'Rizvi',
          profile_picture:
            'https://lh3.googleusercontent.com/a-/AAuE7mDMPtoVJsw1jRawYMyhJCMmqHbzImq1zjHf6HBT=s96-c',
          role: 'subscriber',
          address: 'Anse aux Pins'
        },
        id: 'mnhKlM3VbxFyzWTTlz6Z',
        images: [
          'https://pazzion.shopcadacdn.com/sites/files/pazzion/productimg/201904/pazzion_3723_handbag_blue_back_view.jpg',
          'https://pazzion.shopcadacdn.com/sites/files/pazzion/productimg/201904/pazzion_3723_handbag_blue_front_view_2.jpg'
        ],
        price: '112',
        sold: true,
        title: 'Handbag',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quaerat dolorem magni dolores quae quis ut odit eos eveniet! Quis non deserunt modi nostrum fugit, animi reiciendis necessitatibus quam assumenda.'
      }
    ]);

    const unsubscribe = () => {};

    return unsubscribe;
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <Header navigation={navigation} />
      {/* Posts */}
      {!posts ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator
            size="small"
            color="black"
            style={{ marginBottom: 8 }}
          />
          <MonoText>Loading posts</MonoText>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.bodyScrollView}
        >
          {posts.map(({ id, created_by, images, title, description }) => (
            <View
              key={id}
              style={{
                flex: 1,
                marginTop: 12,
                shadowColor: 'grey',
                shadowRadius: 12,
                shadowOpacity: 0.2,
                backgroundColor: 'white'
              }}
            >
              {/* Post header */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 12
                }}
              >
                <View style={{ flex: 1 }}>
                  <ButtonRounded
                    onPress={() => push('Profile')}
                    type="image"
                    image={created_by.profile_picture}
                    size={32}
                    noShadow
                  />
                </View>
                <View style={{ flex: 7, justifyContent: 'space-between' }}>
                  <Text
                    style={{ fontWeight: '600', fontSize: 12, marginBottom: 2 }}
                  >{`${created_by.first_name} ${created_by.last_name}`}</Text>
                  <Text style={{ fontSize: 12 }}>{created_by.address}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Ionicons name="ios-more" color="#555" size={28} />
                </View>
              </View>

              {/* Post image carousel */}
              <View style={{ flex: 6 }}>
                <ScrollView horizontal pagingEnabled>
                  {images.map((image, index) => (
                    <View key={index} style={{ height: 240, width }}>
                      <Image
                        source={{ uri: image }}
                        style={{
                          flex: 1,
                          height: null,
                          width: null
                        }}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>

              {/* Post actions */}
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 12
                }}
              >
                <Ionicons name="ios-heart" color="#555" size={28} />
              </View>

              {/* Post information */}
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingBottom: 8,
                  paddingHorizontal: 12
                }}
              >
                <Text
                  style={{ fontWeight: '600', fontSize: 12, marginBottom: 2 }}
                >
                  {title}
                </Text>
                <Text style={{ fontSize: 12 }}>{description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'white' },
  bodyScrollView: {
    paddingTop: 64, // TODO this is hard-coded
    paddingBottom: 64
  }
});

export default HomeScreen;
