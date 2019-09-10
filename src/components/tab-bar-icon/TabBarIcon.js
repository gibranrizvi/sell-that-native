import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../constants/colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? colors.tabIconSelected : colors.tabIconDefault}
    />
  );
}
