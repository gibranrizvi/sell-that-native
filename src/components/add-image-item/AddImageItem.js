import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ActionSheet from 'react-native-actionsheet';

import layout from '../../constants/layout';

const { height, width } = layout.window;

const AddImageItem = ({
  first,
  last,
  image,
  disabled,
  addImage,
  removeImage
}) => {
  let actionSheet = React.useRef(null).current;
  let removeImageActionSheet = React.useRef(null).current;

  const renderImage = () => (
    <View
      style={{
        ...styles.container,
        marginLeft: first ? 12 : 0,
        marginRight: last ? 12 : 6,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
        shadowOpacity: 0.4,
        elevation: 6
      }}
    >
      <Image
        source={{
          uri: image
        }}
        style={{
          flex: 1,
          height: null,
          width: null,
          resizeMode: 'cover'
        }}
      />
    </View>
  );

  const renderImagePlaceholder = () => (
    <View
      style={{
        ...styles.container,
        marginLeft: first ? 12 : 0,
        marginRight: last ? 12 : 6,
        borderWidth: 2,
        borderColor: disabled ? '#CCCCCC' : 'grey',
        borderStyle: 'dashed',
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Ionicons
        name="ios-image"
        size={32}
        color={disabled ? '#CCCCCC' : 'grey'}
      />
    </View>
  );

  return (
    <TouchableOpacity
      onPress={() =>
        image ? removeImageActionSheet.show() : actionSheet.show()
      }
      disabled={disabled}
    >
      <ActionSheet
        ref={ref => (actionSheet = ref)}
        title="Select image from"
        options={['Camera', 'Library', 'Cancel']}
        cancelButtonIndex={2}
        onPress={index => {
          if (index === 0) {
            return addImage(
              'http://cdn.iphonehacks.com/wp-content/uploads/2019/09/iphone11-pro-unboxing6.jpg'
            );
          }
        }}
      />
      <ActionSheet
        ref={ref => (removeImageActionSheet = ref)}
        title="Remove this image"
        options={['Remove', 'Cancel']}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={index => {
          if (index === 0) {
            return removeImage(image);
          }
        }}
      />
      {image ? renderImage() : renderImagePlaceholder()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: width / 2,
    width: width / 3
  }
});

export default AddImageItem;
