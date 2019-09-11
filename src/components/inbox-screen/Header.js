import React, { useContext } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { format } from 'date-fns';
import Constants from 'expo-constants';

// Local imports
import { FirebaseContext } from '../../firebase';
import layout from '../../constants/layout';

// Component imports
import ButtonRounded from '../button-rounded/ButtonRounded';

const { height, width } = layout.window;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const Header = ({ navigation }) => {
  const { user } = useContext(FirebaseContext);
  const { navigate } = navigation;

  return (
    <View style={styles.headerView}>
      <Text style={styles.headerTitleText}>Inbox</Text>
      {user && user.profile_picture && (
        <View style={styles.profileActionView}>
          <ButtonRounded
            onPress={() => navigate('Profile')}
            type="image"
            image={user.profile_picture}
            size={32}
          />
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: STATUS_BAR_HEIGHT + 12,
    paddingBottom: 12,
    paddingHorizontal: 6,
    backgroundColor: 'white',
    zIndex: 1000
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black'
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
  }
});
