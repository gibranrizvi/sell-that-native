import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import CommentTextInput from '../components/comment-text-input/CommentTextInput';
import PostItem from '../components/post-item/PostItem';
import { FirebaseContext } from '../firebase';

const PostScreen = ({ navigation }) => {
  const { firestore, user } = React.useContext(FirebaseContext);

  const { post } = navigation.state.params;
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
      <ScrollView
        contentContainerStyle={{
          // TODO fix hard-coded value
          paddingBottom: 32
        }}
      >
        <PostItem
          post={post}
          navigation={navigation}
          user={user}
          firestore={firestore}
          showComments
          noMargin
          noShadow
        />
      </ScrollView>
      <CommentTextInput />
    </SafeAreaView>
  );
};

export default PostScreen;
