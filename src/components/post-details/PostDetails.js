import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const PostDetails = ({
  title,
  category,
  price,
  condition,
  description,
  likes,
  created_by,
  numberOfComments,
  openPost
}) => {
  return (
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
