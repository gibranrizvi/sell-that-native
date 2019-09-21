import React from 'react';
import { View, Text } from 'react-native';

export default ({ title, subtitle }) => {
  return (
    <View style={{ marginVertical: 12 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          color: '#333'
        }}
      >
        {subtitle}
      </Text>
      <Text
        style={{
          fontSize: 36,
          fontWeight: '700',
          color: 'black'
        }}
      >
        {title}
      </Text>
    </View>
  );
};
