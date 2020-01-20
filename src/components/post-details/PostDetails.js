import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LikesModal from '../likes-modal/LikesModal';

const PostDetails = ({
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
  const { navigate, state } = navigation;

  return (
    <View
      style={{
        paddingBottom: 8,
        paddingHorizontal: 12
      }}
    >
      <LikesModal likes={likes} navigation={navigation} />

      <TouchableOpacity
        onPress={() => openPost()}
        disabled={state.routeName === 'Post'}
      >
        <Text style={{ fontWeight: '600', fontSize: 12, marginBottom: 4 }}>
          {title} - SR {price}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate('Category', { category: 'Electronics' })}
      >
        <Text style={{ fontWeight: '600', fontSize: 12, marginBottom: 4 }}>
          {condition} in <Text style={{ fontStyle: 'italic' }}>{category}</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openPost()}
        disabled={state.routeName === 'Post'}
      >
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
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openPost()}
        disabled={state.routeName === 'Post'}
      >
        <Text
          style={{
            fontSize: 12,
            color: '#555',
            alignSelf: 'flex-start'
          }}
        >
          {numberOfComments === 0
            ? 'Write a comment'
            : `${
                state.routeName === 'Post' ? '' : 'Show '
              }${numberOfComments} comment${numberOfComments !== 1 ? 's' : ''}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostDetails;
