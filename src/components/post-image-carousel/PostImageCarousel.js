import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import layout from '../../constants/layout';

const { height, width } = layout.window;

const PostImageCarousel = ({ images }) => {
  return (
    <ScrollView horizontal pagingEnabled>
      {images.map((image, index) => (
        <View key={index} style={{ height: width / 1.5, width }}>
          <Image
            source={{ uri: image }}
            style={{
              flex: 1,
              height: null,
              width: null
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default PostImageCarousel;
