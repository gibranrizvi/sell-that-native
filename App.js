import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './src/navigation/AppNavigator';
import { FirebaseContext, auth, firestore } from './src/firebase';
import useAuth from './src/hooks/useAuth';

export default function App(props) {
  // TODO replace const user = useAuth();
  const user = {
    created_at: 1568142656131,
    email: 'gibranrzv@gmail.com',
    emailVerified: true,
    first_name: 'Gibran',
    id: 'bqFXaaLx8qcPCEH9ddHO5XBqc282',
    last_name: 'Rizvi',
    profile_picture:
      'https://lh3.googleusercontent.com/a-/AAuE7mDMPtoVJsw1jRawYMyhJCMmqHbzImq1zjHf6HBT=s96-c',
    role: 'subscriber'
  };
  console.log(user);

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <FirebaseContext.Provider value={{ user, auth, firestore }}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </FirebaseContext.Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png')
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      // sacramento: require('./assets/fonts/Sacramento-Regular.ttf'),
      // yellowtail: require('./assets/fonts/Yellowtail-Regular.ttf'),
      lobster: require('./assets/fonts/Lobster-Regular.ttf'),
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
    })
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
