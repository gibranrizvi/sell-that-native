import React, { useRef } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import Animated from 'react-native-reanimated';

// Hook imports
import {
  useButtonPressedAnimation,
  useButtonReleasedAnimation
} from '../../hooks/useButtonAnimation';

const ButtonStandard = ({ disabled, loading, text, onPress }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const buttonPadding = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12]
  });

  const buttonMargin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0]
  });

  return (
    <Animated.View
      style={{
        marginVertical: buttonMargin,
        padding: buttonPadding
      }}
    >
      <Button
        block
        style={{
          backgroundColor: disabled ? 'lightslategrey' : 'slateblue'
        }}
        onPressIn={() => {
          // useButtonPressedAnimation(animation);
        }}
        onPressOut={() => {
          // useButtonReleasedAnimation(animation);
          return onPress();
        }}
        disabled={disabled}
      >
        {loading && (
          <ActivityIndicator
            size="small"
            color="white"
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
          {text}
        </Text>
      </Button>
    </Animated.View>
  );
};

export default ButtonStandard;
