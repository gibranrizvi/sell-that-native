import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { FirebaseContext } from '../../firebase';

const ButtonRounded = ({ onPress, image, size, noShadow, style }) => {
  const { user } = React.useContext(FirebaseContext);

  const renderImage = () => {
    let picture;

    if (!image) {
      picture = user.profile_picture;
    } else {
      picture = image;
    }

    return (
      <Image
        source={
          picture === 'default'
            ? require('../../../assets/images/robot-dev.png')
            : { uri: picture }
        }
        style={[
          styles.touchableImage,
          { height: size, width: size, borderRadius: size / 2 }
        ]}
      />
    );
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...styles.touchableView,
          height: size,
          width: size,
          borderRadius: size / 2,
          shadowRadius: noShadow ? 0 : 12,
          ...style
        }}
      >
        {user ? renderImage() : <ActivityIndicator color="#555" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableView: {
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.2,
    backgroundColor: 'white',
    elevation: 20
  },
  touchableImage: {
    resizeMode: 'cover'
  }
});

export default ButtonRounded;
