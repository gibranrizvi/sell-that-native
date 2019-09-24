import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabBarIcon({ name, focused }) {
  return <Ionicons name={name} size={28} color={focused ? 'black' : '#555'} />;
}
