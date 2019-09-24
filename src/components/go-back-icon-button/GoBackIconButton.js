import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GoBackIconButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        left: Platform.OS === 'android' ? 16 : 12,
        bottom: Platform.OS === 'android' ? -2 : 0
      }}
    >
      <Ionicons
        name="ios-close"
        color="#333"
        size={36}
        style={{ alignSelf: 'center' }}
      />
    </View>
  </TouchableOpacity>
);

export default GoBackIconButton;
