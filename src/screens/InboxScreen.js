import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import Animated from 'react-native-reanimated';

// Local imports
import layout from '../constants/layout';
import Header from '../components/inbox-screen/Header';

// Component imports

const { height, width } = layout.window;
const IS_IPHONE_X = height === 812 || height === 896;
const EXPANDED_HEADER_HEIGHT = height / 5;
const COLLAPSED_HEADER_HEIGHT =
  Platform.OS === 'ios' ? (IS_IPHONE_X ? 124 : 114) : 114;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight ? StatusBar.currentHeight : 0;
const SCROLL_DISTANCE = EXPANDED_HEADER_HEIGHT - COLLAPSED_HEADER_HEIGHT;

const InboxScreen = ({ navigation }) => {
  const [xTabOne, setXTabOne] = useState(0);
  const [xTabTwo, setXTabTwo] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  let horizontalScrollView = null;

  const openTrip = () => {
    console.log('Trip selected');
    // TODO Set notifications for this trip to 0
    // TODO Reduce total number of notifications
  };

  const handleSlide = xPos => {
    if (xPos === 0) {
      handleHorizontalScroll(1);
    } else {
      handleHorizontalScroll(2);
    }
    // Animated.spring(translateX, {
    //   toValue: xPos,
    //   duration: 500
    // }).start();
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
      <Header navigation={navigation} />
      <Animated.View
        style={{
          height: COLLAPSED_HEADER_HEIGHT,
          width,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: 'white',
          shadowOffset: { width: 0, height: 5 },
          shadowColor: 'black',
          shadowOpacity: shadowOpacity,
          elevation: 20
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: STATUS_BAR_HEIGHT + 12,
            opacity: 1
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: 'black',
              alignSelf: 'center'
            }}
          >
            Inbox
          </Text>
        </Animated.View>

        {/* Tabs */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            left: 32,
            width: width - 64
          }}
        >
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
          <View
            animation="bounceInUp"
            easing="ease-out"
            style={styles.root}
          ></View>
        </ScrollView>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}
          contentContainerStyle={{
            paddingTop: IS_IPHONE_X
              ? COLLAPSED_HEADER_HEIGHT - 20
              : COLLAPSED_HEADER_HEIGHT,
            paddingBottom: 32
          }}
        >
          {/* History tab */}
          <View
            animation="bounceInUp"
            easing="ease-out"
            style={styles.root}
          ></View>
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
