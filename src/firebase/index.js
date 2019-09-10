import firebase, {
  auth,
  firestore,
  uploadProfilePicture,
  createUserProfileDocument
} from './firebase';
import FirebaseContext from './context';

export {
  FirebaseContext,
  auth,
  firestore,
  uploadProfilePicture,
  createUserProfileDocument
};

export default firebase;
