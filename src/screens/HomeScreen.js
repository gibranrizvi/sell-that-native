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
import { formatDistanceToNow } from 'date-fns';

// Local imports
import layout from '../constants/layout';
import { FirebaseContext } from '../firebase';

// Component imports
import Header from '../components/home-screen/Header';
import { MonoText } from '../components/styled-text/StyledText';
import ButtonRounded from '../components/button-rounded/ButtonRounded';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const unsubscribe = postsRef
      .orderBy('created_at', 'desc')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });

        setPosts(posts);
      });
    // setPosts([
    //   {
    //     category: 'Clothing & Accessories',
    //     condition: 'Brand new',
    //     created_at: 1568766697534,
    //     created_by: {
    //       created_at: 1568142656131,
    //       email: 'gibranrzv@gmail.com',
    //       emailVerified: true,
    //       first_name: 'Gibran',
    //       id: 'bqFXaaLx8qcPCEH9ddHO5XBqc282',
    //       last_name: 'Rizvi',
    //       profile_picture:
    //         'https://lh3.googleusercontent.com/a-/AAuE7mDMPtoVJsw1jRawYMyhJCMmqHbzImq1zjHf6HBT=s96-c',
    //       role: 'subscriber',
    //       address: 'Anse aux Pins'
    //     },
    //     id: 'mnhKlM3VbxFyzWTTlz6Z',
    //     images: [
    //       'https://pazzion.shopcadacdn.com/sites/files/pazzion/productimg/201904/pazzion_3723_handbag_blue_front_view_2.jpg',
    //       'https://pazzion.shopcadacdn.com/sites/files/pazzion/productimg/201904/pazzion_3723_handbag_blue_back_view.jpg'
    //     ],
    //     price: '1199.99',
    //     sold: false,
    //     title: 'Blue Pazzion Handbag',
    //     description:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quaerat dolorem magni dolores quae quis ut odit eos eveniet! Quis non deserunt modi nostrum fugit, animi reiciendis necessitatibus quam assumenda.',
    //     likes: [
    //       {
    //         liked_at: 1568142656131,
    //         liked_by: 'bqFXaaLx8qcPCEH9ddHO5XBqc282'
    //       }
    //     ],
    //     comments: [
    //       {
    //         commented_at: 1568142656131,
    //         commented_by: 'bqFXaaLx8qcPCEH9ddHO5XBqc282',
    //         text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    //       }
    //     ]
    //   }
    // ]);
    // const unsubscribe = () => {};

    return unsubscribe;
  };

  const likeOrUnlikePost = (postId, likes, postLiked) => {
    // Find post doc ref
    const postsRef = firestore.collection('posts');
    const postRef = postsRef.doc(`${postId}`);

    let updatedLikes;

    // if postLiked, remove like object from post document
    if (postLiked) {
      updatedLikes = likes.filter(({ liked_by }) => liked_by.id !== user.id);
    } else {
      const { id, first_name, last_name, profile_picture } = user;

      updatedLikes = [
        likes,
        {
          liked_at: Date.now(),
          liked_by: { id, first_name, last_name, profile_picture }
        }
      ];

      return postRef.update({ likes: updatedLikes });
    }

    return postRef.update({ likes: updatedLikes });
  };

  const checkIfLiked = likes => {
    return likes.filter(({ liked_by }) => liked_by.id === user.id).length === 1;
  };

  const renderPosts = () => {
    return posts.map(
      ({
        id,
        created_at,
        created_by,
        images,
        likes,
        comments,
        title,
        category,
        price,
        condition,
        description
      }) => {
        const postLiked = checkIfLiked(likes);

        return (
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
                  image={created_by.profile_picture}
                  size={32}
                  noShadow
                />
              </View>
              <View style={{ flex: 7, justifyContent: 'space-between' }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 12,
                    marginBottom: 2
                  }}
                >
                  {`${created_by.first_name} ${created_by.last_name}`}{' '}
                  <Text style={{ fontWeight: 'normal', color: 'grey' }}>
                    posted {formatDistanceToNow(created_at)} ago
                  </Text>
                </Text>
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
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 12
              }}
            >
              {user && (
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => likeOrUnlikePost(id, likes, postLiked)}
                  >
                    <View style={{ flex: 1 }}>
                      {postLiked ? (
                        <Ionicons
                          name="ios-heart"
                          color="orangered"
                          size={28}
                        />
                      ) : (
                        <Ionicons
                          name="ios-heart-empty"
                          color="#555"
                          size={28}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    // TODO write a comment
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Ionicons name="ios-chatbubbles" color="#333" size={28} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 8 }} />
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
              <Text style={{ fontSize: 12, color: 'grey', marginBottom: 4 }}>
                {likes.length} heart{likes.length !== 1 && 's'}
              </Text>
              <Text
                style={{ fontWeight: '600', fontSize: 12, marginBottom: 4 }}
              >
                {title} - SR {price}
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 4 }}>
                {condition} in{' '}
                <Text style={{ fontStyle: 'italic' }}>{category}</Text>
              </Text>
              <Text
                style={{ fontWeight: '600', fontSize: 12, marginBottom: 4 }}
              >
                {`${created_by.first_name} ${created_by.last_name}`}{' '}
                <Text
                  style={{
                    fontSize: 12,
                    fontStyle: 'italic',
                    fontWeight: 'normal',
                    marginBottom: 4
                  }}
                >
                  {description}
                </Text>
              </Text>
              <Text style={{ fontSize: 12, color: 'grey' }}>
                Read {comments.length} comment{comments.length !== 1 && 's'}
              </Text>
            </View>
          </View>
        );
      }
    );
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
          {renderPosts()}
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
