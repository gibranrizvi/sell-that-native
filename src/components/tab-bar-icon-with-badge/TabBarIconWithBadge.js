import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// TODO Get notifications from context

const TabBarIconWithBadge = ({ name, focused }) => {
  return (
    <View style={{ width: 48 }}>
      <Ionicons
        name={name}
        size={28}
        style={{ marginTop: 2, alignSelf: 'center' }}
        color={focused ? 'tomato' : 'grey'}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          position: 'absolute',
          top: 2,
          right: 0,
          height: 20,
          width: 20,
          borderRadius: 10,
          backgroundColor: '#BB2509'
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            fontWeight: '700',
            alignSelf: 'center'
          }}
        >
          12
        </Text>
      </View>
    </View>
  );
};

export default TabBarIconWithBadge;
