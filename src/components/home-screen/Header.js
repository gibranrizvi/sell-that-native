import React, { useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { format } from 'date-fns';
import Constants from 'expo-constants';

// Local imports
import { FirebaseContext } from '../../firebase';
import layout from '../../constants/layout';

// Component imports
import { LogoText } from '../styled-text/StyledText';
import ButtonRounded from '../button-rounded/ButtonRounded';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = layout.window;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const IS_IPHONE_X = height === 812 || height === 896;

const Header = ({ navigation }) => {
  const { auth } = useContext(FirebaseContext);
  const { openDrawer } = navigation;

  return (
    <View
      // onLayout={({ nativeEvent }) => console.log(nativeEvent)}
      style={styles.headerView}
    >
      <LogoText style={styles.headerTitleText}>Sell that</LogoText>
      <View style={styles.profileActionView}>
        <ButtonRounded onPress={() => openDrawer()} size={28} />
      </View>
      <View style={styles.headerRightView}>
        <TouchableOpacity onPress={() => auth.signOut()}>
          <Ionicons name="md-exit" size={32} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    alignItems: 'center',
    borderBottomColor: '#999',
    borderBottomWidth: 0.4,
    height: IS_IPHONE_X ? 96 : 76, // TODO hard-coded values
    paddingTop: STATUS_BAR_HEIGHT + 12,
    backgroundColor: 'white'
  },
  headerTitleText: {
    fontSize: 26,
    color: 'orangered'
  },
  profileActionView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT,
    top: 0,
    left: 0,
    bottom: 0,
    width: width / 6
  },
  headerRightView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT,
    top: 0,
    right: 0,
    bottom: 0,
    width: width / 6
  }
});
