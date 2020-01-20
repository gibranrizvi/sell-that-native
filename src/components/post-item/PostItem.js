import React from 'react';
import { View } from 'react-native';

import PostHeader from '../post-header/PostHeader';
import PostImageCarousel from '../post-image-carousel/PostImageCarousel';
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
    navigation.navigate('Post', { id });
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
        navigation={navigation}
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
        navigation={navigation}
      />

      {/* Comments area */}
      {showComments && (
        <PostComments
          postId={id}
          comments={comments}
          user={user}
          postsRef={postsRef}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default PostItem;
