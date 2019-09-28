import React from 'react';
import { View } from 'react-native';
import uuidv4 from 'uuid/v4';

import TextInputWithIcon from '../text-input-with-icon/TextInputWithIcon';

const CommentTextInput = ({ post, user, postsRef }) => {
  const [commentText, setCommentText] = React.useState('');

  const addComment = () => {
    const postRef = postsRef.doc(`${post.id}`);

    const { id, first_name, last_name, profile_picture } = user;

    const comment_id = uuidv4();

    const updatedComments = [
      ...post.comments,
      {
        comment_id,
        commented_at: Date.now(),
        commented_by: { id, first_name, last_name, profile_picture },
        text: commentText
      }
    ];

    setCommentText('');

    return postRef.update({ comments: updatedComments });
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <TextInputWithIcon
        value={commentText}
        onChangeText={value => setCommentText(value)}
        onSubmit={() => {
          return addComment();
        }}
        icon="ios-send"
        placeholder="Write a comment..."
        autoCapitalize="sentences"
        multiline
        numberOfLines={3}
        autoCorrect
        noShadow
      />
    </View>
  );
};

export default CommentTextInput;
