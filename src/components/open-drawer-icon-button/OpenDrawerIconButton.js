import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OpenDrawerIconButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        right: Platform.OS === 'android' ? 16 : 12,
        bottom: Platform.OS === 'android' ? -2 : 0
      }}
    >
      <Ionicons
        name="ios-menu"
        color="#333"
        size={28}
        style={{ alignSelf: 'center' }}
      />
    </View>
  </TouchableOpacity>
);

export default OpenDrawerIconButton;
