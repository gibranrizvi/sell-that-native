import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  StatusBar,
  Animated
} from 'react-native';
import { format } from 'date-fns';
import Constants from 'expo-constants';
// import Animated from 'react-native-reanimated';

// Local imports
import layout from '../constants/layout';

// Component imports

const { height, width } = layout.window;
const IS_IPHONE_X = height === 812 || height === 896;
const EXPANDED_HEADER_HEIGHT = height / 5;
const COLLAPSED_HEADER_HEIGHT =
  Platform.OS === 'ios' ? (IS_IPHONE_X ? 124 : 114) : 114;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const SCROLL_DISTANCE = EXPANDED_HEADER_HEIGHT - COLLAPSED_HEADER_HEIGHT;

const InboxScreen = ({ navigation }) => {
  const [xTabOne, setXTabOne] = useState(0);
  const [xTabTwo, setXTabTwo] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  let horizontalScrollView = null;

  const openConversation = () => {};

  const handleSlide = xPos => {
    if (xPos === 0) {
      handleHorizontalScroll(1);
    } else {
      handleHorizontalScroll(2);
    }
  };

  const handleHorizontalScroll = tab => {
    switch (tab) {
      case 1:
        horizontalScrollView.scrollTo({
          x: 0,
          y: 0,
          animated: true,
          duration: 500
        });
      case 2:
        horizontalScrollView.scrollTo({
          x: width,
          y: 0,
          animated: true,
          duration: 500
        });
    }
  };

  const shadowOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, 0.4],
    extrapolate: 'clamp'
  });

  const scrollTranslateX = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [0, xTabTwo]
  });

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      {/* <Header navigation={navigation} /> */}

      {/* Tabs */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: IS_IPHONE_X ? 52 : 68 - STATUS_BAR_HEIGHT, // TODO might need to fix this later on
          borderBottomWidth: 0.4,
          borderColor: '#999',
          backgroundColor: '#F9F9F9',
          zIndex: 999
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0
          }}
        >
          {/* Slider */}
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '50%',
              height: '8%',
              backgroundColor: 'orangered',
              transform: [{ translateX: scrollTranslateX }]
            }}
          />
          {/* Activity Tab */}
          <TouchableWithoutFeedback
            onLayout={({ nativeEvent }) => setXTabOne(nativeEvent.layout.x)}
            onPress={() => handleSlide(xTabOne)}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 12
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black'
                }}
              >
                Activity
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {/* Messages Tab */}
          <TouchableWithoutFeedback
            onLayout={({ nativeEvent }) => {
              setXTabTwo(nativeEvent.layout.x);
            }}
            onPress={() => handleSlide(xTabTwo)}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 12
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black'
                }}
              >
                Messages
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>

      {/* Body */}
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ])}
        ref={c => (horizontalScrollView = c)}
        nestedScrollEnabled
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
      >
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}
          contentContainerStyle={{
            paddingTop: IS_IPHONE_X
              ? EXPANDED_HEADER_HEIGHT - 40
              : EXPANDED_HEADER_HEIGHT - 20,
            paddingBottom: 42
          }}
        >
          {/* Upcoming tab */}
          <View style={styles.root}></View>
        </ScrollView>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}
          contentContainerStyle={{
            paddingTop: IS_IPHONE_X
              ? EXPANDED_HEADER_HEIGHT - 40
              : EXPANDED_HEADER_HEIGHT - 20,
            paddingBottom: 42
          }}
        >
          {/* History tab */}
          <View style={styles.root}></View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width
  }
});

export default InboxScreen;
