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
import PostDetails from '../post-details/PostDetails';
import PostComments from '../post-comments/PostComments';

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
        postId={id}
        likes={likes}
        postLiked={postLiked}
        openPost={openPost}
        postsRef={postsRef}
      />

      {/* Post information */}
      <PostDetails
        title={title}
        created_by={created_by}
        category={category}
        price={price}
        condition={condition}
        description={description}
        likes={likes}
        numberOfComments={comments.length}
        openPost={openPost}
      />

      {/* Comments area */}
      {showComments && (
        <PostComments
          postId={id}
          comments={comments}
          user={user}
          postsRef={postsRef}
        />
      )}
    </View>
  );
};

export default PostItem;
