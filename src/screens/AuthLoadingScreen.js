import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native';

// Local imports
import { FirebaseContext } from '../firebase';

// Component imports
import { MonoText } from '../components/styled-text/StyledText';

const AuthLoadingScreen = ({ navigation }) => {
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = () => {
    auth.onAuthStateChanged(user => {
      return user ? navigation.navigate('Home') : navigation.navigate('Auth');
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ActivityIndicator size="small" color="black" />
      <MonoText>Launching</MonoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AuthLoadingScreen;
