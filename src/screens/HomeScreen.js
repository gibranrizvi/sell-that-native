import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

// Local imports
import layout from '../constants/layout';
import { FirebaseContext } from '../firebase';

// Component imports
import PostItem from '../components/post-item/PostItem';
import { MonoText } from '../components/styled-text/StyledText';

// Constants
const { height, width } = layout.window;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const IS_IPHONE_X = height === 812 || height === 896;

// HomeScreen component
const HomeScreen = ({ navigation }) => {
  const { firestore, user } = useContext(FirebaseContext);

  const [posts, setPosts] = useState(null);

  const postsRef = firestore.collection('posts');

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

  const renderPosts = () => {
    if (posts.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <MonoText>No posts found</MonoText>
        </View>
      );
    }

    return posts.map((post, index) => {
      return (
        <PostItem
          key={post.id}
          post={post}
          navigation={navigation}
          user={user}
          firestore={firestore}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Posts */}
      {!posts ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
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
          {user && renderPosts()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'white' },
  bodyScrollView: {}
});

export default HomeScreen;
