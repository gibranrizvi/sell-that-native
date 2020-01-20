import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostActions = ({
  user,
  postId,
  likes,
  postLiked,
  openPost,
  postsRef,
  navigation
}) => {
  const { state } = navigation;

  const likeOrUnlikePost = () => {
    const postRef = postsRef.doc(`${postId}`);

    let updatedLikes;

    if (postLiked) {
      updatedLikes = likes.filter(({ liked_by }) => liked_by.id !== user.id);
    } else {
      updatedLikes = [
        ...likes,
        {
          liked_at: Date.now(),
          liked_by: user
        }
      ];
    }

    return postRef.update({ likes: updatedLikes });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12
      }}
    >
      {user && (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => likeOrUnlikePost()}>
            <View>
              {postLiked ? (
                <Ionicons name="ios-heart" color="orangered" size={28} />
              ) : (
                <Ionicons name="ios-heart-empty" color="#555" size={28} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() =>
            state.routeName === 'Post'
              ? {
                  // TODO open keyboard
                }
              : openPost()
          }
        >
          <Ionicons name="ios-chatbubbles" color="#555" size={28} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 8 }} />
    </View>
  );
};

export default PostActions;
