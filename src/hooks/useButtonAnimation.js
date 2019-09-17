import { Easing, Animated } from 'react-native';
// import Animated from 'react-native-reanimated';

export const useButtonPressedAnimation = animation => {
  Animated.timing(animation, {
    toValue: 1,
    duration: 100
  }).start();
};

export const useButtonReleasedAnimation = animation => {
  Animated.timing(animation, {
    toValue: 0,
    duration: 200
  }).start();
};
