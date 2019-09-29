import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import AddImageItem from '../add-image-item/AddImageItem';

const AddImagesCarousel = ({ addImage, removeImage, images }) => {
  const maximumSlots = 5;

  const renderImages = () => {
    return images.map((image, index) => (
      <AddImageItem
        key={index}
        first={index === 0}
        last={index === maximumSlots - 1}
        image={image}
        removeImage={removeImage}
      />
    ));
  };

  const renderPlaceholders = () => {
    const numberOfPlaceholders = maximumSlots - images.length;
    let placeholders = [];
    for (let i = 0; i < numberOfPlaceholders; i++) {
      if (i === 0) {
        placeholders.push(
          <AddImageItem
            key={i}
            first={images.length === 0}
            last={i === numberOfPlaceholders - 1}
            addImage={addImage}
          />
        );
      } else {
        placeholders.push(
          <AddImageItem
            key={i}
            disabled
            last={i === numberOfPlaceholders - 1}
          />
        );
      }
    }

    return placeholders;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginBottom: 12, marginTop: 8 }}
    >
      {images.length >= 1 && renderImages()}
      {images.length < 5 && renderPlaceholders()}
    </ScrollView>
  );
};

export default AddImagesCarousel;
