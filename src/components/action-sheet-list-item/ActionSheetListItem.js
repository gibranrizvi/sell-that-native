import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActionSheetListItem = ({ text, icon, color, textStyle }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {icon && <Ionicons name={icon} size={28} color={color} />}
      <Text
        style={{
          ...textStyle,
          color,
          marginLeft: 8,
          fontSize: 18
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default ActionSheetListItem;
