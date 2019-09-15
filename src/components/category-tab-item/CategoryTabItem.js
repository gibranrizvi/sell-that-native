import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import layout from '../../constants/layout';

const { width, height } = layout.window;

const CategoryTabItem = ({ name, first, last, selected, onSelectCategory }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onSelectCategory(name)}>
      <View
        style={{
          padding: 8,
          margin: 2,
          marginLeft: first ? 12 : 4,
          marginRight: last && 12,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: selected === name ? 'orangered' : 'white',
          backgroundColor: selected === name ? 'orangered' : '#FAFAFA',
          opacity: 1
        }}
      >
        <Text
          style={{
            color: selected === name ? 'white' : 'orangered',
            fontSize: 16,
            fontWeight: '600'
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default CategoryTabItem;
