import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';

import layout from '../../constants/layout';

const { height, width } = layout.window;

const PostImageCarousel = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleHorizontalScroll = nativeEvent => {
    const scrollX = nativeEvent.contentOffset.x;

    return setImageIndex(Math.round(scrollX / width));
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => handleHorizontalScroll(nativeEvent)}
        ref={ref => (horizontalScrollView = ref)}
      >
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
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: -26,
          alignSelf: 'center'
        }}
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={{
              height: 6,
              width: 6,
              borderRadius: 3,
              backgroundColor: imageIndex === index ? 'orangered' : '#777',
              marginRight: 4
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default PostImageCarousel;
