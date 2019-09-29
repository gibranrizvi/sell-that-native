import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const useCamera = () => {
  const [cameraPermissions, setCameraPermissions] = useState(null);
  const [cameraRollPermissions, setCameraRollPermissions] = useState(null);

  let result;

  useEffect(async () => {
    console.log('useCamera');
    openCamera();

    return () => {};
  }, []);

  const openCamera = async () => {
    try {
      if (!cameraPermissions) {
        _getCameraPermissionAsync();
      }

      if (!cameraRollPermissions) {
        _getCameraRollPermissionAsync();
      }

      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });
    } catch (error) {
      return console.log(error);
    }
  };

  const _getCameraRollPermissionAsync = async () => {
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

  const _getCameraPermissionAsync = async () => {
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

  if (!result.cancelled) {
    return result;
  }
};

export default useCamera;
