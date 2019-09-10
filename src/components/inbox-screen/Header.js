import React, { useContext } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { format } from 'date-fns';
import Constants from 'expo-constants';

// Local imports
import { FirebaseContext } from '../../firebase';
import layout from '../../constants/layout';

// Component imports
import { LogoText } from '../styled-text/StyledText';
import ButtonCircular from '../button-circular/ButtonCircular';
import { LinearTextGradient } from 'react-native-text-gradient';

const { width } = layout.window;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const Header = ({ navigation }) => {
  const { user } = useContext(FirebaseContext);
  const { navigate } = navigation;

  return (
    <View style={styles.headerView}>
      <Text style={styles.headerTitleText}>Inbox</Text>
      {user && user.profile_picture && (
        <View style={styles.profileActionView}>
          <ButtonCircular
            onPress={() => navigate('Profile')}
            type="image"
            image={user.profile_picture}
            size={36}
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
    borderBottomColor: '#999',
    borderBottomWidth: 0.4,
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 6,
    backgroundColor: 'white',
    zIndex: 1000
  },
  headerTitleText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333'
  },
  profileActionView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    width: width / 6
  }
});
