import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LikesModal from '../likes-modal/LikesModal';

const PostDetails = ({
  postId,
  title,
  category,
  price,
  condition,
  description,
  likes,
  created_by,
  numberOfComments,
  openPost,
  navigation
}) => {
  const { navigate } = navigation;

  return (
    <View
      style={{
        paddingBottom: 8,
        paddingHorizontal: 12
      }}
    >
      <LikesModal likes={likes} navigation={navigation} />

      <TouchableOpacity onPress={() => openPost()}>
        <Text style={{ fontWeight: '600', fontSize: 12, marginBottom: 4 }}>
          {title} - SR {price}
        </Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: '600', fontSize: 12, marginBottom: 4 }}>
        {condition} in{' '}
        <Text
          onPress={() => navigate('Category', { category: 'Electronics' })}
          style={{ fontStyle: 'italic' }}
        >
          {category}
        </Text>
      </Text>

      {/* TODO link to  */}
      <Text style={{ fontWeight: '600', fontSize: 12, marginBottom: 4 }}>
        {`${created_by.first_name} ${created_by.last_name}`}{' '}
        <Text
          style={{
            fontSize: 12,
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
          {numberOfComments === 0
            ? 'Write a comment'
            : `${numberOfComments} comment${numberOfComments !== 1 ? 's' : ''}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostDetails;
