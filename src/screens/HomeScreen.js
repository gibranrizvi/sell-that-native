import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Animated
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

  let animation = useRef(new Animated.Value(0)).current;
  let postRefs = useRef({}).current;

  const [posts, setPosts] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postOverlayExpanded, setPostOverlayExpanded] = useState(false);
  const [postPosition, setPostPosition] = useState(0);
  const [postHeight, setPostHeight] = useState(0);
  const [commentText, setCommentText] = useState('');

  const postsRef = firestore.collection('posts');
  const { push } = navigation;

  useEffect(() => {
    const unsubscribe = getPosts();

    return () => unsubscribe();
  }, []);

  const getPosts = () => {
    const unsubscribe = postsRef
      .orderBy('created_at', 'desc')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });

        setPosts(posts);
      });

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
        ...likes,
        {
          liked_at: Date.now(),
          liked_by: { id, first_name, last_name, profile_picture }
        }
      ];
    }

    return postRef.update({ likes: updatedLikes });
  };

  const checkIfLiked = likes => {
    return likes.filter(({ liked_by }) => liked_by.id === user.id).length === 1;
  };

  const openPost = (postId, index) => {
    setPostOverlayExpanded(true);
    setSelectedPost(postId);

    postRefs[index].measure((fx, fy, width, height, px, py) => {
      console.log('Component width is: ' + width);
      console.log('Component height is: ' + height);
      console.log('X offset to frame: ' + fx);
      console.log('Y offset to frame: ' + fy);
      console.log('X offset to page: ' + px);
      console.log('Y offset to page: ' + py);

      // TODO animate post to top of screen
      setPostPosition((py - (IS_IPHONE_X ? 40 : 20)) * -1);
      setPostHeight(height);
    });
  };

  const closePost = () => {
    setSelectedPost(null);
    setPostOverlayExpanded(false);
  };

  const renderPosts = () => {
    return posts.map(
      (
        {
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
        },
        index
      ) => {
        const postLiked = checkIfLiked(likes);
        const postSelected = id === selectedPost;

        return (
          <View
            key={id}
            ref={post => (postRefs[index] = post)}
            style={{
              flex: 1,
              marginTop: 12,
              shadowColor: 'grey',
              shadowRadius: 12,
              shadowOpacity: 0.2,
              backgroundColor: 'white',
              top: postSelected ? postPosition : 0
            }}
          >
            {/* Overlay */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: postSelected ? postHeight : 0,
                backgroundColor: 'white'
              }}
            ></View>

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
                {postOverlayExpanded && postSelected ? (
                  <TouchableOpacity onPress={() => closePost()}>
                    <Ionicons name="ios-arrow-down" color="#555" size={28} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => openPost(id, index)}>
                    <Ionicons name="ios-more" color="#555" size={28} />
                  </TouchableOpacity>
                )}
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
                    openPost(id, index);
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
            {postSelected && (
              <View
                style={{
                  backgroundColor: 'white',
                  height: height - postHeight
                }}
              ></View>
            )}
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
          scrollEnabled={!postOverlayExpanded}
          style={{ zIndex: postOverlayExpanded ? 1001 : 0 }}
          contentContainerStyle={styles.bodyScrollView}
        >
          {user && renderPosts()}
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
