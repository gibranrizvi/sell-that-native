import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

import PostHeader from '../post-header/PostHeader';
import PostImageCarousel from '../post-image-carousel/PostImageCarousel';
import ButtonRounded from '../button-rounded/ButtonRounded';
import TextInputWithIcon from '../text-input-with-icon/TextInputWithIcon';
import { Ionicons } from '@expo/vector-icons';
import CommentTextInput from '../comment-text-input/CommentTextInput';
import PostActions from '../post-actions/PostActions';

const PostItem = ({
  post,
  navigation,
  showComments,
  user,
  firestore,
  noMargin,
  noShadow
}) => {
  const {
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
  } = post;

  const postsRef = firestore.collection('posts');

  const checkIfLiked = likes => {
    return likes.filter(({ liked_by }) => liked_by.id === user.id).length === 1;
  };

  const openPost = () => {
    navigation.navigate('Post', { post });
  };

  const removeComment = (commentIdToBeRemoved, comments) => {
    const postRef = postsRef.doc(`${selectedPost}`);

    updatedComments = comments.filter(
      ({ comment_id }) => comment_id !== commentIdToBeRemoved
    );

    return postRef.update({ comments: updatedComments });
  };

  const renderComments = comments =>
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
              onPress={() =>
                id === user.id && removeComment(comment_id, comments)
              }
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

  const postLiked = checkIfLiked(likes);

  return (
    <View
      key={id}
      style={{
        marginTop: noMargin ? 0 : 8,
        shadowColor: noShadow ? 'white' : 'grey',
        shadowRadius: 12,
        shadowOpacity: 0.2,
        elevation: 12,
        backgroundColor: 'white'
      }}
    >
      {/* Post header */}
      <PostHeader
        openPost={openPost}
        created_at={created_at}
        created_by={created_by}
        navigation={navigation}
      />

      {/* Post image carousel */}
      <PostImageCarousel images={images} />

      {/* Post actions */}
      <PostActions
        user={user}
        id={id}
        likes={likes}
        postLiked={postLiked}
        openPost={openPost}
        postsRef={postsRef}
      />

      {/* Post information */}
      <View
        style={{
          paddingBottom: 8,
          paddingHorizontal: 12
        }}
      >
        {likes.length > 0 && (
          <Text
            style={{
              fontSize: 12,
              color: '#555',
              marginBottom: 4,
              fontStyle: 'italic'
            }}
          >
            {likes.length}{' '}
            {likes.length === 1 ? 'person likes this' : 'people like this'}
          </Text>
        )}
        <Text style={{ fontWeight: '600', fontSize: 12, marginBottom: 4 }}>
          {title} - SR {price}
        </Text>
        <Text style={{ fontSize: 12, marginBottom: 4 }}>
          {condition} in <Text style={{ fontStyle: 'italic' }}>{category}</Text>
        </Text>
        <Text style={{ fontWeight: '600', fontSize: 12, marginBottom: 4 }}>
          {`${created_by.first_name} ${created_by.last_name}`}{' '}
          <Text
            style={{
              fontSize: 12,
              fontStyle: 'italic',
              fontWeight: 'normal'
            }}
          >
            {description}
          </Text>
        </Text>
        <TouchableOpacity onPress={() => openPost()}>
          <Text
            style={{
              fontSize: 12,
              color: '#555',
              fontStyle: 'italic',
              alignSelf: 'flex-start'
            }}
          >
            {comments.length === 0
              ? 'Write a comment'
              : `${comments.length} comment${comments.length !== 1 ? 's' : ''}`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Comments area */}
      {showComments && (
        <View
          style={{
            paddingHorizontal: 12,
            paddingBottom: 12
          }}
        >
          {renderComments(comments)}
        </View>
      )}
    </View>
  );
};

export default PostItem;
