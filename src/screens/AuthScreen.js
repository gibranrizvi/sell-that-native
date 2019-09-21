import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Alert,
  Linking,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

// Local imports
import { googleKeys, facebookKeys } from '../config/config';
import layout from '../constants/layout';
import {
  FirebaseContext,
  uploadProfilePicture,
  createUserProfileDocument
} from '../firebase';

// Component imports
import Heading from '../components/heading/Heading';
import SocialLogin from '../components/auth-screen/SocialLogin';
import HorizontalScrollNavigationButton from '../components/horizontal-scroll-navigation-button/HorizontalScrollNavigationButton';
import TextInputField from '../components/text-input-field/TextInputField';
import ButtonStandard from '../components/button-standard/ButtonStandard';
import ProfileImagePicker from '../components/profile-image-picker/ProfileImagePicker';

const SignInProviders = {
  Google: 'google.com',
  Facebook: 'facebook.com',
  EmailAndPassword: 'password'
};

const { width, height } = layout.window;

const AuthScreen = () => {
  const { auth, firestore } = useContext(FirebaseContext);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    pictureURI: ''
  });
  const [page, setPage] = useState(1);
  const [cameraRollPermission, setCameraRollPermission] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  let horizontalScroll = useRef(null).current;

  useEffect(() => {
    horizontalScroll.scrollTo({
      x: page * width - width,
      y: 0,
      animated: true,
      duration: 500
    });
  }, [page]);

  // Function 1: Handle Sign up button press
  const _signUpPressed = async () => {
    setLoading(true);

    const { email, password, firstName, lastName, pictureURI } = values;

    try {
      // Save new user to firestore
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const { uid, emailVerified } = user;
      const role = 'subscriber';

      if (pictureURI) {
        return await uploadProfilePicture(
          uid,
          email,
          firstName,
          lastName,
          pictureURI,
          emailVerified,
          role
        );
      }

      const userData = {
        uid,
        email,
        first_name: firstName,
        last_name: lastName,
        profile_picture: 'default',
        emailVerified,
        role
      };

      return await createUserProfileDocument(userData);
    } catch (error) {
      console.log(error.code, error.message);

      if (error.code === 'auth/invalid-email') {
        alert(error.message);
      } else if (error.code === 'auth/email-already-in-use') {
        alert(error.message);
      }

      setPage(2);
      return setLoading(false);
    }
  };

  // Function 2: Handle Email Password sign in press
  const _signInPressed = async (email, password) => {
    setLoading(true);

    return _onSignIn({
      provider: SignInProviders.EmailAndPassword,
      token: null,
      email,
      password
    });
  };

  // Function 3: Handle Facebook sign in button press
  const _facebookSignInPressed = async () => {
    setFacebookLoading(true);
    const result = await Facebook.logInWithReadPermissionsAsync(
      facebookKeys.appID,
      { permissions: ['public_profile', 'email'] }
    );

    if (result.type === 'success') {
      return _onSignIn({
        provider: SignInProviders.Facebook,
        token: result.token,
        email: null,
        password: null
      });
    } else {
      return setFacebookLoading(false);
    }
  };

  // Function 4: Handle Google sign in button press
  const _googleSignInPressed = async () => {
    setGoogleLoading(true);

    const iosClientId = googleKeys.iosClientId;

    const { type, idToken, user } = await Google.logInAsync({
      iosClientId,
      androidClientId: `<YOUR_ANDROID_CLIENT_ID_FOR_EXPO>`,
      iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
      androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`
    });

    if (type === 'success') {
      _onSignIn({
        provider: SignInProviders.Google,
        token: idToken,
        email: user.email,
        password: null
      });
    } else {
      return setGoogleLoading(false);
    }
  };

  // Function 5: Signing in method
  const _onSignIn = async ({ provider, token, email, password }) => {
    try {
      let credential;

      switch (provider) {
        case SignInProviders.Facebook:
          credential = firebase.auth.FacebookAuthProvider.credential(token);
          break;

        case SignInProviders.EmailAndPassword:
          credential = firebase.auth.EmailAuthProvider.credential(
            email,
            password
          );
          break;

        case SignInProviders.Google:
          credential = firebase.auth.GoogleAuthProvider.credential(token);
          break;
      }

      if (credential) {
        const { user } = await auth.signInWithCredential(credential);

        let userData;
        const role = 'subscriber';

        if (provider !== SignInProviders.EmailAndPassword) {
          const { uid, email, displayName, photoURL, emailVerified } = user;

          const names = displayName.split(' ');

          userData = {
            uid,
            email,
            first_name: names[0],
            last_name: names[1],
            profile_picture: photoURL,
            emailVerified,
            role
          };
        } else {
          const { uid, emailVerified } = user;

          userData = { uid, emailVerified };
        }

        return await createUserProfileDocument(userData);
      }
    } catch (error) {
      console.log(error.code, error.message);
      alert(error.message);
      setLoading(false);
      setGoogleLoading(false);
      setFacebookLoading(false);
      return;
    }
  };

  // Function 6: Horizontal pagination method
  const handleHorizontalScroll = page => {
    switch (page) {
      case 1:
        return setPage(1);
      case 2:
        return setPage(2);
      case 3:
        return setPage(3);
      case 4:
        return setPage(4);
    }
  };

  // Function 7: Get camera roll permissions method
  const _getCameraRollPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      setCameraRollPermission(status === 'granted');

      if (status !== 'granted') {
        console.log('Permission to access camera roll has been denied');
        return Alert.alert(
          'Enable Camera Roll Permissions',
          'Go to settings',
          [{ text: 'OK', onPress: () => Linking.openURL('app-settings:') }],
          { cancelable: false }
        );
      }
    }
  };

  // Function 8: Get camera permissions method
  const _getCameraPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      setCameraPermission(status === 'granted');

      if (status !== 'granted') {
        console.log('Permission to access camera has been denied');
        return Alert.alert(
          'Enable Camera Permissions',
          'Go to settings',
          [{ text: 'OK', onPress: () => Linking.openURL('app-settings:') }],
          { cancelable: false }
        );
      }
    }
  };

  // Function 9: Open camera roll method
  const _pickImage = async () => {
    try {
      if (!cameraRollPermission) {
        _getCameraRollPermissionAsync();
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1]
      });

      if (!result.cancelled) {
        return setValues({ ...values, pictureURI: result.uri });
      }
    } catch (error) {
      return console.log(error);
    }
  };

  // Function 10: Open camera method TODO check this on real device
  const _openCamera = async () => {
    try {
      if (!cameraRollPermission) {
        _getCameraRollPermissionAsync();
      }

      if (!cameraPermission) {
        _getCameraPermissionAsync();
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });

      if (!result.cancelled) {
        return setValues({ ...values, pictureURI: result.uri });
      }
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, ...StyleSheet.absoluteFill, backgroundColor: 'white' }}
    >
      <ScrollView>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          ref={c => (horizontalScroll = c)}
        >
          {/* Log in screen - page 1 */}
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 32,
              height,
              width
            }}
          >
            <Heading title="Log In" subtitle="Get started" />

            <TextInputField
              value={email}
              onChangeText={value => setEmail(value)}
              placeholder="Email"
              spacing
            />
            <TextInputField
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder="Password"
              secureTextEntry
              spacing
            />
            <ButtonStandard
              text="Log In"
              onPress={() => _signInPressed(email, password)}
              loading={loading}
              disabled={!email || !password}
            />

            <SocialLogin
              googleSignIn={_googleSignInPressed}
              facebookSignIn={_facebookSignInPressed}
              googleLoading={googleLoading}
              facebookLoading={facebookLoading}
              buttonText="Continue"
            />

            <HorizontalScrollNavigationButton
              right
              text="Create an account"
              pressed={() => handleHorizontalScroll(page + 1)}
            />
          </View>

          {/* Create account screen - page 2 */}
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 32,
              height,
              width
            }}
          >
            <Heading title="Create Account" subtitle="Get started" />

            <TextInputField
              value={values.email}
              onChangeText={value => setValues({ ...values, email: value })}
              placeholder="Email"
              spacing
            />
            <TextInputField
              value={values.password}
              onChangeText={value => setValues({ ...values, password: value })}
              placeholder="Password"
              secureTextEntry
              spacing
            />
            <TextInputField
              value={values.confirmPassword}
              onChangeText={value =>
                setValues({ ...values, confirmPassword: value })
              }
              placeholder="Confirm password"
              secureTextEntry
            />
            <ButtonStandard
              text="Continue"
              onPress={() => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                )
                  return alert('Invalid email address');
                else if (values.password.length < 8)
                  return alert('Password must contain at least 8 characters');
                else if (values.password !== values.confirmPassword)
                  return alert('Passwords must match');
                else return handleHorizontalScroll(page + 1);
              }}
              disabled={
                !values.email || !values.password || !values.confirmPassword
              }
            />

            <SocialLogin
              googleSignIn={_googleSignInPressed}
              facebookSignIn={_facebookSignInPressed}
              googleLoading={googleLoading}
              facebookLoading={facebookLoading}
              buttonText="Sign up"
              loading={loading}
            />

            <HorizontalScrollNavigationButton
              left
              text="Go back"
              pressed={() => handleHorizontalScroll(page - 1)}
            />
          </View>

          {/* Add details screen - page 3 */}
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 32,
              height,
              width
            }}
          >
            <Heading title="Your Name" subtitle="Who are you" />

            <TextInputField
              value={values.firstName}
              onChangeText={value => setValues({ ...values, firstName: value })}
              placeholder="First name"
            />
            <TextInputField
              value={values.lastName}
              onChangeText={value => setValues({ ...values, lastName: value })}
              placeholder="Last name"
            />
            <ButtonStandard
              text="Continue"
              onPress={() => handleHorizontalScroll(page + 1)}
              disabled={!values.firstName || !values.lastName}
            />

            <HorizontalScrollNavigationButton
              left
              text="Go back"
              pressed={() => handleHorizontalScroll(page - 1)}
            />
          </View>

          {/* Add image and submit screen - page 4 */}
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 32,
              height,
              width
            }}
          >
            <Heading title="Your Picture" subtitle="Who are you" />

            <ProfileImagePicker
              uri={values.pictureURI}
              pickImage={_pickImage}
              openCamera={_openCamera}
              onDeletePress={() => setValues({ ...values, pictureURI: '' })}
            />

            <ButtonStandard
              text="Submit"
              onPress={() => _signUpPressed()}
              loading={loading}
              disabled={!values.email || !values.firstName || !values.lastName}
            />

            <HorizontalScrollNavigationButton
              left
              text="Go back"
              pressed={() => handleHorizontalScroll(page - 1)}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;
