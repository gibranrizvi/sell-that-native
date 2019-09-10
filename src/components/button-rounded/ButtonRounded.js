import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ButtonRounded = ({ onPress, type, icon, color, image, size }) => {
  const renderImage = () => {
    return (
      <Image
        source={
          image === 'default'
            ? require('../../../assets/images/robot-prod.png')
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
          borderRadius: size / 4
        }}
      >
        {type === 'image' && renderImage()}
        {type === 'icon' && (
          <Ionicons
            name={icon}
            size={size / 1.6}
            color={color}
            style={{ alignSelf: 'center', paddingTop: 2 }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  ) : null;
};

const styles = StyleSheet.create({
  touchableView: {
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    backgroundColor: 'white',
    elevation: 20
  },
  touchableImage: {
    resizeMode: 'cover'
  }
});

export default ButtonRounded;
