import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// TODO Get notifications from context

const TabBarIconWithBadge = ({ name, focused }) => {
  const unread = true;

  return (
    <View>
      <Ionicons name={name} size={30} color={focused ? '#333' : 'grey'} />
      {unread && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: -6,
            height: 12,
            width: 12,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: 'orangered'
          }}
        />
      )}
    </View>
  );
};

export default TabBarIconWithBadge;
