import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ButtonRounded from '../button-rounded/ButtonRounded';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';

const PostComments = ({ postId, comments, user, postsRef, navigation }) => {
  const removeComment = commentIdToBeRemoved => {
    const postRef = postsRef.doc(`${postId}`);

    updatedComments = comments.filter(
      ({ comment_id }) => comment_id !== commentIdToBeRemoved
    );

    return postRef.update({ comments: updatedComments });
  };

  const renderComments = () =>
    comments.map(({ comment_id, commented_at, commented_by, text }, index) => {
      const { id, first_name, last_name, profile_picture } = commented_by;
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            paddingVertical: 4
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ButtonRounded
              onPress={() => navigation.navigate('Profile')}
              image={profile_picture}
              size={32}
              noShadow
            />
          </View>
          <View
            style={{
              flex: 8,
              justifyContent: 'space-between',
              marginHorizontal: 8,
              paddingHorizontal: 8,
              paddingVertical: 8,
              backgroundColor: 'royalblue',
              borderRadius: 4
            }}
          >
            <Text style={{ fontSize: 12, marginBottom: 2, color: 'white' }}>
              <Text style={{ fontWeight: '800' }}>
                {first_name} {last_name}{' '}
              </Text>
              <Text
                style={{
                  fontStyle: 'italic',
                  color: 'white',
                  fontWeight: '500'
                }}
              >
                wrote {formatDistanceToNow(commented_at)} ago
              </Text>
            </Text>
            <Text style={{ fontSize: 12, color: 'white', fontWeight: '600' }}>
              {text}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => id === user.id && removeComment(comment_id)}
            >
              <View>
                {id === user.id ? (
                  <Ionicons
                    name="ios-trash"
                    size={24}
                    color="#555"
                    style={{ alignSelf: 'center' }}
                  />
                ) : (
                  <Ionicons
                    name="ios-more"
                    size={24}
                    color="#555"
                    style={{ alignSelf: 'center' }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    });

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingBottom: 12
      }}
    >
      {renderComments(comments)}
    </View>
  );
};

export default PostComments;
