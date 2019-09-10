import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { firebaseConfig } from '../config/config';

export const uploadProfilePicture = async (
  uid,
  email,
  firstName,
  lastName,
  pictureURI
) => {
  const storageRef = firebase.storage().ref();
  const pictureRef = storageRef.child(
    `profile_pictures/${firstName}_${lastName}_${uid}`
  );

  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = error => {
        console.log(error);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', pictureURI, true);
      xhr.send(null);
    });

    const snapshot = await pictureRef.put(blob);

    blob.close();

    downloadURL = await snapshot.ref.getDownloadURL();

    const userData = {
      uid,
      email,
      first_name: firstName,
      last_name: lastName,
      profile_picture: downloadURL
    };

    return await createUserProfileDocument(userData);
  } catch (error) {
    console.log(error);
  }
};

export const createUserProfileDocument = async ({
  uid,
  email,
  first_name,
  last_name,
  profile_picture,
  role,
  emailVerified
}) => {
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    // Create new user
    const created_at = Date.now();

    try {
      await userRef.set({
        email,
        first_name,
        last_name,
        profile_picture,
        role,
        emailVerified,
        created_at
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    // Update user
    const last_logged_in = Date.now();

    try {
      await userRef.update({
        last_logged_in,
        emailVerified
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
