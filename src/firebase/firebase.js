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
  pictureURI,
  role
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
      profile_picture: downloadURL,
      emailVerified,
      role
    };

    return await createUserProfileDocument(userData);
  } catch (error) {
    console.log(error);
  }
};

// TODO add address field
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
    const isNewUser = true;

    // Notifications - two types, activities (likes and comments) and messages
    const messages = [{ unread: true }];
    const activity = [];

    try {
      await userRef.set({
        email,
        first_name,
        last_name,
        profile_picture,
        role,
        emailVerified,
        isNewUser,
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

// Create or update a post
export const createPostDocument = async (postData, currentUser) => {
  const postsRef = firestore.collection('posts');
  const postDocRef = postsRef.doc();
  const snapshot = await postDocRef.get();

  if (!snapshot.exists) {
    // Create new post
    const sold = false;
    const likes = [];
    const comments = [];
    const created_at = Date.now();
    const created_by = currentUser;

    try {
      await postDocRef.set({
        ...postData,
        sold,
        likes,
        comments,
        created_at,
        created_by
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    // Update post
    const last_updated_at = Date.now();

    try {
      await postDocRef.update({
        ...postData,
        last_updated_at
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return postDocRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
