import React, { useRef } from 'react';
import { Text, View, ActivityIndicator, Animated } from 'react-native';
import { Button } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
// import Animated from 'react-native-reanimated';

// Hook imports
import {
  useButtonPressedAnimation,
  useButtonReleasedAnimation
} from '../../hooks/useButtonAnimation';

const ButtonWithIcon = ({ onPress, loading, buttonText, color, icon }) => {
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
      style={{ marginVertical: buttonMargin, padding: buttonPadding }}
    >
      <Button
        block
        onPressIn={() => {
          useButtonPressedAnimation(animation);
        }}
        onPressOut={() => {
          useButtonReleasedAnimation(animation);
          return onPress();
        }}
        style={{
          backgroundColor: color
        }}
      >
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 8
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <FontAwesome name={icon} size={24} color="white" />
            )}
          </View>
          <View
            style={{
              flex: 7,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 18
              }}
            >
              {buttonText}
            </Text>
          </View>
        </View>
      </Button>
    </Animated.View>
  );
};

export default ButtonWithIcon;
