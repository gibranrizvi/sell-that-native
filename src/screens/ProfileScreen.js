import React, { useRef, useContext } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  StatusBar
} from 'react-native';
import { format } from 'date-fns';
import Animated from 'react-native-reanimated';

// Local imports
import { FirebaseContext } from '../firebase';
import layout from '../constants/layout';

// Component imports
import Header from '../components/profile/Header';

const { height, width } = layout.window;
const IS_IPHONE_X = height === 812 || height === 896;
const EXPANDED_HEADER_HEIGHT = height / 4;
const COLLAPSED_HEADER_HEIGHT =
  Platform.OS === 'ios' ? (IS_IPHONE_X ? 126 : 100) : 100;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const SCROLL_DISTANCE = EXPANDED_HEADER_HEIGHT - COLLAPSED_HEADER_HEIGHT;

const ProfileScreen = () => {
  const { user, auth } = useContext(FirebaseContext);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [EXPANDED_HEADER_HEIGHT, COLLAPSED_HEADER_HEIGHT],
    extrapolate: 'clamp'
  });

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <Animated.View
        style={[
          styles.headerView,
          {
            height: headerHeight
          }
        ]}
      >
        <Header />
      </Animated.View>

      {/* Body */}
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bodyScrollView}
      >
        <View style={{ borderWidth: 1 }}>
          <Text>Payment methods</Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>Add new payment method</Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>Booking history</Text>
        </View>
        <View style={{ borderWidth: 1 }}>
          <Text>Create new listing</Text>
        </View>
        <View>
          <Text style={{ alignSelf: 'center' }}>ProfileScreen</Text>
          <Button title="Sign out" onPress={() => auth.signOut()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    zIndex: 1,
    backgroundColor: 'white'
  },
  bodyScrollView: {
    paddingTop: IS_IPHONE_X
      ? EXPANDED_HEADER_HEIGHT - 24
      : EXPANDED_HEADER_HEIGHT
  }
});

export default ProfileScreen;
