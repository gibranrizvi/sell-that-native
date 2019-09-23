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

// Local imports
import { FirebaseContext } from '../firebase';
import layout from '../constants/layout';

// Component imports

const { height, width } = layout.window;
const IS_IPHONE_X = height === 812 || height === 896;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const ProfileScreen = () => {
  const { user, auth } = useContext(FirebaseContext);

  return (
    <SafeAreaView style={styles.root}>
      {/* Body */}
      <ScrollView contentContainerStyle={styles.bodyScrollView}>
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
  bodyScrollView: {}
});

export default ProfileScreen;
