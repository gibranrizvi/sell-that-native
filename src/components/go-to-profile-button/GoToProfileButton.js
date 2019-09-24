import React from 'react';
import { Platform } from 'react-native';

import ButtonRounded from '../button-rounded/ButtonRounded';

const GoToProfileButton = ({ onPress }) => (
  <ButtonRounded
    size={28}
    style={{
      right: Platform.OS === 'android' ? 12 : 8,
      bottom: Platform.OS === 'android' ? -2 : 0
    }}
    onPress={onPress}
  />
);

export default GoToProfileButton;
