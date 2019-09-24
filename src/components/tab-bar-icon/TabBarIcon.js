import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabBarIcon({ name, focused, size }) {
  return (
    <Ionicons name={name} size={size} color={focused ? 'orangered' : '#555'} />
  );
}
