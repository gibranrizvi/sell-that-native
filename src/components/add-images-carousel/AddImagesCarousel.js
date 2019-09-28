import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import AddImageItem from '../add-image-item/AddImageItem';

const AddImagesCarousel = ({ setImages, images }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginBottom: 12, marginTop: 8 }}
    >
      {images.map((image, index) => (
        <AddImageItem
          key={index}
          first={index === 0}
          image={image}
          last={index === 2}
        />
      ))}
      {images.length < 3 && <AddImageItem first={images.length === 0} last />}
    </ScrollView>
  );
};

export default AddImagesCarousel;
