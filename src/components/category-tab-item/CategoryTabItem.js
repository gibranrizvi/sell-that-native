import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import layout from '../../constants/layout';

const { width, height } = layout.window;

const CategoryTabItem = ({ name, first, last, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          padding: 8,
          margin: 2,
          marginLeft: first ? 18 : 4,
          marginRight: last && 20,
          borderRadius: 4,
          backgroundColor: '#F5F5F5',
          opacity: 1
        }}
      >
        <Text style={{ color: 'tomato', fontSize: 16, fontWeight: '600' }}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 48
  },
  featuredHeadingView: {
    marginBottom: 10
  },
  featuredText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'tomato'
  },
  featuredTitleText: { fontWeight: '400', fontSize: 18, color: '#333' },
  featuredContentText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#999'
  },
  imageView: {
    flex: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    backgroundColor: 'grey',
    elevation: 20,
    borderRadius: 6
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 6
  }
});

export default CategoryTabItem;
