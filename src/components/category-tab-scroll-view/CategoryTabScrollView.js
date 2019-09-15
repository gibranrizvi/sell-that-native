import React from 'react';
import { ScrollView } from 'react-native';

// Component imports
import CategoryTabItem from '../category-tab-item/CategoryTabItem';

const CategoryTabScrollView = ({ tabs, selected, onSelectCategory }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {tabs.map((tab, index) => (
        <CategoryTabItem
          key={index}
          name={tab.name}
          first={index === 0}
          last={index === tabs.length - 1}
          onPress={() => {}}
          selected={selected}
          onSelectCategory={onSelectCategory}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryTabScrollView;
