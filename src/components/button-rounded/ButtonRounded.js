import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ButtonRounded = ({ onPress, image, size, noShadow }) => {
  const renderImage = () => {
    return (
      <Image
        source={
          image === 'default'
            ? require('../../../assets/images/robot-dev.png')
            : { uri: image }
        }
        style={[
          styles.touchableImage,
          { height: size, width: size, borderRadius: size / 4 }
        ]}
      />
    );
  };

  return image ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        animation="bounceIn"
        style={{
          ...styles.touchableView,
          height: size,
          width: size,
          borderRadius: size / 4,
          shadowRadius: noShadow ? 0 : 12
        }}
      >
        {renderImage()}
      </View>
    </TouchableWithoutFeedback>
  ) : null;
};

const styles = StyleSheet.create({
  touchableView: {
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    backgroundColor: 'white',
    elevation: 20
  },
  touchableImage: {
    resizeMode: 'cover'
  }
});

export default ButtonRounded;
