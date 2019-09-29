import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  Platform,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actionsheet';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

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

  const [cameraPermissions, setCameraPermissions] = useState(null);
  const [cameraRollPermissions, setCameraRollPermissions] = useState(null);

  const openCamera = async () => {
    try {
      if (!cameraPermissions) {
        _getCameraPermissionsAsync();
      }

      if (!cameraRollPermissions) {
        _getCameraRollPermissionsAsync();
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });

      if (!result.cancelled) {
        return result.uri;
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const openLibrary = async () => {
    try {
      if (!cameraRollPermissions) {
        _getCameraRollPermissionsAsync();
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1]
      });

      if (!result.cancelled) {
        return result.uri;
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const _getCameraPermissionsAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      setCameraPermissions(status === 'granted');

      if (status !== 'granted') {
        console.log('Permission to access camera has been denied');
        return Alert.alert(
          'Enable Camera Permissions',
          'Go to settings',
          [{ text: 'OK', onPress: () => Linking.openURL('app-settings:') }],
          { cancelable: false }
        );
      }
    }
  };

  const _getCameraRollPermissionsAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      setCameraRollPermissions(status === 'granted');

      if (status !== 'granted') {
        console.log('Permission to access camera roll has been denied');
        return Alert.alert(
          'Enable Camera Roll Permissions',
          'Go to settings',
          [{ text: 'OK', onPress: () => Linking.openURL('app-settings:') }],
          { cancelable: false }
        );
      }
    }
  };

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
            return openCamera();
          } else if (index === 1) {
            return openLibrary();
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
