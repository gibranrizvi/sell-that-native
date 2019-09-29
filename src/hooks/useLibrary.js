import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const useLibrary = () => {
  const [cameraRollPermissions, setCameraRollPermissions] = useState(null);

  let result;

  useEffect(() => {
    openLibrary();
    return () => {};
  }, []);

  const openLibrary = async () => {
    try {
      if (!cameraRollPermissions) {
        _getCameraRollPermissionAsync();
      }

      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  if (!result.cancelled) {
    return result;
  }
};

export default useLibrary;
