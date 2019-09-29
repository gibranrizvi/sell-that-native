import React, { useState } from 'react';
import {
  View,
  Text,
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
  let addImageActionSheet = React.useRef(null).current;
  let removeImageActionSheet = React.useRef(null).current;

  const [cameraPermissions, setCameraPermissions] = useState(null);
  const [cameraRollPermissions, setCameraRollPermissions] = useState(null);

  const _openCamera = async () => {
    try {
      if (!cameraPermissions) {
        await _getCameraPermissionsAsync();
      }

      // if (!cameraRollPermissions) {
      //   await _getCameraRollPermissionsAsync();
      // }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2
      });

      if (!result.cancelled) {
        return addImage(result.uri);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const _openLibrary = async () => {
    try {
      if (!cameraRollPermissions) {
        await _getCameraRollPermissionsAsync();
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2
      });

      if (!result.cancelled) {
        return addImage(result.uri);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const _getCameraPermissionsAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status === 'granted') {
        return setCameraPermissions(true);
      } else if (status !== 'granted') {
        setCameraPermissions(false);
        console.log('Permission to access camera has been denied');
        return Alert.alert(
          'Sell That does not have access to your camera. To enable access, tab Settings and turn on Camera.',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel pressed'),
              style: 'cancel'
            },
            {
              text: 'Settings',
              onPress: () => Linking.openURL('app-settings:')
            }
          ],
          { cancelable: true }
        );
      }
    }
  };

  const _getCameraRollPermissionsAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status === 'granted') {
        return setCameraRollPermissions(true);
      } else if (status !== 'granted') {
        setCameraRollPermissions(false);
        console.log('Permission to access camera roll has been denied');
        return Alert.alert(
          'Sell That does not have access to your photos. To enable access, tab Settings and turn on Photos.',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel pressed'),
              style: 'cancel'
            },
            {
              text: 'Settings',
              onPress: () => Linking.openURL('app-settings:')
            }
          ],
          { cancelable: true }
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
        image ? removeImageActionSheet.show() : addImageActionSheet.show()
      }
      disabled={disabled}
    >
      <ActionSheet
        ref={ref => (addImageActionSheet = ref)}
        options={['Camera', 'Photo Library', 'Cancel']}
        cancelButtonIndex={2}
        onPress={index => {
          if (index === 0) {
            return _openCamera();
          } else if (index === 1) {
            return _openLibrary();
          }
        }}
        tintColor="royalblue"
      />

      <ActionSheet
        ref={ref => (removeImageActionSheet = ref)}
        options={['Remove', 'Cancel']}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={index => {
          if (index === 0) {
            return removeImage(image);
          }
        }}
        tintColor="royalblue"
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
